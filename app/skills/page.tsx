'use client';

import Navigation from '@/components/Navigation';
import Watermark from '@/components/Watermark';
import ThemeToggle from '@/components/ThemeToggle';
import SkillCard from '@/components/SkillCard';
import CertificationGrid from '@/components/CertificationGrid';
import skillsData from '@/data/skills.json';
import type { SkillCategory } from '@/types';

export default function SkillsPage() {
  const skills = skillsData as SkillCategory[];

  return (
    <div className="min-h-screen">
      <Watermark />

      {/* Header */}
      <div id="header-name-ldm" className="flex w-full items-center justify-between">
        <h1 id="name" className="animate-name text-4xl md:text-6xl">
          Neeraj Parekh
        </h1>
        <ThemeToggle />
      </div>

      {/* Slogan */}
      <p id="slogan" className="animate-slogan">
        ENTC engineer
      </p>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="mt-8">
        {/* Skills Section */}
        <section id="skills-section" className="animate-fade-in" style={{ padding: '20px' }}>
          <div className="skills-flex-container">
            {/* Skills Grid Section (Left side) */}
            <div className="skills-section-container">
              <article className="skills-article">
                {skills.map((category) => (
                  <SkillCard key={category.title} category={category} />
                ))}
              </article>
            </div>

            {/* Certifications Section (Right side) - Image Cards */}
            <CertificationGrid />
          </div>
        </section>
      </main>
    </div>
  );
}
