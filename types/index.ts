// Shared type contract — frozen at end of U1 so parallel waves compile against it.
// See aidlc-docs/inception/application-design/component-methods.md

export type Locale = 'en' | 'ko';
export const LOCALES: Locale[] = ['en', 'ko'];
export const DEFAULT_LOCALE: Locale = 'en';

export type Capability = {
  title: string;
  shortTitle: string;
  icon: string;
};

export type ExpertiseDomain =
  | 'solutions-architecture'
  | 'full-stack'
  | 'ai-agents'
  | 'algo-trading';

export type Project = {
  id: string;
  title: string;
  domain: ExpertiseDomain;
  company?: string;
  period?: string;
  outcome: string;
  contributions: string[];
  tech: string[];
  link?: { href: string; label: string };
  featured?: boolean;
};

export type SkillCategory = {
  id: string;
  category: string;
  tools: { name: string; icon: string; level?: number }[];
};

export type PortfolioItem = {
  id: string;
  title: string;
  desc: string;
  thumbnail: string;
  category: string;
  githubUrl?: string;
  demoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
};

export type CPPlatform = 'leetcode' | 'codeforces';

export type CPStat = {
  platform: CPPlatform;
  handle: string;
  profileUrl: string;
  level?: string;
  rating?: number;
  rank?: number;
  attended?: number;
  topPercent?: number;
  fetchedAt: string;
  source: 'live' | 'fallback';
};

export type ExperienceEntry = {
  id: string;
  role: string;
  org: string;
  start: string;
  end?: string;
  summary: string;
  highlights: string[];
};

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  date: string;
  lastModified?: string;
  category: string;
  tags: string[];
  teaser?: string;
  ogImage?: string;
  availableLocales: Locale[];
};

export type Post = {
  meta: PostMeta;
  content: string; // raw MDX
};
