import type { Project, Skill, EducationEntry, Service } from '@types'

export const portfolioData = {
  projects: [
    {
      id: 'project-1',
      slug: 'exampro',
      title: 'ExamPro',
      shortDescription: 'Online Examination & Learning Platform',
      category: 'Web App',
      status: 'active' as const,
      publicationStatus: 'published' as const,
      technologies: ['React.js', 'TypeScript', 'Firebase', 'Cloud Firestore', 'Tailwind CSS', 'PWA'],
      projectUrl: 'http://exampro-nine.vercel.app/',
      githubUrl: 'https://github.com/Isak-k/exam_pro.git',
      thumbnailUrl: 'https://res.cloudinary.com/dk2aonbwf/image/upload/v1793392357/photo_2026-10-30_23-31-56_ylyoqw.jpg',
      featured: true,
      displayOrder: 1,
      overview: 'ExamPro is a modern online examination and learning platform designed to help university students prepare for exams, practice questions, access study materials, and track their academic progress. It provides features such as online examinations, offline practice tests, subject-based learning resources, performance analytics, leaderboards, and an AI-powered study assistant. The platform includes department-based access, multilingual support, and a responsive interface.',
      problemStatement: 'University students struggle to find a centralized platform that combines online examinations, offline practice tests, comprehensive study resources, performance tracking, and AI-powered assistance.',
      targetUsers: 'University students, educators, academic administrators, and institutions managing educational content.',
      solution: 'A progressive web application offering comprehensive exam management, AI-powered study assistance, department-based organization, multilingual support, and offline functionality.',
      features: [
        'Online examinations and offline practice tests',
        'Subject-based study materials and resources',
        'AI-powered study assistant and MCQ generation',
        'Student dashboards and performance tracking',
        'Department-based examination management',
        'Results, rankings, and leaderboards',
        'Progressive Web App (PWA) with offline support',
        'English and Somali language support',
        'Real-time progress analytics',
        'Responsive interface for all devices'
      ],
      developmentProcess: 'Built with React.js and TypeScript. Integrated Firebase and Cloud Firestore for real-time data management. Implemented PWA capabilities for offline functionality. Tailwind CSS ensures responsive design.',
      challenges: 'Building AI-powered MCQ generation, implementing robust offline synchronization, managing large exam datasets, and supporting multilingual content.',
      lessonsLearned: 'AI integration significantly enhances educational platforms. PWA technology is crucial for accessibility. Multilingual support requires careful UX consideration.',
    },
    {
      id: 'project-2',
      slug: 'family-growth-tracker',
      title: 'Family Growth Tracker',
      shortDescription: 'A family growth tracking application to monitor and track family members\' development and milestones.',
      category: 'Web App',
      status: 'active' as const,
      publicationStatus: 'published' as const,
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
      projectUrl: 'https://family-growth-tracker1.vercel.app/',
      githubUrl: 'https://github.com/Isak-k/family-growth-tracker.git',
      thumbnailUrl: 'https://res.cloudinary.com/dk2aonbwf/image/upload/v1793441212/Screenshot_2026-10-31_130230_xnxefd.png',
      featured: true,
      displayOrder: 2,
      overview: 'Family Growth Tracker is a web application designed to help families track and monitor the growth and development of family members. It provides an intuitive interface to record milestones, track progress, and maintain a digital record of family growth journey.',
      problemStatement: 'Families want an easy way to track and document the growth and development of their members over time.',
      targetUsers: 'Families, parents, and guardians who want to track family member development.',
      solution: 'A user-friendly web application for tracking family member growth with milestone recording and progress visualization.',
      features: [
        'Track family member growth and development',
        'Record and organize milestones',
        'Progress visualization',
        'Family member profiles',
        'Growth history and documentation',
        'Responsive design for all devices'
      ],
      developmentProcess: 'Built with React and TypeScript. Integrated Firebase for data storage and authentication. Tailwind CSS ensures responsive and modern UI.',
      challenges: 'Creating an intuitive interface for tracking multiple family members and their milestones.',
      lessonsLearned: 'Understanding user needs in family applications and creating simple yet powerful tracking features.',
    },
    {
      id: 'project-3',
      slug: 'sanbitu-fc',
      title: 'Sanbitu FC',
      shortDescription: 'Football Club Management Platform - Team information, player profiles, fixtures, and admin dashboard.',
      category: 'Web App',
      status: 'active' as const,
      publicationStatus: 'published' as const,
      technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
      projectUrl: 'https://sanbitu-football-club-47sj.vercel.app/',
      githubUrl: 'https://github.com/Isak-k/sanbitu-football-club.git',
      thumbnailUrl: 'https://res.cloudinary.com/dk2aonbwf/image/upload/v1793452515/san_dywuxt.jpg',
      featured: true,
      displayOrder: 3,
      overview: 'Sanbitu FC is a modern web platform designed to connect football fans with their favorite team. It provides a central place to explore team information, discover player profiles, follow match schedules and results, and stay updated with the latest club news. The platform includes an administrative dashboard for managing team information, player profiles, fixtures, and match results.',
      problemStatement: 'Football clubs need a modern, centralized platform to manage team information, engage fans, and provide easy access to player profiles, match schedules, and club news.',
      targetUsers: 'Football fans, club administrators, players, and sports enthusiasts interested in following the club.',
      solution: 'A comprehensive football club management platform combining fan engagement with administrative content management capabilities.',
      features: [
        'Team information and club overview',
        'Player profiles and details',
        'Upcoming match schedules and fixtures',
        'Match results and updates',
        'Latest football news and announcements',
        'Admin dashboard for content management',
        'Centralized management of club information',
        'Responsive and user-friendly interface',
        'Real-time updates and notifications'
      ],
      developmentProcess: 'Built with React and TypeScript. Integrated Firebase for real-time data management and authentication. Tailwind CSS provides a modern, responsive design.',
      challenges: 'Creating an intuitive admin dashboard while maintaining a user-friendly fan interface, managing real-time match updates.',
      lessonsLearned: 'Understanding sports management needs, creating dual interfaces for different user roles, implementing real-time data synchronization.',
    },
    {
      id: 'project-4',
      slug: 'agroguard',
      title: 'AgroGuard',
      shortDescription: 'An AI-assisted agricultural support initiative focused on crop-related information and practical agricultural support.',
      category: 'Web App',
      status: 'active' as const,
      publicationStatus: 'published' as const,
      technologies: ['React', 'AI/ML', 'Multilingual Support', 'Offline-First', 'Progressive Web App'],
      thumbnailUrl: 'https://res.cloudinary.com/dk2aonbwf/image/upload/v1793615599/agro_epyykr.png',
      featured: true,
      displayOrder: 4,
      overview: 'AgroGuard is an AI-assisted agricultural support platform providing crop-related information tailored to local agricultural practices. The platform supports English, Afaan Oromoo, and Amharic languages.',
      problemStatement: 'Smallholder farmers lack access to timely, relevant crop information and support in their native languages. Agricultural challenges are often unique to local contexts.',
      targetUsers: 'Smallholder farmers, agricultural extension workers, and rural farming communities in East Africa.',
      solution: 'An offline-friendly platform with multilingual support providing AI-assisted crop information and practical guidance.',
      features: [
        'AI-assisted crop information retrieval',
        'Local language support: English, Afaan Oromoo, Amharic',
        'Offline-friendly design for areas with limited connectivity',
        'Agricultural guidance tailored to local practices',
        'Community-focused use cases',
        'Progressive Web App capabilities'
      ],
      developmentProcess: 'Built with React for responsive UI. Implemented AI integration for crop information assistance. Added multilingual support.',
      challenges: 'Ensuring AI accuracy for local crop varieties, maintaining offline functionality, supporting multiple languages.',
      lessonsLearned: 'Understanding local agricultural practices is critical. Multilingual support requires more than just translation.',
    },
    {
      id: 'project-5',
      slug: 'boriif-tech',
      title: 'Boriif Tech',
      shortDescription: 'A Flutter-based technology content and application discovery platform.',
      category: 'Mobile App',
      status: 'active' as const,
      publicationStatus: 'published' as const,
      technologies: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Cloudinary'],
      projectUrl: 'https://play.google.com/store/apps/details?id=com.boriiftech',
      githubUrl: 'https://github.com/Isak-k/boriif_tech.git',
      thumbnailUrl: 'https://res.cloudinary.com/dk2aonbwf/image/upload/v1793609854/Boriif_Tech_Flutter_App_Showcase_exb0gz.png',
      featured: true,
      displayOrder: 5,
      overview: 'Boriif Tech is a Flutter-based mobile platform designed to simplify technology discovery and learning. It aggregates technology posts and app listings with an intuitive user interface.',
      problemStatement: 'Many developers and tech enthusiasts struggle to discover quality technology content and find relevant applications in one centralized location.',
      targetUsers: 'Developers, tech enthusiasts, and anyone interested in discovering technology content and applications.',
      solution: 'A mobile-first platform that combines technology posts, application discovery, and user engagement features with robust backend infrastructure.',
      features: [
        'Browse and discover technology posts',
        'Explore curated application listings',
        'Categorized content organization',
        'Detailed post pages with categories',
        'Favorite content functionality',
        'Firebase Authentication for user accounts',
        'Secure data storage with Firestore',
        'Image uploads and optimization via Cloudinary',
        'Direct Play Store links for applications'
      ],
      developmentProcess: 'Built using Flutter for cross-platform mobile development with Dart. Integrated Firebase for authentication and real-time data management.',
      challenges: 'Managing real-time data synchronization, optimizing image delivery at scale, maintaining performance with large datasets.',
      lessonsLearned: 'Importance of efficient state management in Flutter, caching strategies for image optimization, designing scalable backend architecture.',
    },
  ] as Project[],
  skills: [
    { id: 'skill-1', name: 'JavaScript', category: 'Languages', learningStatus: 'proficient', displayOrder: 1, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
    { id: 'skill-2', name: 'TypeScript', category: 'Languages', learningStatus: 'proficient', displayOrder: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { id: 'skill-3', name: 'HTML5', category: 'Languages', learningStatus: 'proficient', displayOrder: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
    { id: 'skill-4', name: 'CSS3', category: 'Languages', learningStatus: 'proficient', displayOrder: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
    { id: 'skill-5', name: 'Dart', category: 'Languages', learningStatus: 'proficient', displayOrder: 5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg' },
    { id: 'skill-6', name: 'Python', category: 'Languages', learningStatus: 'intermediate', displayOrder: 6, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { id: 'skill-7', name: 'React', category: 'Frameworks & Libraries', learningStatus: 'proficient', displayOrder: 1, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { id: 'skill-8', name: 'Next.js', category: 'Frameworks & Libraries', learningStatus: 'proficient', displayOrder: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
    { id: 'skill-9', name: 'Vite', category: 'Frameworks & Libraries', learningStatus: 'proficient', displayOrder: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
    { id: 'skill-10', name: 'Tailwind CSS', category: 'Frameworks & Libraries', learningStatus: 'proficient', displayOrder: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    { id: 'skill-11', name: 'Node.js', category: 'Frameworks & Libraries', learningStatus: 'proficient', displayOrder: 5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
    { id: 'skill-12', name: 'Flutter', category: 'Frameworks & Libraries', learningStatus: 'proficient', displayOrder: 6, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
    { id: 'skill-13', name: 'Django', category: 'Frameworks & Libraries', learningStatus: 'intermediate', displayOrder: 7, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
    { id: 'skill-14', name: 'Flask', category: 'Frameworks & Libraries', learningStatus: 'intermediate', displayOrder: 8, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
    { id: 'skill-15', name: 'Firebase', category: 'Backend & Data', learningStatus: 'proficient', displayOrder: 1, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
    { id: 'skill-16', name: 'Supabase', category: 'Backend & Data', learningStatus: 'proficient', displayOrder: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
    { id: 'skill-17', name: 'PostgreSQL', category: 'Backend & Data', learningStatus: 'proficient', displayOrder: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
    { id: 'skill-18', name: 'MySQL', category: 'Backend & Data', learningStatus: 'proficient', displayOrder: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
    { id: 'skill-19', name: 'MongoDB', category: 'Backend & Data', learningStatus: 'proficient', displayOrder: 5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
    { id: 'skill-20', name: 'SQLite', category: 'Backend & Data', learningStatus: 'proficient', displayOrder: 6, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
    { id: 'skill-21', name: 'REST APIs', category: 'Backend & Data', learningStatus: 'proficient', displayOrder: 7, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg' },
    { id: 'skill-22', name: 'Git', category: 'Development', learningStatus: 'proficient', displayOrder: 1, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
    { id: 'skill-23', name: 'GitHub', category: 'Development', learningStatus: 'proficient', displayOrder: 2, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    { id: 'skill-24', name: 'VS Code', category: 'Development', learningStatus: 'proficient', displayOrder: 3, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    { id: 'skill-25', name: 'Android Studio', category: 'Development', learningStatus: 'proficient', displayOrder: 4, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg' },
    { id: 'skill-26', name: 'Vercel', category: 'Development', learningStatus: 'proficient', displayOrder: 5, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
    { id: 'skill-27', name: 'Cursor', category: 'AI', learningStatus: 'proficient', displayOrder: 1, icon: 'https://www.cursor.sh/favicon.ico' },
    { id: 'skill-28', name: 'Claude', category: 'AI', learningStatus: 'proficient', displayOrder: 2, icon: 'https://cdn.worldvectorlogo.com/logos/claude-2.svg' },
    { id: 'skill-29', name: 'ChatGPT', category: 'AI', learningStatus: 'proficient', displayOrder: 3, icon: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg' },
    { id: 'skill-30', name: 'Gemini', category: 'AI', learningStatus: 'proficient', displayOrder: 4, icon: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735592ce618761eeca3b558f29a8844da7955022140eb2bead02e36fb8d4da.svg' },
    { id: 'skill-31', name: 'Copilot', category: 'AI', learningStatus: 'proficient', displayOrder: 5, icon: 'https://cdn.worldvectorlogo.com/logos/github-copilot.svg' },
  ] as Skill[],
  services: [
    { id: 'service-1', name: 'Web Development', description: 'Building modern, responsive web applications with React, TypeScript, and Tailwind CSS', displayOrder: 1 },
    { id: 'service-2', name: 'Mobile Application', description: 'Developing cross-platform mobile applications using Flutter and native technologies', displayOrder: 2 },
    { id: 'service-3', name: 'UI/UX Design', description: 'Creating intuitive and visually appealing user interfaces with modern design principles', displayOrder: 3 },
  ] as Service[],
  education: [] as EducationEntry[],
}

export interface DataService {
  getProjects(): Promise<Project[]>
  getProjectBySlug(slug: string): Promise<Project | null>
  getFeaturedProjects(): Promise<Project[]>
  getProjectsByCategory(category: string): Promise<Project[]>
  getSkills(): Promise<Skill[]>
  getSkillsByCategory(category: string): Promise<Skill[]>
  getServices(): Promise<Service[]>
  getEducation(): Promise<EducationEntry[]>
}

export const createDataService = (): DataService => {
  return {
    async getProjects() {
      return portfolioData.projects.filter(p => p.publicationStatus === 'published')
    },
    async getProjectBySlug(slug: string) {
      const project = portfolioData.projects.find(p => (p.slug === slug || (slug === 'agroguard-ai' && p.slug === 'agroguard')) && p.publicationStatus === 'published')
      return project || null
    },
    async getFeaturedProjects() {
      return portfolioData.projects.filter(p => p.featured && p.publicationStatus === 'published').sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    },
    async getProjectsByCategory(category: string) {
      return portfolioData.projects.filter(p => p.category === category && p.publicationStatus === 'published')
    },
    async getSkills() {
      return portfolioData.skills
    },
    async getSkillsByCategory(category: string) {
      return portfolioData.skills.filter(s => s.category === category)
    },
    async getServices() {
      return portfolioData.services.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    },
    async getEducation() {
      return portfolioData.education
    },
  }
}

export const dataService = createDataService()
