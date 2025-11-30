'use client';

import Navigation from '@/components/Navigation';
import Watermark from '@/components/Watermark';
import ThemeToggle from '@/components/ThemeToggle';
import ProjectCard from '@/components/ProjectCard';
import HexGrid from '@/components/HexGrid';
import projectsData from '@/data/projects.json';
import photosData from '@/data/photos.json';
import type { Project } from '@/types';

export default function ProjectsPage() {
  const projects = projectsData as Project[];
  const photos = photosData as string[];

  return (
    <div className="min-h-screen">
      <Watermark />

      {/* Header */}
      <div id="header-name-ldm" className="flex w-full items-center justify-between pt-4">
        <h1 id="name" className="animate-name text-4xl md:text-6xl">
          Neeraj Parekh
        </h1>
        <ThemeToggle />
      </div>

      {/* Slogan */}
      <p id="slogan" className="animate-slogan mt-2">
        ENTC engineer
      </p>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="mt-8">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-8">My Projects</h2>

        {/* Projects Grid */}
        <div id="projects-wrapper" className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Photo Gallery */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-8">PHOTOS OF MY PROJECTS</h3>
          <HexGrid photos={photos} basePath="/assets" />
        </section>
      </main>
    </div>
  );
}
