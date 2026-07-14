'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/components/hud';

/**
 * Lightweight 2D-canvas star field (no WebGL / three.js dependency).
 * Twinkles + drifts slowly; renders a single static frame under reduced motion.
 */
export default function Stars() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    type Star = { x: number; y: number; r: number; tw: number; drift: number };
    let stars: Star[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      height = canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      const count = Math.round((rect.width * rect.height) / 6000);
      stars = Array.from({ length: Math.min(180, Math.max(40, count)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: (Math.random() * 1.3 + 0.3) * dpr,
        tw: Math.random() * Math.PI * 2,
        drift: (Math.random() * 0.12 + 0.02) * dpr,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const alpha = reduced ? 0.55 : 0.25 + 0.55 * Math.abs(Math.sin(t / 900 + s.tw));
        ctx.fillStyle = `rgba(103, 232, 249, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (!reduced) {
          s.y += s.drift;
          if (s.y > height) {
            s.y = 0;
            s.x = Math.random() * width;
          }
        }
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-testid="contact-stars"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
