// Competitive Programming snapshot service (Unit U5).
//
// Requirement Q10=B / FR-17: provide CP stats WITHOUT a live third-party call on every
// render. `getCpStats()` is wrapped in Next's `unstable_cache` (revalidate ~1h), so the
// live LeetCode/Codeforces fetch runs at most once per hour and is served from cache to
// every render in between. `refreshCpStats()` performs the live fetch and is also invoked
// by the ISR route handler (app/api/cp/refresh) on a schedule.
//
// Fail-safe (SR-4 / SECURITY-15): every path resolves to typed CPStat[] — on any error we
// return the last-known fallback with source:'fallback'. Nothing here ever throws to render.

import 'server-only';
import { unstable_cache } from 'next/cache';
import { env } from '@/lib/env';
import { fetchLeetcode } from '@/services/leetcode';
import { fetchCodeforces } from '@/services/codeforces';
import { CP_FALLBACK } from '@/data/cp-fallback';
import type { CPPlatform, CPStat } from '@/types';

const REVALIDATE_SECONDS = 3600;

/** Deep-ish clone of the fallback list so callers/merges never mutate the module constant. */
function fallbackStats(): CPStat[] {
  return CP_FALLBACK.map((stat) => ({ ...stat }));
}

/**
 * Merge a live partial over its matching fallback entry. Any field the live fetch did not
 * supply keeps its fallback value; a successful fetch flips `source` to 'live'.
 */
function mergeLive(base: CPStat, live: Partial<CPStat> | null): CPStat {
  if (!live) return { ...base };

  const merged: CPStat = { ...base };
  for (const [key, value] of Object.entries(live) as [keyof CPStat, unknown][]) {
    if (value !== undefined && value !== null) {
      // Safe assignment: keys/values originate from the same CPStat shape.
      (merged as Record<string, unknown>)[key] = value;
    }
  }
  // Preserve identity fields from the base regardless of what live returned.
  merged.platform = base.platform;
  return merged;
}

function handleFor(platform: CPPlatform): string {
  return platform === 'leetcode' ? env.cp.leetcodeUsername : env.cp.codeforcesUsername;
}

/**
 * Fetch live stats from both platforms and merge them over the fallback baseline.
 * Never throws — returns fallback data (source:'fallback') on any failure.
 */
export async function refreshCpStats(): Promise<CPStat[]> {
  const base = fallbackStats();

  try {
    const [leet, cf] = await Promise.all([
      fetchLeetcode(handleFor('leetcode')).catch(() => null),
      fetchCodeforces(handleFor('codeforces')).catch(() => null),
    ]);

    const liveByPlatform: Record<CPPlatform, Partial<CPStat> | null> = {
      leetcode: leet,
      codeforces: cf,
    };

    return base.map((stat) => mergeLive(stat, liveByPlatform[stat.platform]));
  } catch (err) {
    console.error('[cp/snapshot] refresh failed; serving fallback', err);
    return fallbackStats();
  }
}

// Cached snapshot reader. The live fetch inside runs at most once per REVALIDATE_SECONDS;
// every render in between is served from the Next data cache (no live call per render).
const getCachedCpStats = unstable_cache(
  async (): Promise<CPStat[]> => refreshCpStats(),
  ['cp-stats-snapshot'],
  { revalidate: REVALIDATE_SECONDS, tags: ['cp-stats'] },
);

/**
 * Read the cached/snapshotted CP stats for rendering. Fail-safe: falls back to last-known
 * data on any error and never throws.
 */
export async function getCpStats(): Promise<CPStat[]> {
  try {
    return await getCachedCpStats();
  } catch (err) {
    console.error('[cp/snapshot] getCpStats failed; serving fallback', err);
    return fallbackStats();
  }
}
