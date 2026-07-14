'use client';

import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { GlowText, HudFrame, Reticle, usePrefersReducedMotion } from '@/components/hud';
import { Section } from './Section';
import { ContactForm } from './ContactForm';

// three.js / react-three-fiber can't be server-rendered — lazy, client-only.
const EarthCanvas = dynamic(() => import('./three/EarthCanvas'), { ssr: false });
const StarsCanvas = dynamic(() => import('./three/Stars'), { ssr: false });

/** Static HUD stand-in shown instead of the 3D scene under prefers-reduced-motion. */
function StaticScene({ label }: { label: string }) {
  return (
    <div className="flex h-full min-h-[16rem] items-center justify-center" data-testid="contact-3d-static">
      <div className="flex flex-col items-center gap-3 text-hud-cyan/70">
        <Reticle size={72} />
        <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}

/** Contact section — validated form plus a lighter, lazy, reduced-motion-aware 3D scene. */
export function Contact() {
  const t = useTranslations('sections');
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="contact" kicker={t('contact.kicker')} title={t('contact.title')}>
      <div className="relative overflow-hidden rounded-sm">
        {!reduced && <StarsCanvas />}
        <div className="relative z-10 flex flex-col gap-6 xl:flex-row">
          <HudFrame variant="panel" glow="cyan" className="w-full p-6 xl:w-1/2">
            <p className="mb-6 font-sans text-sm text-text/70">
              <GlowText color="cyan">▸</GlowText> {t('contact.intro')}
            </p>
            <ContactForm />
          </HudFrame>

          <div className="min-h-[20rem] flex-1" data-testid="contact-3d">
            {reduced ? (
              <StaticScene label={t('contact.sceneLabel')} />
            ) : (
              <EarthCanvas autoRotate={!reduced} />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
