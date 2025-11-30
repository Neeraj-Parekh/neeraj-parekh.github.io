'use client';

import { useState } from 'react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="project-card">
      <div className="flex flex-col justify-evenly pr-8">
        <h3>
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:opacity-50 relative -top-0.5"
            >
              {project.title}
            </a>
          ) : (
            <span>{project.title}</span>
          )}
          <br />
          <em className="text-[0.7em] font-normal whitespace-nowrap">
            - {project.subtitle}
          </em>
        </h3>
        <details open={isOpen} onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}>
          <summary className="cursor-pointer text-sm font-medium py-2 hover:text-accent">
            Details
          </summary>
          <div className="mt-2">
            <p className="text-sm mb-2">{project.description}</p>
            {project.details && project.details.length > 0 && (
              <ul className="text-sm list-disc list-inside">
                {project.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            )}
            {project.link && (
              <p className="mt-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-accent hover:underline text-sm"
                >
                  {project.link}
                </a>
              </p>
            )}
          </div>
        </details>
        {project.tags && project.tags.length > 0 && (
          <div className="tags mt-2">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
