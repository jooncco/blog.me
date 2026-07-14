// Last-known-good Competitive Programming stats (Unit U5).
//
// Serves two purposes:
//  1. Rendered directly by `getCpStats()` when no live snapshot is available, so the
//     CompetitiveProgramming section never blocks on (or is broken by) a third-party call.
//  2. Base layer that `refreshCpStats()` merges live results over — any field a live
//     fetch fails to provide keeps its plausible fallback value.
//
// Template users can edit these values. Plausible seed values are ported from the old
// components/CompetitiveProgramming/constants.js.

import { env } from '@/lib/env';
import type { CPStat } from '@/types';

// Fixed timestamp so fallback output is deterministic (no live/build-time drift).
const FALLBACK_FETCHED_AT = '2025-01-01T00:00:00.000Z';

const leetcodeHandle = env.cp.leetcodeUsername;
const codeforcesHandle = env.cp.codeforcesUsername;

export const CP_FALLBACK: CPStat[] = [
  {
    platform: 'leetcode',
    handle: leetcodeHandle,
    profileUrl: `https://leetcode.com/${leetcodeHandle}`,
    level: 'Knight',
    rating: 1986,
    rank: 14368,
    attended: 18,
    topPercent: 2.98,
    fetchedAt: FALLBACK_FETCHED_AT,
    source: 'fallback',
  },
  {
    platform: 'codeforces',
    handle: codeforcesHandle,
    profileUrl: `https://codeforces.com/profile/${codeforcesHandle}`,
    level: 'Specialist',
    rating: 1516,
    rank: 17369,
    attended: 43,
    topPercent: 2.77,
    fetchedAt: FALLBACK_FETCHED_AT,
    source: 'fallback',
  },
];

export default CP_FALLBACK;
