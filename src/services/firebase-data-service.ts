/**
 * Firebase Firestore data-access layer
 * Provides typed queries for portfolio content with consistent error handling
 */

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Query,
  QueryConstraint,
  DocumentData,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import type {
  Project,
  Skill,
  EducationEntry,
  Experience,
  SiteContent,
} from '@types'

/**
 * Firestore collection names
 */
const COLLECTIONS = {
  PROJECTS: 'projects',
  SKILLS: 'skills',
  EDUCATION: 'education',
  EXPERIENCE: 'experience',
  SITE_CONTENT: 'siteContent',
  CONTACT_MESSAGES: 'contactMessages',
} as const

/**
 * Type-safe query builder
 */
async function queryCollection<T>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> {
  try {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, ...constraints) as Query<DocumentData>
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T))
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error)
    throw new Error(`Failed to fetch ${collectionName}`)
  }
}

/**
 * Project queries
 */

export async function getPublishedProjects(): Promise<Project[]> {
  return queryCollection<Project>(COLLECTIONS.PROJECTS, [
    where('publicationStatus', '==', 'published'),
    orderBy('displayOrder', 'asc'),
  ])
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const projects = await queryCollection<Project>(COLLECTIONS.PROJECTS, [
      where('slug', '==', slug),
      where('publicationStatus', '==', 'published'),
    ])
    return projects.length > 0 ? projects[0] : null
  } catch (error) {
    console.error('Error fetching project by slug:', error)
    return null
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return queryCollection<Project>(COLLECTIONS.PROJECTS, [
    where('publicationStatus', '==', 'published'),
    where('featured', '==', true),
    orderBy('displayOrder', 'asc'),
  ])
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  return queryCollection<Project>(COLLECTIONS.PROJECTS, [
    where('category', '==', category),
    where('publicationStatus', '==', 'published'),
    orderBy('displayOrder', 'asc'),
  ])
}

/**
 * Skill queries
 */

export async function getVisibleSkills(): Promise<Skill[]> {
  return queryCollection<Skill>(COLLECTIONS.SKILLS, [
    where('visible', '==', true),
    orderBy('displayOrder', 'asc'),
  ])
}

export async function getSkillsByCategory(category: string): Promise<Skill[]> {
  return queryCollection<Skill>(COLLECTIONS.SKILLS, [
    where('category', '==', category),
    where('visible', '==', true),
    orderBy('displayOrder', 'asc'),
  ])
}

/**
 * Education queries
 */

export async function getVisibleEducation(): Promise<EducationEntry[]> {
  return queryCollection<EducationEntry>(COLLECTIONS.EDUCATION, [
    where('visible', '==', true),
    orderBy('displayOrder', 'asc'),
  ])
}

/**
 * Experience queries
 */

export async function getVisibleExperience(): Promise<Experience[]> {
  return queryCollection<Experience>(COLLECTIONS.EXPERIENCE, [
    where('visible', '==', true),
    orderBy('startDate', 'desc'),
  ])
}

/**
 * Site content queries
 */

export async function getPublicSiteContent(): Promise<SiteContent[]> {
  return queryCollection<SiteContent>(COLLECTIONS.SITE_CONTENT, [
    where('visible', '==', true),
  ])
}

export async function getSiteContentByKey(key: string): Promise<SiteContent | null> {
  try {
    const contents = await queryCollection<SiteContent>(COLLECTIONS.SITE_CONTENT, [
      where('key', '==', key),
      where('visible', '==', true),
    ])
    return contents.length > 0 ? contents[0] : null
  } catch (error) {
    console.error('Error fetching site content by key:', error)
    return null
  }
}

/**
 * Data service interface matching existing implementation
 */
export interface FirebaseDataService {
  getProjects(): Promise<Project[]>
  getProjectBySlug(slug: string): Promise<Project | null>
  getFeaturedProjects(): Promise<Project[]>
  getProjectsByCategory(category: string): Promise<Project[]>
  getSkills(): Promise<Skill[]>
  getSkillsByCategory(category: string): Promise<Skill[]>
  getEducation(): Promise<EducationEntry[]>
  getExperience(): Promise<Experience[]>
  getSiteContent(): Promise<SiteContent[]>
  getSiteContentByKey(key: string): Promise<SiteContent | null>
}

/**
 * Create Firebase data service instance
 */
export function createFirebaseDataService(): FirebaseDataService {
  return {
    async getProjects() {
      return getPublishedProjects()
    },
    async getProjectBySlug(slug: string) {
      return getProjectBySlug(slug)
    },
    async getFeaturedProjects() {
      return getFeaturedProjects()
    },
    async getProjectsByCategory(category: string) {
      return getProjectsByCategory(category)
    },
    async getSkills() {
      return getVisibleSkills()
    },
    async getSkillsByCategory(category: string) {
      return getSkillsByCategory(category)
    },
    async getEducation() {
      return getVisibleEducation()
    },
    async getExperience() {
      return getVisibleExperience()
    },
    async getSiteContent() {
      return getPublicSiteContent()
    },
    async getSiteContentByKey(key: string) {
      return getSiteContentByKey(key)
    },
  }
}

export const firebaseDataService = createFirebaseDataService()
