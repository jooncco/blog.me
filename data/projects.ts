// Projects — capability-grouped "mission log" content (Unit U4).
//
// Ported from the legacy components/Projects/constants.js. Each project is assigned an
// `ExpertiseDomain` so the Projects section can group them as mission briefings.
// Display chrome (domain labels, "company", buttons) is localized via the `sections`
// message namespace; the project data itself (titles/outcomes/tech) lives here.
//
// Domain assignment (best-fit, see summary in the PR notes):
//   solutions-architecture: GS Global, LG U+ (UCMP)
//   full-stack:             KRX, LG Electronics, Bithumb, Hanwha, Okimoki
//   ai-agents:              Aboitiz Power (OCR), GC Biopharma (GenAI RAG)
//   algo-trading:           Algorithmic Trading Research (seeded — see FLAG below)

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
    title: 'OCR Meter Reading Application',
    domain: 'ai-agents',
    company: 'Aboitiz Power',
    period: 'Aug 2024 – Present',
    outcome:
      'Led a successful PoC for an image-based intelligent electricity-meter reading app — from architecture through production Flutter delivery.',
    contributions: [
      'Designed the prototype web-app architecture and drove the PoC to sign-off.',
      'Built the React front end and a serverless backend on AWS Lambda.',
      'Shipped the production Flutter mobile application.',
    ],
    tech: ['React 18', 'AWS Lambda', 'Amazon EC2', 'Amazon Textract', 'YOLOv9', 'OCR', 'Flutter'],
    featured: true,
  },
  {
    id: 'gcbio-genai-audit',
    title: 'GenAI Audit Assistant Bot',
    domain: 'ai-agents',
    company: 'GC Biopharma',
    period: 'Mar 2024 – Jul 2024',
    outcome:
      'Delivered a Claude 3.5 Sonnet RAG assistant that augments regular audits with bilingual (KO/EN) knowledge retrieval.',
    contributions: [
      'Customized the AWS Bedrock RAG sample (bedrock-claude-chat) for the audit workflow.',
      'Prompt-engineered multi-language (Korean, English) knowledge augmentation.',
      'Wrote the AWS Lambda trigger for knowledge-base sync workloads.',
    ],
    tech: ['Amazon Bedrock', 'Amazon S3', 'AWS Lambda', 'GenAI', 'Claude', 'AWS CDK'],
    featured: true,
  },

  // --- Solutions Architecture -------------------------------------------
  {
    id: 'gsglobal-t4k-feedback',
    title: 'Automated Feedback Notification System',
    domain: 'solutions-architecture',
    company: 'GS Global',
    period: 'Dec 2023',
    outcome:
      'Architected an anomaly-detection pipeline that scrapes KakaoTalk feedback, scores sentiment, and automatically alerts the responsible team.',
    contributions: [
      'Owned the overall system design.',
      'Built the Scrapper — a Python app that automates export of KakaoTalk chat content.',
      'Built the Uploader — a Spring Boot app that parses chat text and uploads it to S3.',
    ],
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
    title: 'UCMP — Cloud Resource Management Platform',
    domain: 'solutions-architecture',
    company: 'LG U+',
    period: 'Jul 2021 – Feb 2022',
    outcome:
      'Built a platform to provision standardized GCP/AWS resources and projects in a few clicks, with email 2FA and notifications.',
    contributions: [
      'Implemented email-based two-factor authentication.',
      'Built the sign-up / sign-out pages and their REST APIs.',
      'Built the cloud-resource creation page and its REST APIs.',
      'Added email notifications via Amazon SES.',
    ],
    tech: ['Spring Boot', 'MyBatis', 'Thymeleaf', 'React', 'MySQL', 'AWS', 'GitHub API'],
  },

  // --- Full Stack --------------------------------------------------------
  {
    id: 'krx-fast-download',
    title: 'Fast Download for TB-scale Files',
    domain: 'full-stack',
    company: 'KRX',
    period: 'Jan 2024 – Feb 2024',
    outcome:
      'Cut download time for a 1.2 TB file by 40% with a custom multipart download module in a Next.js app.',
    contributions: [
      'Designed and implemented a multipart download module with Axios.',
      'Built the front-end app with Next.js and Tailwind CSS.',
    ],
    tech: ['Next.js 14', 'Tailwind CSS', 'Zustand', 'Axios', 'Amazon S3'],
  },
  {
    id: 'lge-iptv-modernization',
    title: 'IPTV Web Application Modernization',
    domain: 'full-stack',
    company: 'LG Electronics',
    period: 'Feb 2023 – Nov 2023',
    outcome:
      'Modernized next-generation IPTV web servers and halved a device-initialization API’s latency with executor threads.',
    contributions: [
      'Implemented REST APIs for IPTV device authentication and initialization from device metadata.',
      'Reduced a device-initialization API’s execution time by 50% using executor threads.',
      'Built a batch microservice that periodically ships log files to S3 for monitoring.',
    ],
    tech: ['Spring Boot', 'MyBatis', 'MySQL', 'AWS'],
  },
  {
    id: 'bithumb-naemo-nft',
    title: 'NFT Marketplace “Naemo World”',
    domain: 'full-stack',
    company: 'Bithumb Meta',
    period: 'Mar 2022 – Dec 2022',
    outcome:
      'Shipped wallet, social OAuth, and launchpad features for an NFT marketplace serving creators and collectors.',
    contributions: [
      'Built the My Wallet page and related REST APIs (wallet connect, balances, etc.).',
      'Implemented SNS OAuth (Twitter, Discord, Telegram, Instagram).',
      'Built the SNS event mission page and Ethereum/Solana withdraw APIs.',
      'Built the admin Launchpad list page and its REST APIs.',
    ],
    tech: ['Spring Boot', 'Spring Data JPA', 'QueryDSL', 'MySQL', 'React', 'MobX', 'AWS'],
    link: { href: 'https://naemo.io', label: 'naemo.io' },
    featured: true,
  },
  {
    id: 'hanwha-p3-points',
    title: 'Life-Insurance Point Platform “P3”',
    domain: 'full-stack',
    company: 'Hanwha',
    period: 'Feb 2021 – Jun 2021',
    outcome:
      'Delivered blockchain-ledger-backed point transactions (payment, transfer, refund) for a life-insurance rewards platform.',
    contributions: [
      'Built point-transaction REST APIs: payment, transfer, refund.',
      'Built the admin point-usage history page and its REST APIs.',
    ],
    tech: ['Spring Boot', 'MyBatis', 'React', 'MySQL', 'AWS'],
  },
  {
    id: 'okimoki-coffee-bot',
    title: '“Okimoki” — Coffee Order Chatbot',
    domain: 'full-stack',
    company: 'Okimoki',
    period: 'Jan 2020 – Dec 2020',
    outcome:
      'Designed and built three backend microservices (store, menu, order) powering coffee ordering inside KakaoTalk.',
    contributions: [
      'Designed and implemented three back-end microservices: store, menu, order.',
      'Modeled coffee-coupon data.',
      'Designed and implemented two-factor authentication.',
    ],
    tech: ['Spring Boot', 'Spring Data JPA', 'Spring WebFlux', 'PostgreSQL', 'AWS'],
  },

  // --- Algo Trading ------------------------------------------------------
  // FLAG (seeded default): no formal company project exists for this headline
  // capability, so this entry is grounded in the author's real ML/markets work
  // (see the "Bitcoin Price Predictor" portfolio item) and framed as ongoing
  // self-directed research to keep the domain represented in the mission log.
  {
    id: 'algo-trading-research',
    title: 'Systematic Crypto Trading Research',
    domain: 'algo-trading',
    company: 'Self-directed',
    period: '2023 – Present',
    outcome:
      'Exploring systematic crypto strategies — from LSTM/regression price models to backtested signal research.',
    contributions: [
      'Built market-indicator + Google-Trend feature pipelines for price prediction.',
      'Prototyped regression and LSTM RNN forecasting models.',
      'Backtests trading signals against historical OHLCV data.',
    ],
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
