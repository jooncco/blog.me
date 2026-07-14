// ISR route handler for refreshing the Competitive Programming snapshot (Unit U5).
//
// `export const revalidate = 3600` gives this handler Incremental Static Regeneration
// semantics: the live LeetCode/Codeforces fetch is re-run at most once per hour, not on
// every request. Fail-safe: any error returns fallback data with HTTP 200 (never a 500 to
// the user).

import { NextResponse } from 'next/server';
import { refreshCpStats } from '@/lib/cp/snapshot';
import { CP_FALLBACK } from '@/data/cp-fallback';
import type { CPStat } from '@/types';

export const revalidate = 3600;

export async function GET(): Promise<NextResponse<CPStat[]>> {
  try {
    const stats = await refreshCpStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error('[api/cp/refresh] refresh failed; serving fallback', err);
    const fallback: CPStat[] = CP_FALLBACK.map((stat) => ({ ...stat }));
    return NextResponse.json(fallback, { status: 200 });
  }
}
