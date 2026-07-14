// Renders a JSON-LD payload as a <script type="application/ld+json"> tag.
// Server component — the payload is trusted (built from our own data), and it is
// JSON.stringify-serialised (no user HTML) so it is safe to inject. The `<` is
// escaped to prevent any `</script>` breakout from string fields.

import type { JsonLd } from './jsonLd';

export function JsonLdScript({ data }: { data: JsonLd | JsonLd[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
