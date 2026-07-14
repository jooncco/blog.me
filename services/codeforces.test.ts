import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchCodeforces } from './codeforces';

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

/** Route a mocked axios.get by URL to the right Codeforces endpoint payload. */
function routeGet(
  userInfo: unknown,
  userRating: unknown,
): (url: string) => Promise<{ data: unknown }> {
  return (url: string) => {
    if (url.includes('user.info')) return Promise.resolve({ data: userInfo });
    if (url.includes('user.rating')) return Promise.resolve({ data: userRating });
    return Promise.reject(new Error(`unexpected url ${url}`));
  };
}

describe('fetchCodeforces', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('parses user.info + user.rating into a partial CPStat', async () => {
    mockedAxios.get.mockImplementation(
      routeGet(
        { status: 'OK', result: [{ handle: 'jooncco', rank: 'specialist', rating: 1516 }] },
        { status: 'OK', result: [{}, {}, {}] },
      ) as never,
    );

    const stat = await fetchCodeforces('jooncco');

    expect(stat).toMatchObject({
      platform: 'codeforces',
      handle: 'jooncco',
      profileUrl: 'https://codeforces.com/profile/jooncco',
      level: 'specialist',
      rating: 1516,
      attended: 3,
      source: 'live',
    });
    expect(typeof stat?.fetchedAt).toBe('string');
  });

  it('is null-guarded: user.rating failing does not throw (bug #3 fix)', async () => {
    mockedAxios.get.mockImplementation(((url: string) => {
      if (url.includes('user.info'))
        return Promise.resolve({ data: { result: [{ rank: 'expert', rating: 1650 }] } });
      return Promise.reject(new Error('rating endpoint down'));
    }) as never);

    const stat = await fetchCodeforces('jooncco');

    // Still returns partial data from user.info; attended is simply absent.
    expect(stat).toMatchObject({ platform: 'codeforces', level: 'expert', rating: 1650 });
    expect(stat?.attended).toBeUndefined();
  });

  it('returns null when both requests fail (fail-safe, never throws)', async () => {
    mockedAxios.get.mockRejectedValue(new Error('network down'));
    await expect(fetchCodeforces('jooncco')).resolves.toBeNull();
  });

  it('returns null for an empty handle without calling the network', async () => {
    await expect(fetchCodeforces('')).resolves.toBeNull();
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });
});
