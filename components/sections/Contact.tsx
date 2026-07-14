'use client';

import { useTranslations } from 'next-intl';
import { GlowText, HudFrame } from '@/components/hud';
import { Section } from './Section';
import { ContactForm } from './ContactForm';
import Stars from './three/Stars';
import HudGlobe from './three/HudGlobe';

/** Contact section — validated form plus a lightweight HUD globe over a canvas starfield. */
export function Contact() {
  const t = useTranslations('sections');

  return (
    <Section id="contact" kicker={t('contact.kicker')} title={t('contact.title')}>
      <div className="relative overflow-hidden rounded-sm">
        <Stars />
        <div className="relative z-10 flex flex-col gap-6 xl:flex-row">
          <HudFrame variant="panel" glow="cyan" className="w-full p-6 xl:w-1/2">
            <p className="mb-6 font-sans text-sm text-text/70">
              <GlowText color="cyan">▸</GlowText> {t('contact.intro')}
            </p>
            <ContactForm />
          </HudFrame>

          <div className="min-h-[20rem] flex-1">
            <HudGlobe label={t('contact.sceneLabel')} />
          </div>
        </div>
      </div>
    </Section>
  );
}
