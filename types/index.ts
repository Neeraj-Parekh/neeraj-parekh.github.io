// Skill type
export interface Skill {
  name: string;
  icon: string;
  iconType: 'svg' | 'png';
  description?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

// Project type
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  link?: string;
  tags?: string[];
  image?: string;
}

// Link/Contact type
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description?: string;
}

// Photo type for hex grid
export interface Photo {
  src: string;
  alt: string;
}

// Certification type
export interface Certification {
  title: string;
  subtitle: string;
  backgroundImage: string;
  color?: string;
}

// Personal info type
export interface PersonalInfo {
  name: string;
  slogan: string;
  email: string;
  location: string;
  profession: string;
  bio: string;
  rotatingTexts: string[];
  profileImage: string;
  values?: string;
  history?: string;
  accomplishments?: string;
}

// Blog type
export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  platform: string;
  url: string;
  embedUrl?: string;
  date: string;
  readTime: string;
  tags: string[];
  image?: string;
}

// Theme type
export type Theme = 'light' | 'dark' | 'sepia';

// Data import types
export interface ImportedData {
  skills?: SkillCategory[];
  projects?: Project[];
  links?: SocialLink[];
  personalInfo?: PersonalInfo;
  blogs?: Blog[];
}

export type ImportFormat = 'json' | 'csv' | 'xlsx';
