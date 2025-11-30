'use client';

import { Github, Linkedin, Mail, FileText, ExternalLink } from 'lucide-react';
import type { SocialLink } from '@/types';

interface LinkCardProps {
  link: SocialLink;
}

// Custom StackOverflow icon since Lucide doesn't have one
const StackOverflowIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.36 20.2V14.82h1.79V22H3v-7.18h1.8V20.2h12.56zM6.77 14.32l.37-1.76 8.79 1.85-.37 1.76-8.79-1.85zm1.16-4.21l.76-1.61 8.14 3.78-.76 1.62-8.14-3.79zm2.26-3.99l1.15-1.38 6.9 5.76-1.15 1.37-6.9-5.75zm4.45-4.25L20 9.08l-1.44 1.07-5.36-7.21 1.44-1.07zM6.59 18.41v-1.8h8.98v1.8H6.59z"/>
  </svg>
);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  'file-text': FileText,
  'stack-overflow': StackOverflowIcon,
  default: ExternalLink,
};

export default function LinkCard({ link }: LinkCardProps) {
  const IconComponent = iconMap[link.icon] || iconMap.default;

  return (
    <a
      href={link.url}
      target={link.url.startsWith('mailto:') ? undefined : '_blank'}
      rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      className="links-grid-item flex items-center gap-2 p-4 border-2 border-light-accent shadow-button transition-all duration-400 hover:shadow-button-hover hover:border-text-color hover:bg-light-accent"
    >
      <IconComponent className="w-5 h-5 text-text-color opacity-100" />
      <span className="font-bold text-lg opacity-50 hover:opacity-100 transition-opacity">
        {link.name}
      </span>
    </a>
  );
}
