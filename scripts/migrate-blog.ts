/**
 * Blog migration (Unit U6).
 *
 * Reads the legacy Jekyll blog at `~/workspace/jooncco.github.io/_posts`,
 * transforms each post's Jekyll front-matter into our schema, detects the
 * post's PRIMARY language (Hangul-ratio heuristic), rewrites image paths
 * (`/public/images/...` -> `/blog/images/...`), copies referenced images into
 * `public/blog/images/`, and writes `content/blog/<slug>.<locale>.mdx`.
 *
 * Content is sanitized minimally so it parses as MDX (v3, via next-mdx-remote
 * v5): fenced/inline code is preserved verbatim; inline math `\(...\)` becomes
 * `$...$` (KaTeX); raw `<img>` becomes Markdown images; stray HTML wrappers are
 * unwrapped; leftover `{ } <` in prose are escaped so they are treated as text.
 * Math spans are protected from escaping (remark-math tokenizes `$...$`, so the
 * braces inside are already safe from the MDX parser).
 *
 * Idempotent: re-running produces identical output (files are overwritten).
 *
 * Run with: `npm run migrate:blog`
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import matter from 'gray-matter';

type Locale = 'en' | 'ko';

const HOME = os.homedir();
const SRC_ROOT = path.join(HOME, 'workspace', 'jooncco.github.io');
const SRC_POSTS = path.join(SRC_ROOT, '_posts');
const SRC_IMAGES = path.join(SRC_ROOT, 'public', 'images');

const REPO = process.cwd();
const OUT_CONTENT = path.join(REPO, 'content', 'blog');
const OUT_IMAGES = path.join(REPO, 'public', 'blog', 'images');

/** Unicode ranges covering Hangul syllables + jamo. */
const HANGUL_RE = /[가-힣ᄀ-ᇿ㄰-㆏]/g;
const LATIN_RE = /[A-Za-z]/g;

/** Strip code (fenced + inline) so language detection ignores English-heavy code. */
function stripCode(md: string): string {
  return md.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ');
}

/**
 * Detect a post's primary language. Code is excluded; a post is Korean when the
 * share of Hangul among all letters clears a low threshold (Korean prose here
 * greatly outweighs incidental English terms; English posts have ~0 Hangul).
 */
function detectPrimaryLocale(text: string): Locale {
  const prose = stripCode(text);
  const hangul = (prose.match(HANGUL_RE) || []).length;
  if (hangul === 0) return 'en';
  const latin = (prose.match(LATIN_RE) || []).length;
  const ratio = hangul / (hangul + latin);
  return ratio >= 0.15 ? 'ko' : 'en';
}

function rewriteImagePath(src: string): string {
  return src
    .replace(/^\/?public\/images\//, '/blog/images/')
    .replace(/^images\//, '/blog/images/');
}

/** Collect basenames of every `/public/images/<file>` referenced in the raw source. */
function collectImageRefs(raw: string): Set<string> {
  const refs = new Set<string>();
  const re = /\/?public\/images\/([^\s"'()<>]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) refs.add(m[1]);
  return refs;
}

/** Normalize the inside of a math span for KaTeX (Markdown double-escaping artifacts). */
function normMath(inner: string): string {
  return inner
    .replace(/\\\\\{/g, '\\{') // `\\{` -> `\{`
    .replace(/\\\\\}/g, '\\}') // `\\}` -> `\}`
    .replace(/\\_/g, '_'); // `\_` -> `_` (subscript)
}

type Sanitize = {
  convertedImages: number;
  strippedTags: number;
  escapedBraces: number;
  escapedAngles: number;
  math: boolean;
};

/** Protect substrings behind opaque `@@TOKENn@@` placeholders (restored later). */
function protect(text: string, re: RegExp, token: string, store: string[]): string {
  return text.replace(re, (match) => {
    store.push(match);
    return '@@' + token + (store.length - 1) + '@@';
  });
}

function restore(text: string, token: string, store: string[]): string {
  return text.replace(new RegExp('@@' + token + '(\\d+)@@', 'g'), (_m, i: string) => store[Number(i)]);
}

/**
 * Transform a single non-code prose segment into clean MDX.
 * Records sanitization stats on `s`.
 */
function transformProse(text: string, s: Sanitize): string {
  let out = text;

  // 1. Display math `\[ ... \]` (double- or single-backslash) -> `$$ ... $$`.
  out = out.replace(/\\\\\[([\s\S]*?)\\\\\]/g, (_m, inner: string) => {
    s.math = true;
    return '$$' + normMath(inner) + '$$';
  });
  out = out.replace(/\\\[([\s\S]*?)\\\]/g, (_m, inner: string) => {
    s.math = true;
    return '$$' + normMath(inner) + '$$';
  });

  // 2. Inline math `\( ... \)` (double- or single-backslash) -> `$ ... $`.
  out = out.replace(/\\\\\(([\s\S]*?)\\\\\)/g, (_m, inner: string) => {
    s.math = true;
    return '$' + normMath(inner) + '$';
  });
  out = out.replace(/\\\(([\s\S]*?)\\\)/g, (_m, inner: string) => {
    s.math = true;
    return '$' + normMath(inner) + '$';
  });

  // 2b. Protect math spans: remark-math tokenizes `$...$` at parse time, so the
  //     `{ } <` inside are already safe from MDX and must NOT be escaped below.
  const mathSpans: string[] = [];
  out = protect(out, /\$\$[\s\S]*?\$\$|\$[^$\n]+\$/g, 'MATH', mathSpans);

  // 3. Raw <img ...> (self-closed or not) -> Markdown image with rewritten path.
  out = out.replace(/<img\b[^>]*?>/gi, (tag) => {
    const srcMatch = tag.match(/src\s*=\s*"([^"]*)"/i) || tag.match(/src\s*=\s*'([^']*)'/i);
    const titleMatch = tag.match(/title\s*=\s*"([^"]*)"/i);
    const altMatch = tag.match(/alt\s*=\s*"([^"]*)"/i);
    if (!srcMatch) return '';
    const src = rewriteImagePath(srcMatch[1]);
    const alt = (altMatch?.[1] ?? titleMatch?.[1] ?? '').replace(/[[\]]/g, '');
    const title = titleMatch?.[1];
    s.convertedImages += 1;
    return title ? '![' + alt + '](' + src + ' "' + title + '")' : '![' + alt + '](' + src + ')';
  });

  // 4. Unwrap presentational HTML wrappers; preserve inner text.
  out = out.replace(/<\/?(?:div|span|u|i|figure|figcaption|small|sup|sub)\b[^>]*>/gi, () => {
    s.strippedTags += 1;
    return '';
  });
  // <b>..</b> -> markdown bold to preserve emphasis.
  out = out.replace(/<\/?b\b[^>]*>/gi, () => {
    s.strippedTags += 1;
    return '**';
  });

  // 5. Escape leftover `<` that would otherwise open a JSX tag / comparison.
  //    Keep `<letter` / `</` (autolinks like <https://...> and any real tags).
  out = out.replace(/<(?![A-Za-z/])/g, () => {
    s.escapedAngles += 1;
    return '&lt;';
  });

  // 6. Escape leftover curly braces (all remaining are literal prose, not JSX).
  out = out.replace(/[{}]/g, (c) => {
    s.escapedBraces += 1;
    return c === '{' ? '&#123;' : '&#125;';
  });

  // 7. Restore protected math spans verbatim.
  out = restore(out, 'MATH', mathSpans);
  return out;
}

/** Apply prose transforms while leaving fenced + inline code untouched. */
function sanitizeBody(body: string, s: Sanitize): string {
  const fences: string[] = [];
  const inlines: string[] = [];
  let out = protect(body, /```[\s\S]*?```/g, 'FENCE', fences);
  out = protect(out, /`[^`\n]*`/g, 'INLINE', inlines);
  out = transformProse(out, s);
  out = restore(out, 'INLINE', inlines);
  out = restore(out, 'FENCE', fences);
  return out;
}

function toIsoDate(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (value instanceof Date) return value.toISOString();
  const d = new Date(String(value));
  return Number.isNaN(d.getTime()) ? String(value) : d.toISOString();
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v)).filter(Boolean);
  if (value == null) return [];
  return [String(value)];
}

type Report = {
  total: number;
  byLocale: Record<Locale, number>;
  byCategory: Record<string, number>;
  images: number;
  sanitized: { slug: string; locale: Locale; notes: string[] }[];
};

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function main(): void {
  if (!fs.existsSync(SRC_POSTS)) {
    console.error(`[migrate-blog] source posts not found: ${SRC_POSTS}`);
    process.exit(1);
  }
  ensureDir(OUT_CONTENT);
  ensureDir(OUT_IMAGES);

  const files = fs
    .readdirSync(SRC_POSTS)
    .filter((f) => f.endsWith('.md') || f.endsWith('.markdown'))
    .sort();

  const report: Report = {
    total: 0,
    byLocale: { en: 0, ko: 0 },
    byCategory: {},
    images: 0,
    sanitized: [],
  };
  const copiedImages = new Set<string>();

  for (const file of files) {
    const nameMatch = file.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)\.(?:md|markdown)$/);
    if (!nameMatch) {
      console.warn(`[migrate-blog] skipping unrecognized filename: ${file}`);
      continue;
    }
    const [, y, mo, d, slug] = nameMatch;
    const date = `${y}-${mo}-${d}`;

    const raw = fs.readFileSync(path.join(SRC_POSTS, file), 'utf8');
    const parsed = matter(raw);
    const fm = parsed.data as Record<string, unknown>;
    const body = parsed.content;

    const locale = detectPrimaryLocale(`${String(fm.title ?? '')}\n${body}`);

    const header = (fm.header ?? {}) as Record<string, unknown>;
    const ogRaw = (header.og_image ?? header.teaser) as string | undefined;
    const ogImage = ogRaw ? rewriteImagePath(ogRaw) : undefined;

    const s: Sanitize = {
      convertedImages: 0,
      strippedTags: 0,
      escapedBraces: 0,
      escapedAngles: 0,
      math: false,
    };
    const content = sanitizeBody(body, s).trim();

    const frontMatter: Record<string, unknown> = {
      title: String(fm.title ?? slug),
      date,
      category: String(fm.category ?? 'etc'),
      tags: asStringArray(fm.tags),
    };
    const lastModified = toIsoDate(fm.last_modified_at);
    if (lastModified) frontMatter.lastModified = lastModified;
    if (fm.excerpt) frontMatter.teaser = String(fm.excerpt);
    if (ogImage) frontMatter.ogImage = ogImage;

    const outName = `${slug}.${locale}.mdx`;
    const outPath = path.join(OUT_CONTENT, outName);
    const serialized = matter.stringify(`\n${content}\n`, frontMatter);
    fs.writeFileSync(outPath, serialized, 'utf8');

    // Copy referenced images (paths already rewritten in body/front-matter).
    const refs = collectImageRefs(raw);
    if (ogRaw) refs.add(ogRaw.replace(/^\/?public\/images\//, ''));
    for (const ref of refs) {
      const clean = ref.replace(/^\/?public\/images\//, '');
      const from = path.join(SRC_IMAGES, clean);
      const to = path.join(OUT_IMAGES, clean);
      if (fs.existsSync(from) && fs.statSync(from).isFile()) {
        ensureDir(path.dirname(to));
        fs.copyFileSync(from, to);
        copiedImages.add(clean);
      }
    }

    report.total += 1;
    report.byLocale[locale] += 1;
    const cat = String(fm.category ?? 'etc');
    report.byCategory[cat] = (report.byCategory[cat] ?? 0) + 1;
    const notes: string[] = [];
    if (s.math) notes.push('math->katex');
    if (s.convertedImages) notes.push(`img->md x${s.convertedImages}`);
    if (s.strippedTags) notes.push(`unwrapped-html x${s.strippedTags}`);
    if (s.escapedBraces) notes.push(`escaped-braces x${s.escapedBraces}`);
    if (s.escapedAngles) notes.push(`escaped-angles x${s.escapedAngles}`);
    if (s.escapedBraces || s.escapedAngles || s.strippedTags) {
      report.sanitized.push({ slug, locale, notes });
    }
  }
  report.images = copiedImages.size;

  console.log('\n[migrate-blog] done');
  console.log(JSON.stringify(report, null, 2));
}

main();
