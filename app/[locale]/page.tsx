import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  About,
  Projects,
  Skills,
  Portfolio,
  CompetitiveProgramming,
  ExperienceTimeline,
  BlogHighlights,
} from '@/components/sections';
import { buildMetadata, personJsonLd, webSiteJsonLd, JsonLdScript } from '@/lib/seo';
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

/** Concise, SEO-friendly home description composed from the About content. */
async function homeSeo(locale: Locale) {
  const t = await getTranslations({ locale, namespace: 'sections' });
  const c = await getTranslations({ locale, namespace: 'common' });
  const name = t('about.name');
  const roles = t.raw('about.roles') as string[];
  const title = `${c('siteName')} — ${roles.slice(0, 2).join(' · ')}`;
  const description = `${name} (jooncco): ${roles.join(', ')}. ${c('tagline')}`;
  return { title, description };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const { title, description } = await homeSeo(l);
  const meta = buildMetadata({ title, description, path: '/', locale: l });
  // Home owns the site name outright — bypass the "%s | jooncco.me" template.
  return { ...meta, title: { absolute: title } };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;

  const [cpStats, latestPosts, seo] = await Promise.all([
    getCpStats(),
    getLatestPosts(l, 3),
    homeSeo(l),
  ]);

  return (
    <div className="flex flex-col">
      <JsonLdScript
        data={[personJsonLd(l, seo.description), webSiteJsonLd(l, seo.description)]}
      />
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
