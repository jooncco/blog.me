import { setRequestLocale } from 'next-intl/server';
import {
  About,
  Projects,
  Skills,
  Portfolio,
  CompetitiveProgramming,
  ExperienceTimeline,
  BlogHighlights,
} from '@/components/sections';
import { ABOUT } from '@/data/about';
import { groupProjectsByDomain } from '@/data/projects';
import { SKILLS } from '@/data/skills';
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from '@/data/portfolio';
import { EXPERIENCE } from '@/data/experience';
import { getCpStats } from '@/lib/cp/snapshot';
import { getLatestPosts } from '@/lib/blog';
import type { Locale } from '@/types';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [cpStats, latestPosts] = await Promise.all([
    getCpStats(),
    getLatestPosts(locale as Locale, 3),
  ]);

  return (
    <div className="flex flex-col">
      <About data={ABOUT} />
      <Projects groups={groupProjectsByDomain()} />
      <Skills categories={SKILLS} />
      <Portfolio items={PORTFOLIO} categories={[...PORTFOLIO_CATEGORIES]} />
      <CompetitiveProgramming stats={cpStats} />
      <ExperienceTimeline entries={EXPERIENCE} />
      <BlogHighlights posts={latestPosts} />
    </div>
  );
}
