/**
 * Shared TypeScript types and interfaces for the portfolio application
 */

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'whatsapp' | 'instagram'
  url: string
}

export interface PortfolioConfig {
  name: string
  tagline: string
  cvUrl?: string
  socialLinks?: SocialLink[]
  contactEmail?: string
}

export interface PageMeta {
  title: string
  description: string
}

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription?: string
  category: string
  status: 'active' | 'maintained' | 'archived' | 'planned'
  publicationStatus: 'draft' | 'published' | 'archived'
  technologies?: string[]
  
  // Image URLs from Cloudinary
  thumbnailUrl?: string
  thumbnailPublicId?: string
  galleryImages?: CloudinaryImage[]
  
  // Links
  projectUrl?: string
  githubUrl?: string
  liveDemoUrl?: string
  
  // Case study / detailed content
  overview?: string
  problemStatement?: string
  targetUsers?: string
  solution?: string
  features?: string[]
  developmentProcess?: string
  technicalDecisions?: string
  challenges?: string
  lessonsLearned?: string
  
  // Metadata
  featured?: boolean
  displayOrder?: number
  createdAt?: Date
  updatedAt?: Date
  
  // Deprecated - use publicationStatus instead
  published?: boolean
}

export interface CloudinaryImage {
  publicId: string
  secureUrl: string
  format?: string
  width?: number
  height?: number
}

export interface Experience {
  id: string
  title: string
  organization: string
  type: 'employment' | 'activity' | 'project'
  startDate: string // ISO format
  endDate?: string // ISO format, null if ongoing
  description?: string
  highlights?: string[]
  visible: boolean
  displayOrder?: number
}

export interface SiteContent {
  id: string
  key: string // e.g., 'about_intro', 'home_hero_subtitle'
  content: string // Plain text or markdown
  visible: boolean
  updatedAt?: Date
}

export interface Skill {
  id: string
  name: string
  category: string
  description?: string
  learningStatus?: 'learning' | 'intermediate' | 'proficient'
  displayOrder?: number
  icon?: string
}

export interface Service {
  id: string
  name: string
  description?: string
  icon?: string
  displayOrder?: number
}

export interface EducationEntry {
  id: string
  institution: string
  program: string
  startDate?: string
  endDate?: string
  description?: string
  achievements?: string[]
  visible: boolean
  displayOrder?: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  ipAddress?: string
  userAgent?: string
}
