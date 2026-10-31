# Complete Guide to Edit Your Portfolio in VS Code

## How to Use This Guide
Each section shows you exactly which file to edit and what to change. Copy the code snippets and modify the values.

---

## 1️⃣ UPDATE YOUR PERSONAL INFORMATION

### File: `src/config/navigation.ts`

Find this section:
```typescript
export const portfolioConfig: PortfolioConfig = {
  name: 'Isak Kadi',                    // ← Your name
  tagline: 'Full Stack Developer',      // ← Your tagline
  cvUrl: '/ISAK_KADI_CV.pdf',          // ← Keep as is (or update filename)
  contactEmail: 'hisakkedi@gmail.com',  // ← Your email
}
```

**To change:**
```typescript
// Replace with your info
name: 'Your Full Name',
tagline: 'Your profession / tagline',
contactEmail: 'your.email@example.com',
```

---

## 2️⃣ UPDATE PROJECT INFORMATION

### File: `src/services/data-service.ts`

Find the `getProjects()` function (around line 10):

```typescript
function getProjects(): Project[] {
  const projects: Project[] = [
    {
      id: '1',
      slug: 'exampro',
      title: 'ExamPro',
      shortDescription: 'Online examination platform',
      // ... more properties
    },
    // ... more projects
  ]
  return projects
}
```

### To Edit a Project:

**Find the project** you want to edit (look for its title)

**Update these fields:**
```typescript
{
  id: '1',                                    // Keep unique
  slug: 'project-url-slug',                   // URL-friendly name, no spaces
  title: 'Project Title',                     // What you see on page
  shortDescription: 'One line summary',       // Preview text
  category: 'Web Development',                // Shows on card
  status: 'active',                           // active | maintained | archived | planned
  publicationStatus: 'published',             // published | draft | archived
  
  // Images
  thumbnailUrl: 'https://image-url.png',     // Main project image
  
  // Links
  projectUrl: 'https://live-demo.com',       // Live demo link
  githubUrl: 'https://github.com/user/repo', // GitHub repo
  
  // Detailed content
  overview: 'What the project does...',
  problemStatement: 'Problem it solves...',
  targetUsers: 'Who uses it...',
  solution: 'How it solves it...',
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3',
  ],
  technologies: ['React', 'TypeScript', 'Firebase'],
  developmentProcess: 'How I built it...',
  technicalDecisions: 'Why I chose X over Y...',
  challenges: 'Challenges I faced and solved...',
  lessonsLearned: 'What I learned...',
  
  // Metadata
  featured: true,           // Show on home page
  displayOrder: 1,          // Order on projects page
}
```

### Example: Edit ExamPro

**Before:**
```typescript
{
  id: '1',
  slug: 'exampro',
  title: 'ExamPro',
  shortDescription: 'Online examination platform',
  // ...
}
```

**After (your changes):**
```typescript
{
  id: '1',
  slug: 'exampro',
  title: 'ExamPro - Online Exam Platform',  // ← Updated title
  shortDescription: 'A comprehensive platform for conducting online exams',  // ← Updated description
  overview: 'ExamPro enables institutions to create, administer, and grade exams online.',  // ← Added overview
  // ... keep other fields the same, or update as needed
}
```

---

## 3️⃣ ADD OR REMOVE SKILLS

### File: `src/services/data-service.ts`

Find the `getSkills()` function (around line 150):

```typescript
function getSkills(): Skill[] {
  const skills: Skill[] = [
    {
      id: '1',
      name: 'React',
      category: 'Frameworks & Libraries',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      displayOrder: 1,
    },
    // ... more skills
  ]
  return skills
}
```

### To Add a Skill:

**Copy this template:**
```typescript
{
  id: '32',                   // Increment from last ID
  name: 'Skill Name',         // The skill name
  category: 'Languages',      // One of: Languages | Frameworks & Libraries | Backend & Data | Development | AI
  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/[icon-name]/[icon-name]-original.svg',
  displayOrder: 32,           // Increment order
}
```

### To Find Icon URL:

1. Go to https://devicons.dev/
2. Search for the technology
3. Copy the CDN URL
4. Format: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/[name]/[name]-original.svg`

**Common Icons:**
```
React: react/react-original.svg
Vue: vuejs/vuejs-original.svg
Angular: angularjs/angularjs-original.svg
Node.js: nodejs/nodejs-original.svg
Express: express/express-original.svg
MongoDB: mongodb/mongodb-original.svg
PostgreSQL: postgresql/postgresql-original.svg
Firebase: firebase/firebase-original.svg
TypeScript: typescript/typescript-original.svg
Python: python/python-original.svg
Docker: docker/docker-original.svg
Git: git/git-original.svg
```

### To Remove a Skill:

1. Find the skill in the array
2. Delete the entire object (from `{` to `},`)
3. Update `displayOrder` numbers for remaining skills

---

## 4️⃣ ADD OR UPDATE SERVICES

### File: `src/services/data-service.ts`

Find the `getServices()` function (around line 280):

```typescript
function getServices(): Service[] {
  const services: Service[] = [
    {
      id: '1',
      name: 'Web Development',
      description: 'Custom web applications built with modern technologies.',
      displayOrder: 1,
    },
    // ... more services
  ]
  return services
}
```

### To Add a Service:

```typescript
{
  id: '4',                 // Increment ID
  name: 'Service Name',    // What you offer
  description: 'Detailed description of service.',
  displayOrder: 4,         // Increment order
}
```

### To Edit a Service:

Find the service, update the fields, save.

---

## 5️⃣ UPDATE HOME PAGE CONTENT

### File: `src/pages/Home.tsx`

The home page automatically displays:
- Hero section (from config)
- Services (from data-service)
- Skills (from data-service)
- Featured projects

**To customize the hero section:**

Find this section in Home.tsx:
```typescript
<div className="space-y-6">
  <h1 className="text-6xl font-bold">
    {portfolioConfig.name}
  </h1>
  <p className="text-xl text-text-secondary">
    {portfolioConfig.tagline}
  </p>
  {/* Buttons here */}
</div>
```

To change text, edit `src/config/navigation.ts` (already shown above).

---

## 6️⃣ UPDATE ABOUT PAGE

### File: `src/pages/About.tsx`

Find the main content section and update:

```typescript
<p className="text-text-secondary leading-relaxed">
  // ← Edit this text
</p>
```

### Skills Section:

Edit the "About My Skills" list in the same file:

```typescript
<ul className="space-y-2">
  <li>Skill or achievement 1</li>
  <li>Skill or achievement 2</li>
  // ← Add/edit items here
</ul>
```

---

## 7️⃣ UPDATE CONTACT PAGE

### File: `src/pages/Contact.tsx`

**Contact information section:**
```typescript
<div className="space-y-3">
  {/* Email */}
  <p>
    <strong>Email:</strong> your.email@example.com
  </p>
  {/* Update email here */}
  
  {/* Phone (if needed) */}
  <p>
    <strong>Phone:</strong> +1 (123) 456-7890
  </p>
</div>
```

**Social links** are auto-generated from `src/config/navigation.ts`

---

## 8️⃣ CUSTOMIZE COLORS & DESIGN

### File: `tailwind.config.ts`

Find the color palette section:
```typescript
colors: {
  'primary': '#0066ff',      // Main blue
  'secondary': '#00d9ff',    // Accent cyan
  'dark': '#0a0e27',         // Dark background
  // ... more colors
}
```

**To change a color:**
```typescript
'primary': '#your-hex-color',    // Replace with new hex
```

### File: `src/index.css`

Find animation definitions:
```css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**To modify animations:**
- Change `translateY(20px)` to different values
- Adjust `opacity` values
- Update timing in component className

---

## 9️⃣ UPDATE FOOTER

### File: `src/components/Footer.tsx`

**Copyright year:**
```typescript
<p>&copy; 2024 Your Name. All rights reserved.</p>
// ← Update year and name
```

**Social links** are auto-generated from config.

**Sections:**
```typescript
<div className="grid md:grid-cols-4 gap-8">
  {/* Update section titles and links */}
</div>
```

---

## 🔟 UPDATE NAVIGATION/HEADER

### File: `src/layouts/AppLayout.tsx` or `src/components/Header.tsx`

**Navigation links:**
```typescript
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  // ← Add/remove links here
]
```

---

## 📝 IMPORTANT: Data Structure Rules

### Project Object
```typescript
interface Project {
  id: string,                        // Unique ID
  slug: string,                      // URL slug (lowercase, no spaces, dashes ok)
  title: string,                     // Display title
  shortDescription: string,          // One-liner preview
  fullDescription?: string,          // Longer description (optional)
  category: string,                  // Category name
  status: 'active' | 'maintained' | 'archived' | 'planned',
  publicationStatus: 'draft' | 'published' | 'archived',
  technologies?: string[],           // Array of tech names
  thumbnailUrl?: string,             // Image URL
  projectUrl?: string,               // Live demo link
  githubUrl?: string,                // GitHub repo
  overview?: string,                 // Detailed overview
  problemStatement?: string,         // Problem it solves
  targetUsers?: string,              // Who uses it
  solution?: string,                 // Your solution
  features?: string[],               // Array of features
  developmentProcess?: string,       // How you built it
  technicalDecisions?: string,       // Why you chose X
  challenges?: string,               // Challenges faced
  lessonsLearned?: string,           // What you learned
  featured?: boolean,                // Show on home page
  displayOrder?: number,             // Sort order
}
```

### Skill Object
```typescript
interface Skill {
  id: string,                        // Unique ID
  name: string,                      // Skill name
  category: string,                  // Category name
  icon?: string,                     // Icon URL
  displayOrder?: number,             // Sort order
}
```

### Service Object
```typescript
interface Service {
  id: string,                        // Unique ID
  name: string,                      // Service name
  description?: string,              // Service description
  displayOrder?: number,             // Sort order
}
```

---

## 🚀 After Making Changes

1. Save all files (Ctrl+S)
2. Test locally: `npm run dev`
3. Visit http://localhost:5173
4. Test your changes
5. If good, build: `npm run build`
6. If build succeeds, push to GitHub:
   ```bash
   git add .
   git commit -m "Update: [describe changes]"
   git push origin master
   ```
7. Vercel auto-deploys 🎉

---

## ❌ Common Mistakes to Avoid

1. **Duplicate IDs** - Each project/skill must have unique ID
2. **Invalid slugs** - Use lowercase, hyphens ok, no spaces
3. **Broken URLs** - Double-check image and link URLs
4. **Missing categories** - Projects/skills must have category
5. **Wrong publication status** - Use 'published' to show publicly
6. **Forgetting commas** - Objects in arrays need commas after `}`
7. **Invalid colors** - Use valid hex codes (#000000)

---

**That's it! You now have the complete guide to customize your portfolio.** ✨

