/**
 * Firestore data seeding script
 * Populates initial project and content data
 * Run with: npx ts-node scripts/seed-firestore-data.ts
 */

import * as admin from 'firebase-admin'
import * as path from 'path'
import * as fs from 'fs'

// Initialize Firebase Admin SDK with service account
// Download service account key from Firebase Console > Project Settings > Service Accounts
const serviceAccountPath = path.join(process.cwd(), 'service-account-key.json')

if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    'Error: service-account-key.json not found.'
  )
  console.error('Download from Firebase Console > Project Settings > Service Accounts')
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

/**
 * Project data for Isak Kadi
 */
const projects = [
  {
    slug: 'exampro',
    title: 'ExamPro',
    shortDescription: 'An online examination and learning platform designed to help students practice, take examinations, access study materials, and improve their academic performance.',
    fullDescription: 'ExamPro is a comprehensive learning and examination platform built with React and TypeScript. It enables students to practice questions, take structured exams, access study materials, and analyze their performance.',
    category: 'Web App',
    status: 'active',
    publicationStatus: 'published',
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'PWA'],
    projectUrl: 'http://exampro-nine.vercel.app',
    githubUrl: 'https://github.com/Isak-k/exam_pro.git',
    thumbnailUrl: 'https://res.cloudinary.com/dk2aonbwf/image/upload/v1793392357/photo_2026-10-30_23-31-56_ylyoqw.jpg',
    overview: 'ExamPro is a comprehensive learning and examination platform built with React and TypeScript. It enables students to practice questions, take structured exams, access study materials, and analyze their performance.',
    problemStatement: 'Students need an accessible, organized platform to practice exam questions, take full-length exams, access study resources, and track their progress.',
    targetUsers: 'Students preparing for exams, educators, and institutions managing educational content.',
    solution: 'A progressive web application offering offline practice capabilities, comprehensive exam management, detailed performance analytics, and organized subject and department structures.',
    features: [
      'Question practice with detailed explanations',
      'Full examination management system',
      'Access to study resources and materials',
      'Student performance analytics and reporting',
      'Progressive Web App with offline capability',
      'Real-time progress tracking',
      'Performance review and detailed analytics',
    ],
    developmentProcess: 'Built with React and TypeScript for type safety and maintainability. Integrated Firebase for backend operations and real-time updates. Tailwind CSS provides consistent, responsive UI design.',
    technicalDecisions: 'Used React hooks for state management, TypeScript for compile-time type safety, and service workers for offline PWA capabilities.',
    challenges: 'Implementing robust offline synchronization, handling large question databases efficiently, and maintaining performance with real-time analytics.',
    lessonsLearned: 'Discovered the power of PWA technologies for educational platforms, importance of intuitive exam UX design.',
    featured: true,
    displayOrder: 1,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
  },
  {
    slug: 'family-growth-tracker',
    title: 'Family Growth Tracker',
    shortDescription: 'A comprehensive family management application that tracks growth milestones, events, and memories for every family member.',
    fullDescription: 'Family Growth Tracker is a full-stack web application built with React and TypeScript that helps families document and track growth milestones, important events, and shared memories. It provides an organized way to celebrate family achievements and preserve memories.',
    category: 'Web App',
    status: 'active',
    publicationStatus: 'published',
    technologies: ['React', 'TypeScript', 'Vercel', 'Tailwind CSS'],
    projectUrl: 'https://family-growth-tracker1.vercel.app/',
    githubUrl: 'https://github.com/Isak-k/family-growth-tracker.git',
    thumbnailUrl: 'https://res.cloudinary.com/dk2aonbwf/image/upload/v1793441212/Screenshot_2026-10-31_130230_xnxefd.png',
    overview: 'Family Growth Tracker is a web application designed to help families organize and celebrate important milestones and memories. It provides an intuitive interface for documenting growth achievements and preserving family history.',
    problemStatement: 'Families need a centralized, organized way to track and celebrate growth milestones, important events, and create lasting memories of their journey together.',
    targetUsers: 'Families of all sizes looking to organize and celebrate their growth journey and preserve memories.',
    solution: 'A responsive web application that allows families to create profiles, document milestones, track events, and share memories in one organized platform.',
    features: [
      'Family member profiles and management',
      'Milestone tracking and documentation',
      'Event calendar and timeline',
      'Memory preservation and sharing',
      'Growth analytics and statistics',
      'Responsive design for all devices',
      'Easy-to-use interface',
    ],
    developmentProcess: 'Built with React and TypeScript for robust type safety and maintainability. Deployed on Vercel for seamless continuous deployment. Tailwind CSS ensures consistent, responsive design across all screen sizes.',
    technicalDecisions: 'Chose React for component reusability and state management, TypeScript for type safety, and Vercel for automatic deployments and excellent performance.',
    challenges: 'Creating an intuitive interface for family dynamics, ensuring data organization remains simple yet powerful, and maintaining performance with growing family records.',
    lessonsLearned: 'Learned the importance of user-friendly design for family applications, effective state management in React, and creating scalable data structures for growth tracking.',
    featured: true,
    displayOrder: 2,
    createdAt: admin.firestore.Timestamp.now(),
    updatedAt: admin.firestore.Timestamp.now(),
  },
]

/**
 * Skills data for Isak Kadi
 */
const skills = [
  // Frontend Development
  { category: 'Frontend Development', name: 'HTML5', description: 'Semantic markup and structure', proficiency: 'Advanced' },
  { category: 'Frontend Development', name: 'CSS3', description: 'Styling, layouts, animations', proficiency: 'Advanced' },
  { category: 'Frontend Development', name: 'JavaScript', description: 'Core language and ES6+', proficiency: 'Advanced' },
  { category: 'Frontend Development', name: 'React.js', description: 'Component development and state management', proficiency: 'Advanced' },
  { category: 'Frontend Development', name: 'TypeScript', description: 'Type-safe development', proficiency: 'Intermediate' },
  { category: 'Frontend Development', name: 'Tailwind CSS', description: 'Utility-first styling framework', proficiency: 'Advanced' },
  
  // Backend Development
  { category: 'Backend Development', name: 'Node.js', description: 'Server-side JavaScript runtime', proficiency: 'Intermediate' },
  { category: 'Backend Development', name: 'Express.js', description: 'Web application framework', proficiency: 'Intermediate' },
  { category: 'Backend Development', name: 'REST API Development', description: 'Building scalable APIs', proficiency: 'Intermediate' },
  
  // Mobile Development
  { category: 'Mobile Development', name: 'Flutter', description: 'Cross-platform mobile development', proficiency: 'Intermediate' },
  { category: 'Mobile Development', name: 'Dart', description: 'Flutter programming language', proficiency: 'Intermediate' },
  
  // Databases & Backend Services
  { category: 'Databases & Backend Services', name: 'Firebase Authentication', description: 'User authentication and management', proficiency: 'Advanced' },
  { category: 'Databases & Backend Services', name: 'Cloud Firestore', description: 'NoSQL real-time database', proficiency: 'Advanced' },
  { category: 'Databases & Backend Services', name: 'Database Management', description: 'Schema design and optimization', proficiency: 'Intermediate' },
  
  // Development Tools
  { category: 'Development Tools', name: 'Git & GitHub', description: 'Version control and collaboration', proficiency: 'Advanced' },
  { category: 'Development Tools', name: 'VS Code', description: 'Code editor and IDE', proficiency: 'Advanced' },
  { category: 'Development Tools', name: 'Android Studio', description: 'Android development environment', proficiency: 'Intermediate' },
  { category: 'Development Tools', name: 'npm', description: 'JavaScript package manager', proficiency: 'Advanced' },
  { category: 'Development Tools', name: 'Vite', description: 'Next generation build tool', proficiency: 'Advanced' },
  
  // Other Interests
  { category: 'Other Interests', name: 'Software Engineering', description: 'Design patterns and best practices', proficiency: 'Intermediate' },
  { category: 'Other Interests', name: 'Progressive Web Applications (PWA)', description: 'Offline-first web applications', proficiency: 'Intermediate' },
  { category: 'Other Interests', name: 'AI Integration', description: 'Incorporating AI into applications', proficiency: 'Beginner' },
  { category: 'Other Interests', name: 'Database Design', description: 'Schema and data modeling', proficiency: 'Intermediate' },
  { category: 'Other Interests', name: 'Application Development', description: 'Full-stack application development', proficiency: 'Advanced' },
]

/**
 * Seed the database
 */
async function seedDatabase() {
  try {
    console.log('Starting Firestore data seeding...')

    // Add projects
    console.log('Adding projects...')
    for (const project of projects) {
      const docRef = await db.collection('projects').add(project)
      console.log(`✓ Added project: ${project.title} (${docRef.id})`)
    }

    // Add skills
    console.log('Adding skills...')
    for (const skill of skills) {
      const docRef = await db.collection('skills').add(skill)
      console.log(`✓ Added skill: ${skill.name} (${skill.category})`)
    }

    console.log('\n✅ Data seeding completed successfully!')
    console.log(`Total projects added: ${projects.length}`)
    console.log(`Total skills added: ${skills.length}`)
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  } finally {
    await admin.app().delete()
  }
}

// Run seeding
seedDatabase()
