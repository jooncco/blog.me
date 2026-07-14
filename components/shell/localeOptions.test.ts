import { describe, it, expect } from 'vitest';
import { buildLocaleOptions } from './localeOptions';
import { routing } from '@/i18n/routing';

describe('buildLocaleOptions', () => {
  it('returns one option per configured locale in order', () => {
    const options = buildLocaleOptions('en', routing.locales);
    expect(options.map((o) => o.locale)).toEqual([...routing.locales]);
  });

  it('flags exactly the active locale', () => {
    const options = buildLocaleOptions('ko', routing.locales);
    const active = options.filter((o) => o.active);
    expect(active).toHaveLength(1);
    expect(active[0].locale).toBe('ko');
  });

  it('flags nothing active for an unknown current locale', () => {
    const options = buildLocaleOptions('fr', routing.locales);
    expect(options.some((o) => o.active)).toBe(false);
  });
});
