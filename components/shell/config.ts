// Typed configuration for the global shell (Unit U3).
// Nav labels are resolved through the `nav` message namespace by `id`.
import type { ComponentType } from 'react';
import type { IconProps } from '@/components/Icons';
import {
  GithubIcon,
  LeetcodeIcon,
  CodeforcesIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
} from '@/components/Icons';

/**
 * `anchor` items scroll to a section on the home page (`/#id`); `route` items
 * navigate to a dedicated page. Links are rendered with the next-intl `Link`
 * so the active locale prefix is applied automatically.
 */
export type NavKind = 'anchor' | 'route';

export type NavItem = {
  /** Stable id — also the key into the `nav` message namespace and the testid. */
  id: string;
  /** Locale-relative href (`/#about`, `/contact`, …). */
  href: string;
  kind: NavKind;
};

/**
 * Primary navigation. Home sections are hash anchors on `/`; Contact/Blog/Now
 * are dedicated routes. `/blog`, `/now` (and the Experience section) are built
 * in later waves and may 404 until then — that is expected.
 */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', href: '/#about', kind: 'anchor' },
  { id: 'projects', href: '/#projects', kind: 'anchor' },
  { id: 'skills', href: '/#skills', kind: 'anchor' },
  { id: 'portfolio', href: '/#portfolio', kind: 'anchor' },
  { id: 'experience', href: '/#experience', kind: 'anchor' },
  { id: 'contact', href: '/contact', kind: 'route' },
  { id: 'blog', href: '/blog', kind: 'route' },
  { id: 'now', href: '/now', kind: 'route' },
] as const;

export type SocialLink = {
  /** Stable id — also the `data-testid` suffix. */
  id: string;
  /** Accessible label (also used for `aria-label` / title). */
  label: string;
  href: string;
  Icon: ComponentType<IconProps>;
};

/** Social profile links rendered in the footer. Ported from the legacy footer. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/jooncco', Icon: GithubIcon },
  { id: 'leetcode', label: 'LeetCode', href: 'https://leetcode.com/jooncco', Icon: LeetcodeIcon },
  {
    id: 'codeforces',
    label: 'Codeforces',
    href: 'https://codeforces.com/profile/jooncco',
    Icon: CodeforcesIcon,
  },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/jooncco', Icon: LinkedinIcon },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/jooncco',
    Icon: InstagramIcon,
  },
  { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/jooncco', Icon: FacebookIcon },
] as const;
