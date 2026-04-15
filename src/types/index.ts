export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  caseStudy?: string;
  technologies: string[];
  categories: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface EducationEntry {
  degree: string;
  field: string;
  institution: string;
  location: string;
  duration: string;
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  initials: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  about: string;
  roles: string[];
  profileImage: string;
  resumeUrl: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: number;
  content: string;
}
