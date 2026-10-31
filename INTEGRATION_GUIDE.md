# Integration Guide - Isak Kadi Portfolio

## Quick Start

The portfolio is now fully functional with placeholder data. To customize it with real content:

### 1. Update Portfolio Configuration

Edit `src/config/navigation.ts`:

```typescript
export const portfolioConfig: PortfolioConfig = {
  name: 'Isak Kadi',
  tagline: 'Information Technology Student at Haramaya University',
  cvUrl: 'https://your-domain.com/path-to-cv.pdf',  // Optional: Add your CV URL
  socialLinks: [
    // Uncomment and add your real links
    { platform: 'github', url: 'https://github.com/yourusername' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/yourusername' },
  ],
  contactEmail: 'isak@example.com',  // Optional: Add your email
}
```

### 2. Add Your Projects

Edit `src/services/data-service.ts` and populate `portfolioData.projects`:

```typescript
export const portfolioData = {
  projects: [
    {
      id: 'project-1',
      title: 'Project Name',
      description: 'Brief project description',
      featured: true,  // Set to true to appear on home page
      published: true,  // Set to true to display publicly
      technologies: ['React', 'TypeScript', 'Node.js'],
      projectUrl: 'https://project-demo.com',  // Live demo URL
      githubUrl: 'https://github.com/user/project',  // GitHub repo
      imagePlaceholder: 'Project Screenshot',  // Placeholder text (for now)
    },
    // Add more projects...
  ],
  // ... rest of data
}
```

### 3. Add Your Skills

Edit `src/services/data-service.ts` and populate `portfolioData.skills`:

```typescript
export const portfolioData = {
  skills: [
    {
      id: 'skill-1',
      name: 'React',
      category: 'Frontend',
      description: 'Building modern web applications with React',
      learningStatus: 'proficient',  // 'learning' | 'intermediate' | 'proficient'
    },
    {
      id: 'skill-2',
      name: 'TypeScript',
      category: 'Frontend',
      description: 'Type-safe JavaScript development',
      learningStatus: 'proficient',
    },
    // Add more skills...
  ],
  // ... rest of data
}
```

### 4. Add Education Information

Edit `src/services/data-service.ts` and populate `portfolioData.education`:

```typescript
export const portfolioData = {
  education: [
    {
      id: 'edu-1',
      institution: 'Haramaya University',
      program: 'Information Technology',
      startDate: '2021',
      endDate: '2025',
      description: 'Pursuing a degree in Information Technology with focus on software development',
      achievements: [
        'Academic achievement 1',
        'Academic achievement 2',
      ],
    },
  ],
  // ... rest of data
}
```

## Page Descriptions

### Home (`/`)
- Hero section with your introduction
- Featured projects (up to 3)
- Skills preview (up to 6)
- Collaboration opportunities
- Call-to-action buttons

### About (`/about`)
- Personal introduction
- Educational background (from education data)
- Software engineering interests
- Database management interests
- Learning journey
- Professional goals
- Development philosophy

### Skills (`/skills`)
- All skills organized by category
- Optional descriptions and learning status
- Clean card layout

### Projects (`/projects`)
- All published projects
- Project details and links
- Technology tags

### Contact (`/contact`)
- Contact information (if configured)
- Social media links (if configured)
- CV download (if configured)

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Supabase Integration (Future)

When ready to connect to Supabase:

1. Install Supabase client:
   ```bash
   npm install @supabase/supabase-js
   ```

2. Create a Supabase project and get credentials

3. Update `src/services/data-service.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

   export const createDataService = (): DataService => {
     return {
       async getProjects() {
         const { data } = await supabase
           .from('projects')
           .select('*')
           .eq('published', true)
         return data || []
       },
       // Implement other methods...
     }
   }
   ```

4. Add environment variables to `.env`:
   ```
   VITE_SUPABASE_URL=your_url
   VITE_SUPABASE_KEY=your_key
   ```

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables if using Supabase
4. Deploy with `npm run build`

### Other Hosting
1. Run `npm run build`
2. Upload `dist/` folder to your hosting service
3. Configure server to serve `index.html` for all routes

## Customization Tips

- **Colors**: Edit color values in `tailwind.config.ts`
- **Fonts**: Change font family in `tailwind.config.ts`
- **Components**: Modify components in `src/components/`
- **Pages**: Update page content in `src/pages/`
- **Navigation**: Add/remove routes in `src/config/navigation.ts` and `src/App.tsx`

## Troubleshooting

- **Port already in use**: `npm run dev -- --port 3001`
- **Build errors**: Run `npm install` to ensure dependencies are correct
- **Type errors**: Check TypeScript configuration in `tsconfig.json`

## Support

All pages are built with:
- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Vite

For questions about specific technologies, refer to their documentation.
