# Isak Kadi's Portfolio - Design System Documentation

## Overview

This document describes the shared design system, components, and patterns for Isak Kadi's developer portfolio. The design system provides a cohesive foundation for all page implementations while ensuring consistency, accessibility, and responsive behavior across the application.

## Design Philosophy

The design follows a premium, minimalist, technology-focused approach with:
- Clean, professional aesthetics
- High contrast for readability
- Subtle animations and transitions
- Mobile-first responsive design
- Accessible interactions

## Color Palette

All colors are defined in Tailwind configuration and use semantic naming:

### Backgrounds
- `bg-primary`: `#0B1120` - Main background
- `bg-secondary`: `#111827` - Secondary background for contrast
- `bg-card`: `#172033` - Card and elevated surfaces

### Blues (Primary Accent)
- `blue-primary`: `#2563EB` - Primary action color
- `blue-bright`: `#3B82F6` - Hover/highlight state
- `blue-light`: `#60A5FA` - Secondary text/links

### Text
- `text-primary`: `#F8FAF` - Primary text
- `text-secondary`: `#CBD5E1` - Secondary text
- `text-muted`: `#94A3B8` - Muted/tertiary text

### Borders
- `border-default`: `#263449` - Default border color

## Typography

- **Font Family**: Inter, Manrope, or comparable modern sans-serif
- **Responsive**: Text scales from mobile to desktop
- **System**: Uses `font-sans` with fallback to system fonts

## Spacing System

Consistent spacing tokens used across components:
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)
- `2xl`: 3rem (48px)
- `3xl`: 4rem (64px)

## Responsive Breakpoints

- **Mobile**: Default (320px+)
- **Tablet**: `md` (768px+)
- **Desktop**: `lg` (1024px+)

Applications follow mobile-first approach with enhancements for larger screens.

## Shared Components

All components export from `src/components/index.ts`. Import individually or collectively:

```typescript
import { Button, Card, Container } from '@components/index'
// Or use path aliases
import { Button } from '@components/Button'
```

### Layout Components

#### Container
Responsive max-width wrapper with padding.

```typescript
<Container size="lg">
  <h1>Content</h1>
</Container>
```

Props:
- `size`: `'sm' | 'md' | 'lg'` (default: `'lg'`)

#### Section
Section wrapper with semantic HTML and configurable spacing.

```typescript
<Section spacing="lg">
  <h2>My Projects</h2>
</Section>
```

Props:
- `spacing`: `'sm' | 'md' | 'lg'` (default: `'lg'`)

### Navigation Components

#### Header
Sticky responsive header with mobile menu.

Features:
- Logo/site name link to home
- Desktop navigation menu
- Mobile hamburger menu with accessible controls
- Keyboard focus indicators
- Reduced motion support

Props: None (uses `portfolioConfig` from navigation)

#### Footer
Footer with site info, navigation links, and social/contact links.

Features:
- Brand and tagline
- Navigation links
- Social media links (when configured)
- Contact email (when configured)
- Dynamic copyright year

Props: None (uses `portfolioConfig` from navigation)

### Interactive Components

#### Button
Customizable button with multiple variants and sizes.

```typescript
<Button variant="primary" size="md">Click me</Button>
```

Props:
- `variant`: `'primary' | 'secondary' | 'ghost'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `isLoading`: `boolean` - Shows spinner
- Standard HTML button attributes

#### Link
Internal/external link component with routing support.

```typescript
<Link to="/projects" variant="primary">
  Explore Projects
</Link>
```

Props:
- `to`: Router link destination (optional for `<a>` tags)
- `variant`: `'primary' | 'secondary' | 'subtle'` (default: `'primary'`)
- Standard HTML anchor attributes

### Content Components

#### SectionHeading
Semantic heading with optional subtitle.

```typescript
<SectionHeading level="h2" subtitle="2024 Projects">
  My Work
</SectionHeading>
```

Props:
- `level`: `'h1' | 'h2' | 'h3'` (default: `'h2'`)
- `subtitle`: Optional subtitle text

#### Card
Elevated card container with hover effects.

```typescript
<Card variant="elevated">
  <h3>Project Title</h3>
  <p>Description</p>
</Card>
```

Props:
- `variant`: `'default' | 'elevated'` (default: `'default'`)

#### Badge
Labeled badge for tags, labels, or status.

```typescript
<Badge variant="primary" size="sm">
  Featured
</Badge>
```

Props:
- `variant`: `'default' | 'primary' | 'success' | 'warning' | 'error'` (default: `'default'`)
- `size`: `'sm' | 'md'` (default: `'sm'`)

### State Components

#### LoadingState
Loading skeleton with spinner and message.

```typescript
<LoadingState message="Loading projects..." />
```

Props:
- `message`: Optional loading message (default: `'Loading...'`)

#### EmptyState
Empty state UI with icon, title, description, and optional action.

```typescript
<EmptyState
  title="No projects yet"
  description="Check back soon"
  action={<Button>Go Back</Button>}
/>
```

Props:
- `title`: Required title
- `description`: Optional description
- `action`: Optional JSX action element

#### ErrorState
Error state UI with retry button.

```typescript
<ErrorState
  title="Failed to load"
  onRetry={() => refetch()}
/>
```

Props:
- `title`: Optional title
- `description`: Optional description
- `onRetry`: Optional retry callback

#### NotFound
404 page component with back button.

```typescript
<Route path="*" element={<NotFound />} />
```

Props: None

## Layouts

### AppLayout
Main application layout wrapper that provides Header, Footer, and Outlet.

```typescript
<Route element={<AppLayout />}>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />
  {/* ... */}
</Route>
```

## Configuration

### Portfolio Config

Edit `src/config/navigation.ts` to customize portfolio metadata:

```typescript
export const portfolioConfig: PortfolioConfig = {
  name: 'Your Name',
  tagline: 'Your professional tagline',
  cvUrl: 'https://example.com/cv.pdf', // Optional
  socialLinks: [
    { platform: 'github', url: 'https://github.com/username' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/username' },
  ],
  contactEmail: 'your.email@example.com', // Optional
}
```

### Navigation Links

Update `mainNavigation` array to modify header/footer navigation:

```typescript
export const mainNavigation: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  // ...
]
```

## Utility Functions

### cn() - Class Name Utility

Conditionally join classNames:

```typescript
import { cn } from '@utils/cn'

const className = cn(
  'base-style',
  isActive && 'active-style',
  null, // falsy values are ignored
  'another-style'
)
```

## Shared Types

Located in `src/types/index.ts`:

```typescript
interface NavLink { label: string; href: string }
interface SocialLink { platform: 'github' | 'linkedin'; url: string }
interface PortfolioConfig {
  name: string
  tagline: string
  cvUrl?: string
  socialLinks?: SocialLink[]
  contactEmail?: string
}
interface Project {
  id: string
  title: string
  description: string
  technologies?: string[]
  projectUrl?: string
  githubUrl?: string
  imagePlaceholder?: string
  featured?: boolean
  published?: boolean
}
interface Skill {
  id: string
  name: string
  category: string
  description?: string
  learningStatus?: 'learning' | 'intermediate' | 'proficient'
}
interface EducationEntry {
  id: string
  program: string
  institution: string
  startDate?: string
  endDate?: string
  description?: string
  achievements?: string[]
}
```

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear 2px ring focus states on all elements
- **ARIA Labels**: Proper ARIA labels on complex components
- **Semantic HTML**: Using `<header>`, `<footer>`, `<section>`, `<nav>`
- **Reduced Motion**: Respects `prefers-reduced-motion` media query
- **Color Contrast**: WCAG AA compliant color combinations
- **Touch Targets**: Minimum 44px height for mobile interactions

## Responsive Design Strategy

1. **Mobile-First**: Start with mobile layout, enhance for larger screens
2. **Breakpoints**: Use Tailwind `md` breakpoint (768px) for tablet/desktop
3. **Scaling**: Text and spacing scale proportionally
4. **Images**: Use flexible images that scale with containers
5. **Touch**: Ensure buttons and links are touch-friendly on mobile

## Animation & Transitions

- Duration tokens: `fast` (150ms), `base` (200ms), `slow` (300ms)
- Timing: `smooth` cubic-bezier easing
- Animations: Subtle, non-distracting
- Reduced motion: Respects user preferences

## CSS Architecture

Global styles in `src/index.css`:
- Tailwind directives (base, components, utilities)
- CSS custom layer components (`.focus-ring`, `.text-gradient`)
- Reduced motion preferences
- System color scheme

## Data Service

Mock data service for portfolio content (can be replaced with Supabase):

```typescript
import { dataService } from '@services/data-service'

const projects = await dataService.getProjects()
const skills = await dataService.getSkillsByCategory('frontend')
const education = await dataService.getEducation()
```

## Import Path Aliases

Configured for clean imports:
- `@components/*` - Component files
- `@layouts/*` - Layout components
- `@pages/*` - Page components
- `@services/*` - Data services
- `@types` - TypeScript types
- `@utils/*` - Utility functions
- `@config/*` - Configuration

## Component Ownership

- **Header/Footer**: Shared system (do not override)
- **Layout Components**: Shared system (Container, Section)
- **Interactive Components**: Shared system (Button, Link, Card, Badge)
- **State Components**: Shared system (LoadingState, EmptyState, ErrorState, NotFound)
- **Page Components**: Implement in `src/pages/` (Home, About, Projects, Skills, Contact)

## Development Workflow

1. Use path aliases for imports
2. Extend component variants by editing component files
3. Add shared types to `src/types/index.ts`
4. Update config in `src/config/navigation.ts`
5. Pages are in `src/pages/` (not owned by design system)
6. Follow mobile-first responsive patterns
7. Use semantic HTML and ARIA labels
8. Test keyboard navigation and screen readers

## Build & Deployment

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ JavaScript
- CSS Grid and Flexbox
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- No personal portrait is included; use a placeholder if needed
- Contact details and social links are optional and configured via `portfolioConfig`
- Admin features are explicitly excluded from this design system
- This design system provides the foundation; pages can extend with custom styles
- Use Tailwind utilities for one-off custom styles when needed
