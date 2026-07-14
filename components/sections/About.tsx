'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { GlowText, HudButton, HudFrame, usePrefersReducedMotion } from '@/components/hud';
import { CapabilityCard } from './CapabilityCard';
import type { AboutData } from '@/data/about';

export type AboutProps = { data: AboutData };

const TYPE_SPEED = 90;
const HOLD_MS = 1600;

/** Cycles a typewriter through the localized capability roles. */
function useTypewriter(roles: string[], enabled: boolean): string {
  const [text, setText] = useState('');
  const state = useRef({ roleIdx: 0, deleting: false });

  useEffect(() => {
    if (!enabled || roles.length === 0) return;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { roleIdx, deleting } = state.current;
      const full = roles[roleIdx % roles.length];
      setText((prev) => {
        const next = deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1);

        if (!deleting && next === full) {
          state.current.deleting = true;
          timer = setTimeout(tick, HOLD_MS);
        } else if (deleting && next === '') {
          state.current.deleting = false;
          state.current.roleIdx = (roleIdx + 1) % roles.length;
          timer = setTimeout(tick, TYPE_SPEED);
        } else {
          timer = setTimeout(tick, deleting ? TYPE_SPEED / 2 : TYPE_SPEED);
        }
        return next;
      });
    };

    timer = setTimeout(tick, TYPE_SPEED);
    return () => clearTimeout(timer);
    // roles is stable per-locale; re-run when it or `enabled` changes.
  }, [roles, enabled]);

  return text;
}

/** Hero — greeting, typewriter roles, bio, avatar, and the capabilities grid. */
export function About({ data }: AboutProps) {
  const t = useTranslations('sections');
  const reduced = usePrefersReducedMotion();

  const roles = t.raw('about.roles') as string[];
  const typed = useTypewriter(roles, !reduced);
  const display = reduced ? roles[0] : typed;

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
          </h1>
          <p
            className="mt-4 flex items-center gap-2 font-mono text-lg text-text/80 sm:text-xl"
            data-testid="about-typewriter">
            <span className="text-hud-cyan/70">{t('about.roleLabel')}</span>
            <GlowText color="gold">{display}</GlowText>
            <span aria-hidden="true" className="animate-hud-pulse font-bold text-hud-red">
              |
            </span>
          </p>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-text/70 sm:text-base">
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
