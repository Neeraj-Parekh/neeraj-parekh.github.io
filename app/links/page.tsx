'use client';

import Navigation from '@/components/Navigation';
import Watermark from '@/components/Watermark';
import ThemeToggle from '@/components/ThemeToggle';
import LinkCard from '@/components/LinkCard';
import linksData from '@/data/links.json';
import type { SocialLink } from '@/types';

export default function LinksPage() {
  const links = linksData as SocialLink[];

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
        {/* Links Section */}
        <section id="links-section" className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-8">Connect With Me</h2>
          
          <div className="links-grid">
            {links.map((link) => (
              <LinkCard key={link.name} link={link} />
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <section className="mt-12">
          <h3 className="text-xl font-bold mb-4">Get In Touch</h3>
          <p className="text-base opacity-80 max-w-md">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
          <div className="mt-6">
            <a
              href="mailto:neerajparekh118@gmail.com"
              className="inline-block px-6 py-3 border-2 font-medium transition-all duration-300"
              style={{
                borderColor: 'var(--text-color)',
                backgroundColor: 'var(--light-accent-color)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-color)';
                e.currentTarget.style.color = 'var(--background-color)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--light-accent-color)';
                e.currentTarget.style.color = 'inherit';
              }}
            >
              Email Me
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
