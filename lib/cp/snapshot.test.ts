import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { CPStat } from '@/types';

// Pass-through `unstable_cache` so getCpStats is exercisable without the Next runtime.
vi.mock('next/cache', () => ({
  unstable_cache: <T extends (...args: never[]) => unknown>(fn: T) => fn,
}));

vi.mock('@/services/leetcode', () => ({ fetchLeetcode: vi.fn() }));
vi.mock('@/services/codeforces', () => ({ fetchCodeforces: vi.fn() }));

import { fetchLeetcode } from '@/services/leetcode';
import { fetchCodeforces } from '@/services/codeforces';
import { getCpStats, refreshCpStats } from './snapshot';

const mockedLeet = vi.mocked(fetchLeetcode);
const mockedCf = vi.mocked(fetchCodeforces);

function byPlatform(stats: CPStat[], platform: CPStat['platform']): CPStat {
  const found = stats.find((s) => s.platform === platform);
  if (!found) throw new Error(`missing ${platform}`);
  return found;
}

describe('refreshCpStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('merges live results over fallback and flips source to live', async () => {
    mockedLeet.mockResolvedValue({
      platform: 'leetcode',
      rating: 2100,
      attended: 25,
      source: 'live',
      fetchedAt: '2026-07-14T00:00:00.000Z',
    });
    mockedCf.mockResolvedValue({
      platform: 'codeforces',
      rating: 1600,
      level: 'expert',
      source: 'live',
      fetchedAt: '2026-07-14T00:00:00.000Z',
    });

    const stats = await refreshCpStats();
    expect(stats).toHaveLength(2);

    const leet = byPlatform(stats, 'leetcode');
    expect(leet.source).toBe('live');
    expect(leet.rating).toBe(2100);
    expect(leet.attended).toBe(25);
    // Field the live fetch did not supply keeps its fallback value.
    expect(leet.level).toBe('Knight');

    const cf = byPlatform(stats, 'codeforces');
    expect(cf.source).toBe('live');
    expect(cf.rating).toBe(1600);
    expect(cf.level).toBe('expert');
  });

  it('keeps fallback entry (source:fallback) when a platform fetch returns null', async () => {
    mockedLeet.mockResolvedValue(null);
    mockedCf.mockResolvedValue(null);

    const stats = await refreshCpStats();
    expect(stats.every((s) => s.source === 'fallback')).toBe(true);
    expect(byPlatform(stats, 'leetcode').rating).toBe(1986);
    expect(byPlatform(stats, 'codeforces').rating).toBe(1516);
  });

  it('never throws and returns fallback when a service rejects', async () => {
    mockedLeet.mockRejectedValue(new Error('boom'));
    mockedCf.mockRejectedValue(new Error('boom'));

    const stats = await refreshCpStats();
    expect(Array.isArray(stats)).toBe(true);
    expect(stats).toHaveLength(2);
    // Rejections are caught per-service → fallback values preserved.
    expect(stats.every((s) => s.source === 'fallback')).toBe(true);
  });
});

describe('getCpStats', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('returns a typed CPStat[] with both platforms', async () => {
    mockedLeet.mockResolvedValue(null);
    mockedCf.mockResolvedValue(null);

    const stats = await getCpStats();
    expect(Array.isArray(stats)).toBe(true);
    expect(stats.map((s) => s.platform).sort()).toEqual(['codeforces', 'leetcode']);
    for (const s of stats) {
      expect(typeof s.handle).toBe('string');
      expect(typeof s.profileUrl).toBe('string');
      expect(typeof s.fetchedAt).toBe('string');
      expect(['live', 'fallback']).toContain(s.source);
    }
  });
});
