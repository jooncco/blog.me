// Experience — formal roles/dates structural data (Unit U4).
//
// Display text (role / summary / highlights) is localized under the
// `sections.experience.items.<id>` message namespace. `start` / `end` use
// `YYYY.MM` so they sort and format predictably; omit `end` for ongoing.

import type { ExperienceEntry } from '@/types';

export const EXPERIENCE: ExperienceEntry[] = [
  { id: 'aboitiz-power', start: '2024.08' },
  { id: 'gc-biopharma', start: '2024.03', end: '2024.07' },
  { id: 'krx', start: '2024.01', end: '2024.02' },
  { id: 'gs-global', start: '2023.12', end: '2023.12' },
  { id: 'lg-electronics', start: '2023.02', end: '2023.11' },
  { id: 'bithumb-meta', start: '2022.03', end: '2022.12' },
  { id: 'lg-uplus', start: '2021.07', end: '2022.02' },
  { id: 'hanwha', start: '2021.02', end: '2021.06' },
  { id: 'okimoki', start: '2020.01', end: '2020.12' },
];
