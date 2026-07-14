// Projects — capability-grouped "mission log" structural data (Unit U4).
//
// Display text (title / outcome / contributions) is localized under the
// `sections.projects.items.<id>` message namespace. Only structural fields
// (domain, period, tech, link, featured) live here.

import type { ExpertiseDomain, Project } from '@/types';

/** Domain render order for the mission log. */
export const DOMAIN_ORDER: ExpertiseDomain[] = [
  'solutions-architecture',
  'full-stack',
  'ai-agents',
  'algo-trading',
];

export const PROJECTS: Project[] = [
  // --- AI Agents ---------------------------------------------------------
  {
    id: 'aboitiz-ocr-meter',
    domain: 'ai-agents',
    period: 'Aug 2024 – Present',
    tech: ['React 18', 'AWS Lambda', 'Amazon EC2', 'Amazon Textract', 'YOLOv9', 'OCR', 'Flutter'],
    featured: true,
  },
  {
    id: 'gcbio-genai-audit',
    domain: 'ai-agents',
    period: 'Mar 2024 – Jul 2024',
    tech: ['Amazon Bedrock', 'Amazon S3', 'AWS Lambda', 'GenAI', 'Claude', 'AWS CDK'],
    featured: true,
  },

  // --- Solutions Architecture -------------------------------------------
  {
    id: 'gsglobal-t4k-feedback',
    domain: 'solutions-architecture',
    period: 'Dec 2023',
    tech: [
      'Amazon EC2',
      'AWS Lambda',
      'Amazon S3',
      'Amazon RDS',
      'Amazon Comprehend',
      'Amazon SES',
      'Python',
      'OpenCV',
      'Spring Boot',
    ],
    featured: true,
  },
  {
    id: 'lguplus-ucmp',
    domain: 'solutions-architecture',
    period: 'Jul 2021 – Feb 2022',
    tech: ['Spring Boot', 'MyBatis', 'Thymeleaf', 'React', 'MySQL', 'AWS', 'GitHub API'],
  },

  // --- Full Stack --------------------------------------------------------
  {
    id: 'krx-fast-download',
    domain: 'full-stack',
    period: 'Jan 2024 – Feb 2024',
    tech: ['Next.js 14', 'Tailwind CSS', 'Zustand', 'Axios', 'Amazon S3'],
  },
  {
    id: 'lge-iptv-modernization',
    domain: 'full-stack',
    period: 'Feb 2023 – Nov 2023',
    tech: ['Spring Boot', 'MyBatis', 'MySQL', 'AWS'],
  },
  {
    id: 'bithumb-naemo-nft',
    domain: 'full-stack',
    period: 'Mar 2022 – Dec 2022',
    tech: ['Spring Boot', 'Spring Data JPA', 'QueryDSL', 'MySQL', 'React', 'MobX', 'AWS'],
    link: { href: 'https://naemo.io', label: 'naemo.io' },
    featured: true,
  },
  {
    id: 'hanwha-p3-points',
    domain: 'full-stack',
    period: 'Feb 2021 – Jun 2021',
    tech: ['Spring Boot', 'MyBatis', 'React', 'MySQL', 'AWS'],
  },
  {
    id: 'okimoki-coffee-bot',
    domain: 'full-stack',
    period: 'Jan 2020 – Dec 2020',
    tech: ['Spring Boot', 'Spring Data JPA', 'Spring WebFlux', 'PostgreSQL', 'AWS'],
  },

  // --- Algo Trading ------------------------------------------------------
  {
    id: 'algo-trading-research',
    domain: 'algo-trading',
    period: '2023 – Present',
    tech: ['Python', 'LSTM', 'Pandas', 'NumPy', 'Backtesting'],
  },
];

/** Group projects by domain, preserving `DOMAIN_ORDER` and dropping empty domains. */
export function groupProjectsByDomain(
  projects: Project[] = PROJECTS,
): { domain: ExpertiseDomain; projects: Project[] }[] {
  return DOMAIN_ORDER.map((domain) => ({
    domain,
    projects: projects.filter((p) => p.domain === domain),
  })).filter((group) => group.projects.length > 0);
}
