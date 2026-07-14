import { Divider } from '@/components/hud';
import { MissionCard } from './MissionCard';
import type { ExpertiseDomain, Project } from '@/types';

export type ProjectGroupProps = {
  domain: ExpertiseDomain;
  /** Localized domain label. */
  label: string;
  projects: Project[];
  viewLabel: string;
};

/** One expertise-domain group of the mission log: a divider header + its mission cards. */
export function ProjectGroup({ domain, label, projects, viewLabel }: ProjectGroupProps) {
  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-5" data-testid={`project-group-${domain}`}>
      <Divider label={label} />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <MissionCard key={project.id} project={project} viewLabel={viewLabel} />
        ))}
      </div>
    </div>
  );
}
