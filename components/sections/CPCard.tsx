import { GlowText, HudFrame, StatReadout } from '@/components/hud';
import { CodeforcesIcon, LeetcodeIcon } from '@/components/Icons';
import type { CPStat } from '@/types';

export type CPCardProps = {
  data: CPStat;
  labels: {
    rating: string;
    rank: string;
    level: string;
    contests: string;
    topPercent: string;
    viewProfile: string;
    live: string;
    fallback: string;
  };
};

/** A single CP platform HUD card driven by StatReadouts. */
export function CPCard({ data, labels }: CPCardProps) {
  const Icon = data.platform === 'leetcode' ? LeetcodeIcon : CodeforcesIcon;
  const title = data.platform === 'leetcode' ? 'LeetCode' : 'Codeforces';

  return (
    <HudFrame variant="panel" glow="cyan" className="hud-scanline flex-1">
      <div
        className="flex h-full flex-col gap-5 p-6"
        data-testid={`cp-card-${data.platform}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-hud-cyan">
            <Icon className="h-7 w-7" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-text">
              {title}
            </h3>
            <p className="font-mono text-xs text-text/50">@{data.handle}</p>
          </div>
        </div>
        <span
          className="rounded-sm border border-hud-cyan/30 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-hud-cyan/70"
          data-testid={`cp-source-${data.platform}`}>
          {data.source === 'live' ? labels.live : labels.fallback}
        </span>
      </div>

      {data.level && (
        <p className="font-mono text-sm">
          <span className="text-text/50">{labels.level}: </span>
          <GlowText color="gold">{data.level}</GlowText>
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {typeof data.rating === 'number' && (
          <StatReadout label={labels.rating} value={data.rating} />
        )}
        {typeof data.rank === 'number' && (
          <StatReadout label={labels.rank} value={data.rank} unit="#" />
        )}
        {typeof data.attended === 'number' && (
          <StatReadout label={labels.contests} value={data.attended} />
        )}
        {typeof data.topPercent === 'number' && (
          <StatReadout label={labels.topPercent} value={data.topPercent} unit="%" />
        )}
      </div>

      <a
        href={data.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`cp-profile-${data.platform}`}
        className="mt-auto font-mono text-xs uppercase tracking-wider text-hud-cyan transition-colors hover:text-hud-gold">
        {labels.viewProfile} ↗
      </a>
      </div>
    </HudFrame>
  );
}
