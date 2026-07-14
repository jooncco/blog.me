// "Now" page content (Unit U4) — what I'm focused on right now.
//
// Item labels/details are localized via the `sections` namespace using each item `id`
// (sections.now.items.<id>.{label,detail}); this module holds the order, the "updated"
// date, and structural links (repo link / Instagram handle).

export type NowItemDef = {
  id: string;
  /** Optional outbound repo/link shown under the detail. */
  link?: { href: string; label: string };
  /** Optional Instagram handle → renders a "follow" CTA linking to the profile. */
  instagram?: string;
};

export type NowData = {
  /** ISO date the page was last updated. */
  updated: string;
  items: NowItemDef[];
};

export const NOW: NowData = {
  updated: '2026-07-14',
  items: [
    {
      id: 'algo-trading',
      link: { href: 'https://github.com/jooncco/billion-dollar-baby', label: 'billion-dollar-baby' },
    },
    {
      id: 'building-with-claude',
      link: { href: 'https://github.com/jooncco/blog.me', label: 'blog.me' },
    },
    { id: 'reading' },
    { id: 'baseball', instagram: 'jooncco' },
  ],
};
