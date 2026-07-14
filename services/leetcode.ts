// LeetCode contest-stats integration (Unit U5).
// Typed, error-safe port of the old services/external/Leetcode/userService.js.
// Never throws: any network/parse failure resolves to `null` so callers can fall back.

import axios from 'axios';
import { endpoints } from '@/lib/env';
import type { CPStat } from '@/types';

const CONTEST_RANKING_QUERY = `
  query userContestRankingInfo($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
  }
`;

type LeetcodeContestRanking = {
  attendedContestsCount?: number | null;
  rating?: number | null;
  globalRanking?: number | null;
  totalParticipants?: number | null;
  topPercentage?: number | null;
  badge?: { name?: string | null } | null;
};

function profileUrl(handle: string): string {
  return `https://leetcode.com/${encodeURIComponent(handle)}`;
}

/**
 * Fetch LeetCode contest stats for a handle.
 * @returns a partial CPStat on success, or `null` on any failure (fail-safe, SR-4/SECURITY-15).
 */
export async function fetchLeetcode(handle: string): Promise<Partial<CPStat> | null> {
  if (!handle) return null;

  try {
    const res = await axios.post(
      endpoints.leetcode,
      {
        operationName: 'userContestRankingInfo',
        query: CONTEST_RANKING_QUERY,
        variables: { username: handle },
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10_000,
      },
    );

    // Fully null-guarded traversal of the GraphQL payload.
    const ranking: LeetcodeContestRanking | null | undefined =
      res?.data?.data?.userContestRanking;

    // No contest history (or unknown user) → treat as unavailable so we fall back.
    if (!ranking) return null;

    const stat: Partial<CPStat> = {
      platform: 'leetcode',
      handle,
      profileUrl: profileUrl(handle),
      source: 'live',
      fetchedAt: new Date().toISOString(),
    };

    if (typeof ranking.badge?.name === 'string') stat.level = ranking.badge.name;
    if (typeof ranking.rating === 'number') stat.rating = Math.round(ranking.rating);
    if (typeof ranking.globalRanking === 'number') stat.rank = ranking.globalRanking;
    if (typeof ranking.attendedContestsCount === 'number')
      stat.attended = ranking.attendedContestsCount;
    if (typeof ranking.topPercentage === 'number') stat.topPercent = ranking.topPercentage;

    return stat;
  } catch (err) {
    console.error('[leetcode] failed to fetch contest ranking', err);
    return null;
  }
}
