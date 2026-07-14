import { DiamondNodeIcon } from '@/components/Icons';

export type DividerProps = {
  label?: string;
  className?: string;
};

/** HUD divider with diamond node markers and an optional centered label. */
export function Divider({ label, className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-label={label}
      className={`flex items-center gap-3 text-hud-cyan/60 ${className ?? ''}`}>
      <DiamondNodeIcon aria-hidden="true" className="shrink-0 text-hud-cyan/70" />
      <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-hud-cyan/50 to-transparent" />
      {label && (
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-hud-cyan/80">
          {label}
        </span>
      )}
      <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-l from-hud-cyan/50 to-transparent" />
      <DiamondNodeIcon aria-hidden="true" className="shrink-0 text-hud-cyan/70" />
    </div>
  );
}
