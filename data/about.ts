// About / hero content (Unit U4).
//
// Structural data only — all display strings (greeting, bio, capability titles, typewriter
// roles) resolve through the `sections` message namespace so they are fully localizable.

import type { ExpertiseDomain } from '@/types';

/** i18n key under `sections.capabilities.*` + `sections.about.roles`. */
export type CapabilityKey =
  | 'solutionsArchitect'
  | 'fullStackEngineer'
  | 'aiAgentSpecialist'
  | 'algoTradingEnthusiast';

/** Which HUD glyph a capability card renders. */
export type CapabilityIcon = 'architect' | 'fullstack' | 'ai' | 'algo';

export type CapabilityDef = {
  key: CapabilityKey;
  icon: CapabilityIcon;
  /** Links the capability to the matching Projects domain. */
  domain: ExpertiseDomain;
};

/** Capabilities in the locked display order. */
export const CAPABILITIES: CapabilityDef[] = [
  { key: 'solutionsArchitect', icon: 'architect', domain: 'solutions-architecture' },
  { key: 'fullStackEngineer', icon: 'fullstack', domain: 'full-stack' },
  { key: 'aiAgentSpecialist', icon: 'ai', domain: 'ai-agents' },
  { key: 'algoTradingEnthusiast', icon: 'algo', domain: 'algo-trading' },
];

export type AboutData = {
  avatar: string;
  capabilities: CapabilityDef[];
};

export const ABOUT: AboutData = {
  avatar: '/assets/images/about/profile.jpg',
  capabilities: CAPABILITIES,
};
