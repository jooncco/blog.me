// Experience — formal roles/dates timeline (Unit U4).
//
// Seeded from the companies/periods in the legacy Projects data (a distinct engagement per
// company). Summaries/highlights are proper-noun-heavy content kept here; the "Present"
// label and section chrome are localized via the `sections` namespace.
//
// `start` / `end` use `YYYY.MM` so they sort and format predictably; omit `end` for ongoing.

import type { ExperienceEntry } from '@/types';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'aboitiz-power',
    role: 'Prototyping Engineer',
    org: 'Aboitiz Power',
    start: '2024.08',
    summary: 'Prototyping and productionizing an image-based intelligent meter-reading app.',
    highlights: [
      'Designed the PoC architecture and led it to sign-off.',
      'Built the React front end and an AWS Lambda serverless backend.',
      'Shipped the production Flutter application.',
    ],
  },
  {
    id: 'gc-biopharma',
    role: 'Prototyping Engineer',
    org: 'GC Biopharma',
    start: '2024.03',
    end: '2024.07',
    summary: 'Delivered a Claude 3.5 Sonnet RAG assistant for regular audits.',
    highlights: [
      'Customized an AWS Bedrock RAG application for the audit workflow.',
      'Prompt-engineered bilingual (KO/EN) knowledge augmentation.',
    ],
  },
  {
    id: 'krx',
    role: 'Frontend Engineer',
    org: 'KRX',
    start: '2024.01',
    end: '2024.02',
    summary: 'Built a Next.js app with high-throughput multipart download for TB-scale files.',
    highlights: [
      'Cut a 1.2 TB file’s download time by 40% with a multipart module.',
      'Implemented the front end with Next.js and Tailwind CSS.',
    ],
  },
  {
    id: 'gs-global',
    role: 'Solutions Architect',
    org: 'GS Global',
    start: '2023.12',
    end: '2023.12',
    summary: 'Architected an automated KakaoTalk-feedback anomaly-detection pipeline.',
    highlights: [
      'Owned the overall system design.',
      'Built the KakaoTalk scrapper and the Spring Boot uploader to S3.',
    ],
  },
  {
    id: 'lg-electronics',
    role: 'Backend Engineer',
    org: 'LG Electronics',
    start: '2023.02',
    end: '2023.11',
    summary: 'Modernized next-generation IPTV web servers.',
    highlights: [
      'Implemented IPTV device authentication and initialization REST APIs.',
      'Reduced a device-initialization API’s latency by 50% with executor threads.',
      'Built a batch microservice shipping logs to S3 for monitoring.',
    ],
  },
  {
    id: 'bithumb-meta',
    role: 'Full Stack Engineer',
    org: 'Bithumb Meta',
    start: '2022.03',
    end: '2022.12',
    summary: 'Shipped wallet, social-OAuth, and launchpad features for the “Naemo World” NFT marketplace.',
    highlights: [
      'Built the My Wallet page and related REST APIs.',
      'Implemented SNS OAuth and Ethereum/Solana withdraw APIs.',
      'Built the admin Launchpad list page and its REST APIs.',
    ],
  },
  {
    id: 'lg-uplus',
    role: 'Full Stack Engineer',
    org: 'LG U+',
    start: '2021.07',
    end: '2022.02',
    summary: 'Built UCMP, a cloud resource management platform for GCP/AWS.',
    highlights: [
      'Implemented email 2FA, sign-up/out, and their REST APIs.',
      'Built the cloud-resource creation page and Amazon SES notifications.',
    ],
  },
  {
    id: 'hanwha',
    role: 'Full Stack Engineer',
    org: 'Hanwha',
    start: '2021.02',
    end: '2021.06',
    summary: 'Delivered the “P3” blockchain-ledger point platform for life insurance.',
    highlights: [
      'Built point-transaction REST APIs: payment, transfer, refund.',
      'Built the admin point-usage history page and its APIs.',
    ],
  },
  {
    id: 'okimoki',
    role: 'Backend Engineer',
    org: 'Okimoki',
    start: '2020.01',
    end: '2020.12',
    summary: 'Built the “Okimoki” coffee-order chatbot backend inside KakaoTalk.',
    highlights: [
      'Designed and built three microservices: store, menu, order.',
      'Modeled coffee-coupon data and implemented 2FA.',
    ],
  },
];
