import { useTranslations } from 'next-intl';
import { Section } from './Section';
import { ProjectGroup } from './ProjectGroup';
import type { ExpertiseDomain, Project } from '@/types';

export type ProjectsProps = {
  groups: { domain: ExpertiseDomain; projects: Project[] }[];
};

/** Capability-grouped "mission log" of projects. */
export function Projects({ groups }: ProjectsProps) {
  const t = useTranslations('sections');

  return (
    <Section id="projects" kicker={t('projects.kicker')} title={t('projects.title')}>
      <div className="flex flex-col gap-10" data-testid="projects-groups">
        {groups.map(({ domain, projects }) => (
          <ProjectGroup
            key={domain}
            domain={domain}
            label={t(`projects.domains.${domain}`)}
            projects={projects}
            companyLabel={t('projects.companyLabel')}
            viewLabel={t('projects.viewProject')}
          />
        ))}
      </div>
    </Section>
  );
}
