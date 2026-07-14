// HUD typography — next/font/google configuration (Unit U2).
//
// Exposes CSS variables that tailwind.config.js maps onto fontFamily tokens:
//   --font-display      Rajdhani   -> font-display (HUD headings, labels)
//   --font-display-alt  Orbitron   -> font-display-alt (hero / callsign accents)
//   --font-mono         JetBrains  -> font-mono (data readouts, code)
//   --font-sans         Raleway    -> font-sans (body copy)
//
// U3 wires `fontVariables` onto <html> / <body> in the root layout.
import { Rajdhani, Orbitron, JetBrains_Mono, Raleway } from 'next/font/google';

export const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display-alt',
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

/** Space-separated CSS-variable class names to spread on <html> or <body>. */
export const fontVariables = [
  rajdhani.variable,
  orbitron.variable,
  jetbrainsMono.variable,
  raleway.variable,
].join(' ');
