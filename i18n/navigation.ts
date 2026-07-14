import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation primitives (Unit U3).
 *
 * Use these instead of `next/link` / `next/navigation` so that the active
 * locale prefix is applied automatically and preserved across navigation.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
