import * as React from 'react';
// Import the jsx runtime from THIS app-server module so evaluated MDX elements
// are created with the same React the RSC renderer uses. next-mdx-remote/rsc's
// own `MDXRemote` evaluates with a pre-bundled `jsx-runtime.cjs`, which under
// Next 15's RSC bundling resolves to a *foreign* React copy and triggers
// "A React Element from an older version of React was rendered." Doing the eval
// here sidesteps that (Unit U6).
import * as jsxRuntime from 'react/jsx-runtime';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXComponents } from 'mdx/types';
import { mdxOptions } from './mdxOptions';

/**
 * Compile + evaluate an MDX string into a React element on the server, using
 * the app's own React runtime. Mirrors next-mdx-remote's `compileMDX` but keeps
 * the evaluation scope inside app code.
 */
export async function renderMdx(
  source: string,
  components: MDXComponents,
): Promise<React.ReactElement> {
  const { compiledSource, frontmatter, scope } = await serialize(source, mdxOptions, true);

  const fullScope: Record<string, unknown> = {
    opts: jsxRuntime,
    frontmatter,
    ...(scope as Record<string, unknown>),
  };
  const keys = Object.keys(fullScope);
  const values = Object.values(fullScope);

  // The compiled MDX is a function body that returns `{ default: MDXContent }`,
  // referencing `opts.jsx*` for element creation. Evaluate it with our scope.
  const hydrateFn = Reflect.construct(Function, keys.concat(String(compiledSource)));
  const Content = hydrateFn.apply(hydrateFn, values).default as React.ComponentType<{
    components?: MDXComponents;
  }>;

  return React.createElement(Content, { components });
}
