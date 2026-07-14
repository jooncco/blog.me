import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';

/**
 * HUD-styled element map for rendered MDX posts (Unit U6).
 *
 * A whitelist of intrinsic elements (SR-6): only these tags get custom
 * rendering; no arbitrary components are injected into post content. Headings
 * receive ids from rehype-slug and expose an anchor affordance; fenced code is
 * framed and horizontally scrollable; blockquotes become HUD callouts.
 */

function heading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as const;
  const sizes: Record<number, string> = {
    2: 'mt-12 text-2xl sm:text-3xl',
    3: 'mt-8 text-xl sm:text-2xl',
    4: 'mt-6 text-lg sm:text-xl',
  };
  function Heading({ id, children, ...rest }: ComponentPropsWithoutRef<typeof Tag>) {
    return (
      <Tag
        id={id}
        className={clsx(
          'group scroll-mt-24 font-display font-semibold uppercase tracking-wide text-text',
          sizes[level],
        )}
        {...rest}>
        {id ? (
          <a href={`#${id}`} className="no-underline">
            <span className="mr-2 text-hud-cyan/40 opacity-0 transition-opacity group-hover:opacity-100">
              #
            </span>
            {children}
          </a>
        ) : (
          children
        )}
      </Tag>
    );
  }
  return Heading;
}

function isBlockCode(className?: string): boolean {
  return /(?:^|\s)(?:hljs|language-)/.test(className ?? '');
}

export const MdxComponents: MDXComponents = {
  h1: heading(2),
  h2: heading(2),
  h3: heading(3),
  h4: heading(4),

  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="my-4 leading-7 text-text/85" {...props} />
  ),

  a: ({ href = '', children, ...rest }: ComponentPropsWithoutRef<'a'>) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-medium text-hud-cyan underline decoration-hud-cyan/40 underline-offset-2 transition-colors hover:decoration-hud-cyan"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}>
        {children}
      </a>
    );
  },

  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="my-4 list-disc space-y-1.5 pl-6 text-text/85 marker:text-hud-cyan/60" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="my-4 list-decimal space-y-1.5 pl-6 text-text/85 marker:text-hud-cyan/70" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="leading-7" {...props} />,

  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="my-6 rounded-sm border-l-2 border-hud-gold/70 bg-hud-gold/5 py-1 pl-4 pr-3 italic text-text/80"
      {...props}
    />
  ),

  hr: () => <hr className="my-10 border-hud-cyan/20" />,

  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-text" {...props} />
  ),

  img: ({ src = '', alt = '', ...rest }: ComponentPropsWithoutRef<'img'>) => (
    <figure className="my-6">
      {/* Local, migrated assets under /blog/images — plain <img> keeps the
          server component dependency-free and avoids next/image config. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="mx-auto max-w-full rounded-sm border border-hud-cyan/20 bg-neutral2/40"
        {...rest}
      />
      {alt ? (
        <figcaption className="mt-2 text-center font-mono text-xs text-text/50">{alt}</figcaption>
      ) : null}
    </figure>
  ),

  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <div className="hud-code my-6 overflow-hidden rounded-sm border border-hud-cyan/25 bg-neutral2/50">
      <div className="flex items-center gap-1.5 border-b border-hud-cyan/15 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-hud-red/70" />
        <span className="h-2 w-2 rounded-full bg-hud-gold/70" />
        <span className="h-2 w-2 rounded-full bg-hud-cyan/70" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed" {...props} />
    </div>
  ),

  code: ({ className, children, ...rest }: ComponentPropsWithoutRef<'code'> & { children?: ReactNode }) => {
    if (isBlockCode(className)) {
      // Fenced code — highlighted by rehype-highlight; layout handled by <pre>.
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded-sm border border-hud-cyan/20 bg-hud-cyan/10 px-1.5 py-0.5 font-mono text-[0.85em] text-hud-cyan"
        {...rest}>
        {children}
      </code>
    );
  },

  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="border-b border-hud-cyan/30" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th className="px-3 py-2 text-left font-display text-xs uppercase tracking-wider text-hud-cyan" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="border-t border-hud-cyan/10 px-3 py-2 text-text/80" {...props} />
  ),
};
