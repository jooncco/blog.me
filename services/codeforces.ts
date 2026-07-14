// Codeforces contest-stats integration (Unit U5).
// Typed, fully null-guarded port of the old services/external/Codeforces/userService.js.
//
// Bug fixes vs. the old JS (see code-quality-assessment.md):
//  - Bug #1: the handle now comes from the Codeforces config (env.cp.codeforcesUsername),
//    passed in by the caller — no longer accidentally sourced from the LeetCode config.
//  - Bug #3: `userInfo.rank` / `userContestInfo.length` are guarded so a failed request
//    can never throw; any failure resolves to `null`.

import axios from 'axios';
import { endpoints } from '@/lib/env';
import type { CPStat } from '@/types';

type CodeforcesUserInfo = {
  handle?: string | null;
  rank?: string | null;
  rating?: number | null;
};

function profileUrl(handle: string): string {
  return `https://codeforces.com/profile/${encodeURIComponent(handle)}`;
}

/**
 * Fetch Codeforces contest stats for a handle.
 * Makes two GET calls: /user.info (level + rating) and /user.rating (attended count).
 * @returns a partial CPStat on success, or `null` on any failure — never throws (SR-4).
 */
export async function fetchCodeforces(handle: string): Promise<Partial<CPStat> | null> {
  if (!handle) return null;

  try {
    // Fetch user info (level/rank + rating).
    const userInfo: CodeforcesUserInfo | null = await axios
      .get(`${endpoints.codeforces}/user.info`, {
        params: { handles: handle },
        timeout: 10_000,
      })
      .then((res) => {
        const result = res?.data?.result;
        return Array.isArray(result) && result.length > 0 ? (result[0] as CodeforcesUserInfo) : null;
      })
      .catch((err) => {
        console.error('[codeforces] failed to fetch user.info', err);
        return null;
      });

    // Fetch rating history (attended contest count).
    const contestHistory: unknown[] | null = await axios
      .get(`${endpoints.codeforces}/user.rating`, {
        params: { handle },
        timeout: 10_000,
      })
      .then((res) => {
        const result = res?.data?.result;
        return Array.isArray(result) ? result : null;
      })
      .catch((err) => {
        console.error('[codeforces] failed to fetch user.rating', err);
        return null;
      });

    // If neither call yielded anything usable, signal fallback.
    if (!userInfo && !contestHistory) return null;

    const stat: Partial<CPStat> = {
      platform: 'codeforces',
      handle,
      profileUrl: profileUrl(handle),
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };

    // Null-guarded dereferences (the original bug #3).
    if (userInfo && typeof userInfo.rank === 'string') stat.level = userInfo.rank;
    if (userInfo && typeof userInfo.rating === 'number') stat.rating = userInfo.rating;
    if (Array.isArray(contestHistory)) stat.attended = contestHistory.length;

    return stat;
  } catch (err) {
    console.error('[codeforces] failed to fetch contest ranking', err);
    return null;
  }
}
