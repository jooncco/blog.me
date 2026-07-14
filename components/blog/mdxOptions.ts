import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';

/**
 * MDX compile options shared by every rendered post (Unit U6).
 *
 * - remark-gfm    → tables, strikethrough, task lists, autolinks
 * - remark-math   → tokenizes `$...$` / `$$...$$` (protects braces from MDX)
 * - rehype-slug   → stable heading ids for the in-page TOC / anchors
 * - rehype-katex  → renders math (`throwOnError`/`strict` off so a malformed
 *                   author expression degrades gracefully instead of breaking)
 * - rehype-highlight → server-side syntax highlighting (`.hljs-*` classes,
 *                   themed in `blog.css`)
 * - rehype-unwrap-images → removes the `<p>` wrapper around lone images so the
 *                   block `<figure>` (from MdxComponents.img) is not nested
 *                   inside a `<p>` (invalid HTML → hydration mismatch)
 *
 * Frontmatter is already stripped by gray-matter in the loader, so
 * `parseFrontmatter` stays off.
 */
export const mdxOptions: MDXRemoteProps['options'] = {
  parseFrontmatter: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeSlug,
      rehypeUnwrapImages,
      [rehypeKatex, { throwOnError: false, strict: false }],
      rehypeHighlight,
    ],
    format: 'mdx',
  },
};
