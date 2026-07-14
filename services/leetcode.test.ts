import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchLeetcode } from './leetcode';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('fetchLeetcode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('parses a successful contest-ranking response into a partial CPStat', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          userContestRanking: {
            attendedContestsCount: 21,
            rating: 2003.6,
            globalRanking: 12000,
            totalParticipants: 400000,
            topPercentage: 3.1,
            badge: { name: 'Knight' },
          },
        },
      },
    });

    const stat = await fetchLeetcode('jooncco');

    expect(stat).toMatchObject({
      platform: 'leetcode',
      handle: 'jooncco',
      profileUrl: 'https://leetcode.com/jooncco',
      level: 'Knight',
      rating: 2004, // rounded
      rank: 12000,
      attended: 21,
      topPercent: 3.1,
      source: 'live',
    });
    expect(typeof stat?.fetchedAt).toBe('string');
  });

  it('returns null when the user has no contest ranking', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { data: { userContestRanking: null } },
    });
    await expect(fetchLeetcode('jooncco')).resolves.toBeNull();
  });

  it('never throws on network failure and returns null (fail-safe)', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('network down'));
    await expect(fetchLeetcode('jooncco')).resolves.toBeNull();
  });

  it('returns null for an empty handle without calling the network', async () => {
    await expect(fetchLeetcode('')).resolves.toBeNull();
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });
});
