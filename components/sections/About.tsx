'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { GlowText, HudButton, HudFrame, usePrefersReducedMotion } from '@/components/hud';
import { CapabilityCard } from './CapabilityCard';
import { buildTypingFrames } from './hangulTypewriter';
import type { AboutData } from '@/data/about';

export type AboutProps = { data: AboutData };

const EN_TYPE_SPEED = 100;
const KO_TYPE_SPEED = 45; // Korean assembles ~2–3 jamo frames per syllable, so type faster per frame.
const DELETE_SPEED = 35;
const HOLD_MS = 1500;

const HANGUL_RE = /[가-힣㄰-㆏]/;

type TypedState = { text: string; baseLen: number };

/**
 * Cycles a typewriter through the localized capability roles, assembling each
 * role frame-by-frame (jamo-by-jamo for Korean; see buildTypingFrames).
 * `baseLen` marks how many codepoints belong to the role itself (vs. the folded
 * suffix) so the caller can color the two parts differently.
 */
function useTypewriter(roles: string[], baseLens: number[], enabled: boolean): TypedState {
  const framesByRole = useMemo(() => roles.map(buildTypingFrames), [roles]);
  const speedByRole = useMemo(
    () => roles.map((r) => (HANGUL_RE.test(r) ? KO_TYPE_SPEED : EN_TYPE_SPEED)),
    [roles],
  );
  const [display, setDisplay] = useState<TypedState>({ text: '', baseLen: baseLens[0] ?? 0 });
  const state = useRef({ roleIdx: 0, frameIdx: 0, deleting: false });

  useEffect(() => {
    if (!enabled || framesByRole.length === 0) return;
    state.current = { roleIdx: 0, frameIdx: 0, deleting: false };
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const s = state.current;
      const frames = framesByRole[s.roleIdx % framesByRole.length];
      const typeSpeed = speedByRole[s.roleIdx % speedByRole.length];
      const baseLen = baseLens[s.roleIdx % baseLens.length];

      if (!s.deleting) {
        setDisplay({ text: frames[s.frameIdx], baseLen });
        if (s.frameIdx >= frames.length - 1) {
          s.deleting = true;
          timer = setTimeout(tick, HOLD_MS);
        } else {
          s.frameIdx += 1;
          timer = setTimeout(tick, typeSpeed);
        }
      } else {
        if (s.frameIdx <= 0) {
          s.deleting = false;
          s.roleIdx = (s.roleIdx + 1) % framesByRole.length;
          s.frameIdx = 0;
          setDisplay({ text: '', baseLen: baseLens[s.roleIdx % baseLens.length] });
          timer = setTimeout(tick, typeSpeed);
        } else {
          s.frameIdx -= 1;
          setDisplay({ text: frames[s.frameIdx], baseLen });
          timer = setTimeout(tick, DELETE_SPEED);
        }
      }
    };

    timer = setTimeout(tick, EN_TYPE_SPEED);
    return () => clearTimeout(timer);
    // framesByRole is stable per-locale; re-run when it or `enabled` changes.
  }, [framesByRole, speedByRole, baseLens, enabled]);

  return display;
}

/** Hero — greeting, typewriter roles, bio, avatar, and the capabilities grid. */
export function About({ data }: AboutProps) {
  const t = useTranslations('sections');
  const reduced = usePrefersReducedMotion();

  const rawRoles = t.raw('about.roles') as string[];
  const roleSuffix = t('about.roleSuffix');
  // Fold the suffix (e.g. Korean "입니다.") into each role so it is typed too;
  // baseLen keeps the role/suffix boundary so they can be colored differently.
  const roles = useMemo(() => rawRoles.map((r) => r + roleSuffix), [rawRoles, roleSuffix]);
  const baseLens = useMemo(() => rawRoles.map((r) => [...r].length), [rawRoles]);
  const typed = useTypewriter(roles, baseLens, !reduced);
  const active = reduced ? { text: roles[0], baseLen: baseLens[0] } : typed;
  const chars = [...active.text];
  const rolePart = chars.slice(0, active.baseLen).join('');
  const suffixPart = chars.slice(active.baseLen).join('');

  return (
    <section
      id="about"
      data-testid="section-about"
      className="scroll-mt-24 px-4 py-12 sm:px-8 sm:py-16">
      <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-hud-cyan/80">
            {t('about.kicker')}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight text-text sm:text-5xl lg:text-6xl">
            {t('about.greetingPre')} <GlowText color="cyan">{t('about.name')}</GlowText>
            {t('about.nameSuffix')}
          </h1>
          <p
            className="mt-4 font-mono text-lg text-text/80 sm:text-xl"
            data-testid="about-typewriter">
            <span className="text-text">{t('about.rolePrefix')} </span>
            <GlowText color="gold">{rolePart}</GlowText>
            {suffixPart && <span className="text-text">{suffixPart}</span>}
            <span aria-hidden="true" className="ml-1 animate-hud-pulse font-bold text-hud-red">
              |
            </span>
          </p>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-text sm:text-base dark:text-text/80">
            {t('about.bio')}
          </p>
          <div className="mt-6">
            <HudButton href="#projects" variant="outline" size="md">
              {t('about.cta')}
            </HudButton>
          </div>
        </div>

        <HudFrame
          variant="panel"
          glow="cyan"
          className="hidden shrink-0 overflow-hidden p-1 lg:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.avatar}
            alt={t('about.avatarAlt')}
            className="h-72 w-64 object-cover"
            loading="lazy"
          />
        </HudFrame>
      </div>

      <div className="mt-10 flex flex-wrap gap-4" data-testid="capabilities-grid">
        {data.capabilities.map((cap) => (
          <CapabilityCard key={cap.key} title={t(`capabilities.${cap.key}`)} icon={cap.icon} />
        ))}
      </div>
    </section>
  );
}
