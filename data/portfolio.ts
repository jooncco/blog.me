// Portfolio — "hangar bay" bento-grid content (Unit U4).
//
// Ported from the legacy components/Portfolio/constants.js (empty legacy tabs dropped).
// Category chrome ("All" + filter labels) is localized via the `sections` namespace keyed by
// `category`; the item copy (title/desc) stays here. `size` drives the bento tile footprint.

import type { PortfolioItem } from '@/types';

/** Distinct categories, in filter order. */
export const PORTFOLIO_CATEGORIES = ['web', 'ml', 'tools'] as const;

export const PORTFOLIO: PortfolioItem[] = [
  // --- Web ---------------------------------------------------------------
  {
    id: 'spring-api-template',
    title: 'Spring Boot API Server Template',
    desc: 'Production-grade Spring Boot REST API starter — example endpoints for a fast productivity boost.',
    thumbnail: '/assets/images/portfolio/springapiservertemplate.png',
    category: 'web',
    githubUrl: 'https://github.com/jooncco/spring-api-server-template',
    size: 'lg',
  },
  {
    id: 'blog-me',
    title: 'blog.me',
    desc: 'This portfolio, built with Next.js + Tailwind. Fork it for your own developer portfolio.',
    thumbnail: '/assets/images/portfolio/blog.me.png',
    category: 'web',
    githubUrl: 'https://github.com/jooncco/blog.me',
    demoUrl: 'https://jooncco.me',
    size: 'md',
  },
  {
    id: 'jooncco-github-io',
    title: 'jooncco.github.io',
    desc: 'A dev blog on GitHub Pages using the Jekyll “Minimal Mistakes” template.',
    thumbnail: '/assets/images/portfolio/jooncco.github.io.png',
    category: 'web',
    githubUrl: 'https://github.com/jooncco/jooncco.github.io',
    demoUrl: 'https://jooncco.github.io',
    size: 'sm',
  },

  // --- ML ----------------------------------------------------------------
  {
    id: 'bitcoin-price-predictor',
    title: 'Bitcoin Price Predictor',
    desc: 'Bitcoin price prediction from market indicators and Google Trends using regression models and an LSTM RNN.',
    thumbnail: '/assets/images/portfolio/bitcoinpricepredictor.png',
    category: 'ml',
    githubUrl: 'https://github.com/jooncco/bitcoin-price-predictor',
    size: 'lg',
  },
  {
    id: 'coindrop-ai-agent',
    title: 'Coindrop Game AI Agent',
    desc: 'A reflex agent trained with reinforcement learning (Q-learning) that plays a pygame coin-drop game.',
    thumbnail: '/assets/images/portfolio/coindropgameaiagent.png',
    category: 'ml',
    githubUrl: 'https://github.com/jooncco/coindrop-game-ai-agent',
    size: 'sm',
  },
  {
    id: 'is-a-relationship-teller',
    title: '“is-a” Relationship Teller',
    desc: 'NLP for Korean words — tells whether an {Entity, Concept} pair holds an “is-a” relationship.',
    thumbnail: '/assets/images/portfolio/isarelationshipteller.png',
    category: 'ml',
    githubUrl: 'https://github.com/jooncco/is-A-relationship-teller',
    size: 'md',
  },

  // --- Tools -------------------------------------------------------------
  {
    id: 'kakaotalk-chat-exporter',
    title: 'KakaoTalk Chat Exporter',
    desc: 'An OpenCV macro that periodically exports the contents of a KakaoTalk chat room.',
    thumbnail: '/assets/images/portfolio/kakaotalkchatexporter.png',
    category: 'tools',
    githubUrl: 'https://github.com/jooncco/kakaotalk-chat-exporter',
    size: 'md',
  },
  {
    id: 'cp-snippet-java',
    title: 'CP Snippet Java',
    desc: 'A JSON config of Java code snippets — extremely handy for competitive programming.',
    thumbnail: '/assets/images/portfolio/cpsnippetjava.png',
    category: 'tools',
    githubUrl: 'https://github.com/jooncco/cp-snippet-java',
    size: 'sm',
  },
  {
    id: 'cp-stamper-cpp',
    title: 'CP Stamper C++',
    desc: 'A simple comment writer that stamps generated comments with author and timestamp.',
    thumbnail: '/assets/images/portfolio/cpstampercpp.png',
    category: 'tools',
    githubUrl: 'https://github.com/jooncco/cp-stamper-cpp',
    size: 'sm',
  },
];
