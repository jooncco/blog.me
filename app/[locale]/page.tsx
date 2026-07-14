import { setRequestLocale } from 'next-intl/server';
import About from '@/components/About/About';
import Projects from '@/components/Projects/Projects';
import Skills from '@/components/Skills/Skills';
import Portfolio from '@/components/Portfolio/Portfolio';
import CompetitiveProgramming from '@/components/CompetitiveProgramming/CompetitiveProgramming';
import NewsFeed from '@/components/NewsFeed/NewsFeed';
import Testimonials from '@/components/Testimonials/Testimonials';

type Props = {
  params: Promise<{ locale: string }>;
};

// NOTE: the home page still renders the legacy section components as-is; they
// are rewritten/removed in Wave 4 (U4). This page only makes them compile and
// render under `app/[locale]`.
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col rounded-2xl bg-neutral px-0 drop-shadow-lg sm:px-8">
      <About />
      <Projects />
      <Skills />
      <Portfolio />
      <CompetitiveProgramming />
      <NewsFeed />
      <Testimonials />
    </div>
  );
}
