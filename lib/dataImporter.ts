import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import type { ImportedData, SkillCategory, Project, SocialLink, ImportFormat } from '@/types';

export async function importFromFile(file: File): Promise<ImportedData> {
  const extension = file.name.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'json':
      return importFromJSON(file);
    case 'csv':
      return importFromCSV(file);
    case 'xlsx':
    case 'xls':
      return importFromExcel(file);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
}

async function importFromJSON(file: File): Promise<ImportedData> {
  const text = await file.text();
  const data = JSON.parse(text);
  return validateAndTransformData(data);
}

async function importFromCSV(file: File): Promise<ImportedData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const data = transformCSVData(results.data as Record<string, string>[]);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}

async function importFromExcel(file: File): Promise<ImportedData> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  
  const result: ImportedData = {};
  
  // Check for different sheets
  if (workbook.SheetNames.includes('Skills')) {
    const skillsSheet = workbook.Sheets['Skills'];
    const skillsData = XLSX.utils.sheet_to_json(skillsSheet);
    result.skills = transformSkillsData(skillsData as Record<string, unknown>[]);
  }
  
  if (workbook.SheetNames.includes('Projects')) {
    const projectsSheet = workbook.Sheets['Projects'];
    const projectsData = XLSX.utils.sheet_to_json(projectsSheet);
    result.projects = transformProjectsData(projectsData as Record<string, unknown>[]);
  }
  
  if (workbook.SheetNames.includes('Links')) {
    const linksSheet = workbook.Sheets['Links'];
    const linksData = XLSX.utils.sheet_to_json(linksSheet);
    result.links = transformLinksData(linksData as Record<string, unknown>[]);
  }
  
  return result;
}

function validateAndTransformData(data: unknown): ImportedData {
  const result: ImportedData = {};
  
  if (typeof data !== 'object' || data === null) {
    throw new Error('Invalid data format');
  }
  
  const obj = data as Record<string, unknown>;
  
  if (Array.isArray(obj.skills)) {
    result.skills = obj.skills as SkillCategory[];
  }
  
  if (Array.isArray(obj.projects)) {
    result.projects = obj.projects as Project[];
  }
  
  if (Array.isArray(obj.links)) {
    result.links = obj.links as SocialLink[];
  }
  
  return result;
}

function transformCSVData(data: Record<string, string>[]): ImportedData {
  // Detect the type of data based on columns
  if (data.length === 0) return {};
  
  const firstRow = data[0];
  const columns = Object.keys(firstRow);
  
  // Check if it's skills data
  if (columns.includes('skill_name') || columns.includes('category')) {
    return { skills: transformSkillsFromCSV(data) };
  }
  
  // Check if it's projects data
  if (columns.includes('title') && columns.includes('description')) {
    return { projects: transformProjectsFromCSV(data) };
  }
  
  // Check if it's links data
  if (columns.includes('name') && columns.includes('url')) {
    return { links: transformLinksFromCSV(data) };
  }
  
  return {};
}

function transformSkillsFromCSV(data: Record<string, string>[]): SkillCategory[] {
  const categories: Map<string, SkillCategory> = new Map();
  
  for (const row of data) {
    const categoryName = row.category || 'General';
    
    if (!categories.has(categoryName)) {
      categories.set(categoryName, {
        title: categoryName,
        icon: row.category_icon || '',
        skills: [],
      });
    }
    
    categories.get(categoryName)?.skills.push({
      name: row.skill_name || row.name || '',
      icon: row.icon || '',
      iconType: (row.icon_type as 'svg' | 'png') || 'svg',
      description: row.description,
    });
  }
  
  return Array.from(categories.values());
}

function transformProjectsFromCSV(data: Record<string, string>[]): Project[] {
  return data.map((row, index) => ({
    id: row.id || `project-${index}`,
    title: row.title || '',
    subtitle: row.subtitle || '',
    description: row.description || '',
    details: row.details ? row.details.split('|') : [],
    link: row.link,
    tags: row.tags ? row.tags.split(',').map((t) => t.trim()) : [],
    image: row.image,
  }));
}

function transformLinksFromCSV(data: Record<string, string>[]): SocialLink[] {
  return data.map((row) => ({
    name: row.name || '',
    url: row.url || '',
    icon: row.icon || '',
    description: row.description,
  }));
}

function transformSkillsData(data: Record<string, unknown>[]): SkillCategory[] {
  return transformSkillsFromCSV(data as Record<string, string>[]);
}

function transformProjectsData(data: Record<string, unknown>[]): Project[] {
  return transformProjectsFromCSV(data as Record<string, string>[]);
}

function transformLinksData(data: Record<string, unknown>[]): SocialLink[] {
  return transformLinksFromCSV(data as Record<string, string>[]);
}

// Export template generators for users to know the expected format
export function generateSkillsTemplate(): string {
  return `category,category_icon,skill_name,icon,icon_type,description
Programming Languages,/assets/icons/programming.svg,JavaScript,https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg,svg,JavaScript programming
Programming Languages,/assets/icons/programming.svg,Python,https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg,svg,Python programming`;
}

export function generateProjectsTemplate(): string {
  return `id,title,subtitle,description,details,link,tags,image
project-1,My Project,Subtitle Here,Description of the project,Detail 1|Detail 2|Detail 3,https://example.com,"tag1,tag2,tag3",/assets/images/project.jpg`;
}

export function generateLinksTemplate(): string {
  return `name,url,icon,description
GitHub,https://github.com/username,github,My GitHub profile
LinkedIn,https://linkedin.com/in/username,linkedin,My LinkedIn profile`;
}
