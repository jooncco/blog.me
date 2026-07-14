// Skills — "reactor clusters" content (Unit U4).
//
// Ported from the legacy components/Skills/constants.js. Category labels are localized via
// the `sections` namespace using each category `id`; tool names are proper nouns kept here.
// `icon` retains the legacy public asset path (used as a small glyph inside a cluster).

import type { SkillCategory } from '@/types';

export const SKILLS: SkillCategory[] = [
  {
    id: 'backend',
    category: 'Back End',
    tools: [
      { name: 'Java', icon: '/assets/images/skills/java.png', level: 5 },
      { name: 'Spring', icon: '/assets/images/skills/spring.png', level: 5 },
      { name: 'Spring Boot', icon: '/assets/images/skills/springboot.png', level: 5 },
      { name: 'QueryDSL JPA', icon: '/assets/images/skills/querydsl.png', level: 4 },
      { name: 'MyBatis', icon: '/assets/images/skills/mybatis.png', level: 4 },
      { name: 'Flyway', icon: '/assets/images/skills/flyway.png', level: 3 },
      { name: 'MySQL', icon: '/assets/images/skills/mysql.png', level: 4 },
      { name: 'PostgreSQL', icon: '/assets/images/skills/postgresql.png', level: 4 },
      { name: 'AWS Lambda', icon: '/assets/images/skills/awslambda.png', level: 4 },
      { name: 'Amazon API Gateway', icon: '/assets/images/skills/amazonapigateway.png', level: 4 },
      { name: 'Amazon RDS', icon: '/assets/images/skills/amazonrds.png', level: 4 },
    ],
  },
  {
    id: 'frontend',
    category: 'Front End',
    tools: [
      { name: 'React.js', icon: '/assets/images/skills/reactjs.png', level: 5 },
      { name: 'Next.js', icon: '/assets/images/skills/nextjs.png', level: 4 },
      { name: 'Tailwind CSS', icon: '/assets/images/skills/tailwindcss.png', level: 4 },
      { name: 'JavaScript (ESNext)', icon: '/assets/images/skills/javascript.png', level: 5 },
      { name: 'TypeScript', icon: '/assets/images/skills/typescript.png', level: 4 },
    ],
  },
  {
    id: 'mobile',
    category: 'Mobile',
    tools: [{ name: 'Flutter', icon: '/assets/images/skills/flutter.png', level: 3 }],
  },
  {
    id: 'devops',
    category: 'DevOps',
    tools: [
      { name: 'Git', icon: '/assets/images/skills/git.png', level: 5 },
      { name: 'Docker', icon: '/assets/images/skills/docker.png', level: 4 },
      { name: 'AWS VPC', icon: '/assets/images/skills/awsvpc.png', level: 3 },
      { name: 'Amazon EC2', icon: '/assets/images/skills/amazonec2.png', level: 4 },
      { name: 'Amazon EKS', icon: '/assets/images/skills/amazoneks.png', level: 3 },
      { name: 'Amazon S3', icon: '/assets/images/skills/amazons3.png', level: 4 },
      { name: 'AWS CodePipeline', icon: '/assets/images/skills/awscodepipeline.png', level: 3 },
      { name: 'Amazon RDS', icon: '/assets/images/skills/amazonrds.png', level: 4 },
    ],
  },
  {
    id: 'ai',
    category: 'AI / ML',
    tools: [
      { name: 'C++', icon: '/assets/images/skills/cpp.png', level: 4 },
      { name: 'Python', icon: '/assets/images/skills/python.png', level: 4 },
      { name: 'Amazon SageMaker', icon: '/assets/images/skills/amazonsagemaker.png', level: 3 },
      { name: 'Amazon Bedrock', icon: '/assets/images/skills/amazonbedrock.png', level: 4 },
    ],
  },
];
