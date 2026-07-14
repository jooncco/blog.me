import { describe, it, expect } from 'vitest';
import { endpoints, env, isEmailConfigured } from './env';
import { resolveLocalized } from './content';

describe('env', () => {
  it('exposes stable third-party endpoints', () => {
    expect(endpoints.leetcode).toBe('https://leetcode.com/graphql');
    expect(endpoints.codeforces).toBe('https://codeforces.com/api');
  });

  it('provides CP usernames with sensible fallbacks', () => {
    expect(env.cp.leetcodeUsername).toBeTruthy();
    expect(env.cp.codeforcesUsername).toBeTruthy();
  });

  it('reports email configured only when keys present', () => {
    expect(typeof isEmailConfigured()).toBe('boolean');
  });
});

describe('resolveLocalized', () => {
  it('picks the requested locale', () => {
    expect(resolveLocalized({ en: 'Hi', ko: '안녕' }, 'ko')).toBe('안녕');
  });
  it('falls back to default locale when missing', () => {
    expect(resolveLocalized({ en: 'Hi' } as never, 'ko')).toBe('Hi');
  });
  it('passes through non-localized values', () => {
    expect(resolveLocalized('plain', 'en')).toBe('plain');
  });
});
