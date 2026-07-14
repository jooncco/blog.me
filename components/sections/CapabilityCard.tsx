import { clsx } from 'clsx';
import { HudFrame } from '@/components/hud';
import {
  BrainIcon,
  CloudIcon,
  CodeBracketIcon,
  InfinityIcon,
  type IconProps,
} from '@/components/Icons';
import type { CapabilityIcon } from '@/data/about';

export type CapabilityCardProps = {
  title: string;
  icon: CapabilityIcon;
};

const ICONS: Record<CapabilityIcon, (props: IconProps) => JSX.Element> = {
  architect: CloudIcon,
  fullstack: CodeBracketIcon,
  ai: BrainIcon,
  algo: InfinityIcon,
};

/** A single capability tile — HUD frame with a glyph + title. */
export function CapabilityCard({ title, icon }: CapabilityCardProps) {
  const Glyph = ICONS[icon];
  return (
    <HudFrame
      variant="panel"
      className={clsx(
        'group flex min-w-[9rem] flex-1 items-center gap-3 p-4',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-cyan',
      )}>
      <span className="shrink-0 text-hud-cyan transition-transform duration-200 group-hover:scale-110">
        <Glyph className="h-7 w-7" />
      </span>
      <span
        data-testid={`capability-${icon}`}
        className="font-display text-sm font-semibold uppercase tracking-wide text-text">
        {title}
      </span>
    </HudFrame>
  );
}
