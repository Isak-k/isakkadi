# Project Pages - Quick Reference Guide

## Route Map

```
/projects                 → Project directory with filters
/projects/:slug          → Project detail page
/projects/boriif-tech    → Boriif Tech case study
/projects/examino-pro    → Examino Pro case study
/projects/agroguard-ai   → AgroGuard AI case study
/projects/redfox-tech    → RedFox Tech case study
```

## Component Files

- **Projects Listing**: `src/pages/Projects.tsx`
- **Project Detail**: `src/pages/ProjectDetail.tsx`
- **Data Service**: `src/services/data-service.ts`
- **App Routes**: `src/App.tsx`

## Adding a New Project

Edit `src/services/data-service.ts` and add to `portfolioData.projects`:

```typescript
{
  id: 'project-5',
  slug: 'my-new-project',              // URL-safe identifier
  title: 'My New Project',
  description: 'Brief description',
  category: 'Mobile App',
  status: 'active',                    // active|maintained|archived|planned
  technologies: ['React', 'Node.js'],
  projectUrl: 'https://demo.com',      // Optional
  githubUrl: 'https://github.com/...',  // Optional
  featured: false,                     // Show on home page?
  published: true,                     // Make it visible?
  
  // Case study sections (all optional)
  overview: 'Detailed overview...',
  problemStatement: 'The problem was...',
  targetUsers: 'Target audience description',
  solution: 'How we solved it...',
  features: ['Feature 1', 'Feature 2'],
  developmentProcess: 'How it was built...',
  technicalDecisions: 'Why we chose...',
  challenges: 'What was difficult...',
  lessonsLearned: 'What we learned...',
  relatedProjects: ['boriif-tech', 'examino-pro'],  // Slugs of related projects
}
```

## Editing Project Information

1. Open `src/services/data-service.ts`
2. Find the project in `portfolioData.projects` array
3. Update any field
4. Changes appear immediately in dev mode
5. No need to update components

## Changing Project Display

### Change Project Status
```typescript
status: 'archived'  // Changes badge color
```

### Hide a Project
```typescript
published: false  // Project won't appear anywhere
```

### Feature on Home Page
```typescript
featured: true  // Shows in home page Featured Projects
```

### Reorder Projects
The order in the file determines listing order on the directory page.

## Filtering System

### Search
- Searches: title, description, technologies
- Case-insensitive
- Partial string matching

### Categories
- Extracted from all projects
- Sorted alphabetically
- "All Categories" shows everything

### Combined Filters
- Search and category work together
- User sees filtered count

## Search & Filter API

In `src/pages/Projects.tsx`:

```typescript
// Current state
const [searchQuery, setSearchQuery] = useState<string>('')
const [selectedCategory, setSelectedCategory] = useState<string>('all')

// Applied automatically when either changes
useEffect(() => {
  let filtered = projects
  
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory)
  }
  
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.technologies?.some(t => t.toLowerCase().includes(query))
    )
  }
  
  setFilteredProjects(filtered)
}, [selectedCategory, searchQuery, projects])
```

## Data Service Methods

```typescript
// Get all published projects
const projects = await dataService.getProjects()

// Get specific project by slug
const project = await dataService.getProjectBySlug('boriif-tech')

// Get featured projects only
const featured = await dataService.getFeaturedProjects()

// Get projects in category
const webApps = await dataService.getProjectsByCategory('Web App')
```

## Project Detail Page Features

### Sections Shown
- Hero (always)
- Image (if imagePlaceholder provided)
- Overview (if provided)
- Problem Statement (if provided)
- Target Users (if provided)
- Solution (if provided)
- Features (if array provided)
- Development Process (if provided)
- Technical Decisions (if provided)
- Challenges (if provided)
- Lessons Learned (if provided)
- Related Projects (if related projects exist)
- Navigation (if previous/next projects exist)

### Sidebar (Desktop Only)
- Technologies
- Project links
- Contact CTA

## Status Badge Colors

- **Active** (green): `bg-green-900/20 text-green-400`
- **Maintained** (blue): `bg-blue-900/20 text-blue-400`
- **Archived** (gray): `bg-gray-700/20 text-gray-400`
- **Planned** (yellow): `bg-yellow-900/20 text-yellow-400`

## Navigation Precedence

On project detail page, navigation shows:
1. Previous project (if exists)
2. Next project (if exists)
3. Back to Projects link (always)

Projects navigate in order of appearance in data file.

## Responsive Breakpoints

### Projects Listing Grid
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### Project Detail Layout
- Mobile: Stacked (content above sidebar)
- Desktop: 3-column (content left, sidebar right)

### Filters
- Mobile: Full width inputs stacked
- Desktop: Side-by-side in 2 columns

## Error States

### Missing Project
- Shows "Project Not Found" message
- Provides "Back to Projects" button

### Search Returns Nothing
- Shows empty state with helpful message
- "Try adjusting your search or filters"

### No Projects Published
- Shows empty state
- "No projects published yet"

## Performance Tips

- Search/filter runs client-side (no API calls)
- Projects loaded once on page mount
- All 4 projects in memory
- Filtering is instant

For large datasets (50+ projects), consider:
- Server-side search
- Pagination
- Lazy loading

## Accessibility Features

- Semantic HTML (`<section>`, `<article>`, `<nav>`)
- Proper heading hierarchy (h1, h2, h3, h4)
- ARIA labels on interactive elements
- Alt text support for images
- Keyboard navigation
- Focus indicators
- Color contrast ratios

## Deployment Checklist

- [ ] All 4 projects have `published: true`
- [ ] All projects have unique slugs
- [ ] Project URLs are correct
- [ ] GitHub URLs are correct (if provided)
- [ ] Related projects slugs exist
- [ ] No unpublished data exposed
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint`
- [ ] Test routes manually

## Common Customizations

### Change Filter Style
Edit filter input styling in `src/pages/Projects.tsx` (search 'px-4 py-2')

### Change Card Layout
Modify grid class: `grid md:grid-cols-2 lg:grid-cols-3 gap-6`

### Hide Technologies on Cards
Remove the technologies section from project cards

### Change Status Badge Text
Update the capitalized text in `<span>` elements

### Customize Empty States
Edit messages in `EmptyState` component calls

## Related Documentation

- Full documentation: `PROJECT_PAGES_DOCUMENTATION.md`
- Implementation details: `PROMPT3_IMPLEMENTATION.md`
- Data service: `src/services/data-service.ts`
- Types: `src/types/index.ts`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Project doesn't appear | Check `published: true` |
| Search not finding project | Check technology names, search is case-insensitive |
| Category not in filter | Verify projects have `published: true` |
| 404 on project page | Check slug matches exactly (case-sensitive) |
| Sidebar not showing | Check screen width (desktop only) |
| Related projects not showing | Verify slugs in `relatedProjects` array exist |
| Status badge wrong color | Check `status` field spelling |

## Code Examples

### Link to Project
```jsx
<a href={`/projects/${project.slug}`}>
  View Project Details
</a>
```

### Get Project in Component
```jsx
const { slug } = useParams<{ slug: string }>()
const project = await dataService.getProjectBySlug(slug)
```

### Filter Projects
```jsx
const webApps = await dataService.getProjectsByCategory('Web App')
```

### Display Status Badge
```jsx
<span className={`px-2 py-1 rounded capitalize ${
  project.status === 'active' ? 'bg-green-900/20 text-green-400' : ...
}`}>
  {project.status}
</span>
```
