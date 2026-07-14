// "Now" page content (Unit U4) — what I'm focused on right now.
//
// Inspired by nownownow.com. Item labels/details are localized via the `sections` namespace
// using each item `id` (sections.now.items.<id>.{label,detail}); this module holds the order
// and the "updated" date. Placeholder-but-plausible seed content — edit freely.

export type NowItemDef = { id: string };

export type NowData = {
  /** ISO date the page was last updated. */
  updated: string;
  items: NowItemDef[];
};

export const NOW: NowData = {
  updated: '2026-07-01',
  items: [
    { id: 'ai-agents' },
    { id: 'algo-trading' },
    { id: 'writing' },
    { id: 'learning' },
  ],
};
