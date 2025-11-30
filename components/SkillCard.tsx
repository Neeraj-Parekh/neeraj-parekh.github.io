'use client';

import Image from 'next/image';
import type { SkillCategory } from '@/types';

interface SkillCardProps {
  category: SkillCategory;
}

export default function SkillCard({ category }: SkillCardProps) {
  const isExternalUrl = (url: string) => url.startsWith('http://') || url.startsWith('https://');

  return (
    <section className="skills-card">
      <h4 className="section-header">
        {category.title}
        {category.icon && (
          <Image
            src={category.icon}
            alt={category.title}
            width={24}
            height={24}
            className="section-logos opacity-20"
          />
        )}
      </h4>
      <ul>
        {category.skills.map((skill) => (
          <li key={skill.name} title={skill.description || skill.name}>
            {skill.iconType === 'svg' && isExternalUrl(skill.icon) ? (
              <object
                type="image/svg+xml"
                data={skill.icon}
                className="svg-logos mr-2"
                style={{ width: '32px', height: '32px' }}
              >
                {skill.name}
              </object>
            ) : isExternalUrl(skill.icon) ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={skill.icon}
                alt={skill.name}
                className="svg-logos mr-2"
                style={{ width: '32px', height: '32px' }}
              />
            ) : (
              <Image
                src={skill.icon}
                alt={skill.name}
                width={32}
                height={32}
                className="svg-logos mr-2"
                style={{ width: '32px', height: '32px' }}
              />
            )}
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
}
