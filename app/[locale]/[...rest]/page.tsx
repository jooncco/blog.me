import { notFound } from 'next/navigation';

// Catch-all for unknown localized paths → renders the localized `not-found.tsx`
// within the locale layout (so translations resolve at runtime).
export default function CatchAllPage() {
  notFound();
}
