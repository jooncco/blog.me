// Progressive "typing" frames for the About typewriter (Unit U4).
//
// For Korean, a syllable is assembled jamo-by-jamo the way it is actually typed on a
// keyboard: lead consonant → +vowel → +tail. e.g. "알고리즘" →
//   ㅇ, 아, 알, 알ㄱ, 알고, 알고ㄹ, 알고리, 알고리ㅈ, 알고리즈, 알고리즘
// For non-Korean text each character is one frame (plain character-by-character typing).

const HANGUL_BASE = 0xac00;
const HANGUL_LAST = 0xd7a3;

// Compatibility jamo shown for a lead consonant on its own.
const LEAD_JAMO = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

const N_JUNG = 21;
const N_JONG = 28;

function isSyllable(cp: number): boolean {
  return cp >= HANGUL_BASE && cp <= HANGUL_LAST;
}

function compose(lead: number, vowel: number, tail: number): string {
  return String.fromCodePoint(HANGUL_BASE + (lead * N_JUNG + vowel) * N_JONG + tail);
}

/** The in-progress display states for a single character, appended after `prefix`. */
function charFrames(prefix: string, ch: string): string[] {
  const cp = ch.codePointAt(0) ?? 0;
  if (!isSyllable(cp)) return [prefix + ch];

  const sIndex = cp - HANGUL_BASE;
  const lead = Math.floor(sIndex / (N_JUNG * N_JONG));
  const vowel = Math.floor((sIndex % (N_JUNG * N_JONG)) / N_JONG);
  const tail = sIndex % N_JONG;

  const frames = [prefix + LEAD_JAMO[lead], prefix + compose(lead, vowel, 0)];
  if (tail !== 0) frames.push(prefix + compose(lead, vowel, tail));
  return frames;
}

/**
 * Ordered progressive display states for `target`, from empty-ish to the full string.
 * The last frame always equals `target`.
 */
export function buildTypingFrames(target: string): string[] {
  const frames: string[] = [];
  let prefix = '';
  for (const ch of target) {
    for (const f of charFrames(prefix, ch)) frames.push(f);
    prefix += ch;
  }
  return frames.length > 0 ? frames : [''];
}
