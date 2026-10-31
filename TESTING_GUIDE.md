# Testing Guide - Project Listing & Case Studies

## Quick Testing Steps

### Dev Server
1. Run `npm run dev` (already running on localhost:5173)
2. Navigate to http://localhost:5173/projects
3. Test features below

## Testing the Projects Directory

### Basic Functionality
- [ ] Page loads successfully
- [ ] All 4 project cards visible
- [ ] Cards display: title, description, category, status, technologies
- [ ] Scrolling works smoothly
- [ ] Responsive on mobile/tablet/desktop

### Search Functionality
- [ ] Type "Flutter" → filters to Boriif Tech
- [ ] Type "React" → shows Examino Pro and AgroGuard
- [ ] Type "AI" → shows AgroGuard
- [ ] Search is case-insensitive ("react" works like "React")
- [ ] Partial search works ("Fire" shows Firebase projects)
- [ ] Empty search shows all projects
- [ ] Search clears properly

### Category Filtering
- [ ] Category dropdown appears
- [ ] "All Categories" is default
- [ ] Click "Mobile App" → shows only Boriif Tech
- [ ] Click "Web App" → shows Examino Pro + AgroGuard
- [ ] Click "Business Initiative" → shows RedFox Tech
- [ ] Switching categories updates instantly
- [ ] Switching back to "All Categories" shows all projects

### Combined Filters
- [ ] Search while category filtered works
- [ ] Category dropdown while search active works
- [ ] Results count updates correctly with both filters
- [ ] Clear search while filtered shows correct count

### Results Counter
- [ ] Shows "Showing 4 of 4 projects" initially
- [ ] Updates when filtering
- [ ] Shows correct math (e.g., "Showing 2 of 4")

### Project Cards
- [ ] Each card has hover effect (border changes to blue)
- [ ] Clicking card navigates to project detail
- [ ] Status badge shows correct color:
  - Boriif: green (active)
  - Examino: green (active)
  - AgroGuard: green (active)
  - RedFox: yellow (planned)
- [ ] Technologies show first 3, then "+X" for additional

### Empty States
- [ ] Search for "xyz" → shows "No projects found"
- [ ] Search clears and shows projects again
- [ ] Message suggests adjusting filters

### Loading State
- [ ] Page loads smoothly
- [ ] No loading spinner visible (data loads immediately)

## Testing Project Detail Pages

### Route Access
- [ ] http://localhost:5173/projects/boriif-tech loads
- [ ] http://localhost:5173/projects/examino-pro loads
- [ ] http://localhost:5173/projects/agroguard-ai loads
- [ ] http://localhost:5173/projects/redfox-tech loads
- [ ] http://localhost:5173/projects/unknown-project shows error

### Hero Section
Each project should show:
- [ ] Category badge (colored, e.g., "Mobile App")
- [ ] Status badge with correct color
- [ ] Project title
- [ ] Project description

### Main Content
All sections present and correctly formatted:
- [ ] Overview section visible
- [ ] Problem Statement section visible
- [ ] Target Users section visible
- [ ] Solution section visible
- [ ] Features list with bullet points
- [ ] Development Process section visible
- [ ] Technical Decisions section visible
- [ ] Challenges section visible
- [ ] Lessons Learned section visible

### Sidebar (Desktop Only)
- [ ] Technologies section shows all technologies
- [ ] Each technology has a blue tag
- [ ] Links section shows project links:
  - Boriif: "Visit Project" (Play Store)
  - Examino: "Visit Project" + "View on GitHub"
  - AgroGuard: "Visit Project" + "View on GitHub"
  - RedFox: "No live demo available"
- [ ] Contact CTA button visible
- [ ] Contact button navigates to /contact

### Related Projects
- [ ] Boriif shows Examino + AgroGuard as related
- [ ] Examino shows Boriif + AgroGuard as related
- [ ] AgroGuard shows Boriif + Examino as related
- [ ] RedFox shows no related projects
- [ ] Related project cards link to their detail pages

### Navigation
- [ ] Previous project button visible (except on first)
- [ ] Next project button visible (except on last)
- [ ] Boriif: Only "Next" button (Examino)
- [ ] Examino: "Previous" (Boriif) + "Next" (AgroGuard)
- [ ] AgroGuard: "Previous" (Examino) + "Next" (RedFox)
- [ ] RedFox: Only "Previous" button (AgroGuard)
- [ ] Previous/Next buttons navigate to correct projects

### Back Link
- [ ] "Back to Projects" link visible at bottom
- [ ] Clicking navigates to /projects
- [ ] Page maintains filters from before (if any)

### External Links
- [ ] Boriif "Visit Project" links to Play Store
- [ ] External links open in new tab (target="_blank")
- [ ] GitHub links open in new tab
- [ ] Links are clickable and correct

## Testing Responsive Design

### Mobile (375px width)
- [ ] Page scrolls vertically
- [ ] Content readable without horizontal scroll
- [ ] Search/filter inputs stack vertically
- [ ] Project cards single column
- [ ] Sidebar not visible (moves to bottom)
- [ ] Touch targets large enough (44px minimum)
- [ ] Text size readable without zoom

### Tablet (768px width)
- [ ] Project cards show 2 columns
- [ ] Search/filter inputs side-by-side
- [ ] Content still readable
- [ ] Sidebar still hidden

### Desktop (1024px+)
- [ ] Project cards show 3 columns
- [ ] Sidebar visible alongside main content
- [ ] All elements properly aligned
- [ ] Spacing looks balanced

## Testing Accessibility

### Keyboard Navigation
- [ ] Tab through search input
- [ ] Tab through category select
- [ ] Tab through project cards
- [ ] Tab shows focus outline on all elements
- [ ] Enter/Space activates buttons
- [ ] Arrow keys work in dropdown

### Screen Reader
- [ ] Page title announced
- [ ] Headings announced with levels
- [ ] Alt text for images announced
- [ ] Buttons announce their purpose
- [ ] Links describe their destination
- [ ] Form labels associated with inputs

### Color Contrast
- [ ] Text readable on all backgrounds
- [ ] Status badges have sufficient contrast
- [ ] Hover states maintain contrast
- [ ] Focus indicators clearly visible

## Testing Browser Functions

### Browser Back/Forward
- [ ] From project detail, back button returns to /projects
- [ ] History works correctly
- [ ] Maintains filter state when possible

### Browser Refresh
- [ ] Refresh on /projects maintains state
- [ ] Refresh on /projects/:slug loads project correctly
- [ ] URL parameters preserved
- [ ] Page content loads normally

### Direct URL Access
- [ ] Copy project URL to new tab → works
- [ ] Type URL directly → works
- [ ] Bookmark project → works
- [ ] Share link with others → they can access

## Testing Error Cases

### Invalid Project Slug
- [ ] http://localhost:5173/projects/fake-project shows error
- [ ] Error message is helpful
- [ ] "Back to Projects" button available
- [ ] No console errors

### Empty Search Results
- [ ] Search for nonexistent term shows empty state
- [ ] Helpful message provided
- [ ] Can clear search
- [ ] Projects reappear

### Filtering Edge Cases
- [ ] Category with no projects shows empty
- [ ] Search + category combination works
- [ ] Multiple filters don't break page

## Testing Search Features

### Search Target Fields
- [ ] Project titles searchable
  - "Boriif" finds Boriif Tech
  - "Examino" finds Examino Pro
  - "AgroGuard" finds AgroGuard AI
  - "RedFox" finds RedFox Tech
- [ ] Descriptions searchable
  - "examination" finds Examino Pro
  - "agricultural" finds AgroGuard
- [ ] Technologies searchable
  - "Flutter" finds Boriif Tech
  - "React" finds Examino + AgroGuard
  - "Firebase" finds Boriif + Examino
  - "Tailwind" finds Examino + AgroGuard

### Search Behavior
- [ ] Real-time search (updates as you type)
- [ ] Case-insensitive
- [ ] Partial matching works
- [ ] Multiple word search works
- [ ] Search with spaces works
- [ ] Clearing search resets results

## Testing Data Integrity

### Project Information Accuracy
- [ ] Boriif Tech: Shows Flutter, Firestore, Cloudinary, Firebase
- [ ] Examino Pro: Shows React, TypeScript, Firebase, PWA, Tailwind
- [ ] AgroGuard: Shows React, AI/ML, Multilingual Support
- [ ] RedFox Tech: Shows status as "planned"
- [ ] All descriptions match requirements
- [ ] All features listed correctly
- [ ] No placeholder text in content

### Status Indicators
- [ ] Boriif, Examino, AgroGuard: "active" status
- [ ] RedFox: "planned" status
- [ ] Status badges display correct colors

### Featured Projects
- [ ] Boriif featured on /projects and /
- [ ] Examino featured on /projects and /
- [ ] AgroGuard featured on /projects and /
- [ ] RedFox not featured (status: planned)

## Performance Testing

### Page Load
- [ ] /projects loads in <2 seconds
- [ ] /projects/:slug loads in <2 seconds
- [ ] No lag on search/filter
- [ ] Smooth scrolling

### Search Performance
- [ ] Search instant (no delay)
- [ ] Filtering instant
- [ ] Responsive while typing

### Build Size
- [ ] Build completes successfully
- [ ] No unused code in bundle
- [ ] Build size reasonable (<300KB gzipped)

## Build & Production Testing

### Build Process
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] No warnings in build output

### Lint Check
- [ ] `npm run lint` passes
- [ ] No code style issues
- [ ] All type checks pass

### Type Safety
- [ ] No `any` types used inappropriately
- [ ] TypeScript strict mode passes
- [ ] All imports properly typed

## Cross-Browser Testing

### Chrome
- [ ] All features work
- [ ] Styling correct
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] Styling correct
- [ ] No console errors

### Safari
- [ ] All features work
- [ ] Styling correct
- [ ] No console errors

### Edge
- [ ] All features work
- [ ] Styling correct
- [ ] No console errors

## Automated Testing Checklist

Run this code in browser console on /projects:

```javascript
// Test that all 4 projects are in DOM
const cards = document.querySelectorAll('a[href^="/projects/"]').length
console.log(`Found ${cards} project links (should be 4+)`)

// Test search input exists
const searchInput = document.querySelector('input[type="text"]')
console.log(`Search input: ${searchInput ? 'PASS' : 'FAIL'}`)

// Test category select exists
const categorySelect = document.querySelector('select')
console.log(`Category select: ${categorySelect ? 'PASS' : 'FAIL'}`)

// Test result counter exists
const counter = Array.from(document.querySelectorAll('p')).find(p => p.textContent.includes('Showing'))
console.log(`Results counter: ${counter ? 'PASS' : 'FAIL'}`)
```

## Signup Testing Checklist

- [x] Page loads without errors
- [x] All projects display correctly
- [x] Search works as expected
- [x] Filters work as expected
- [x] Navigation works
- [x] Responsive on all devices
- [x] Accessible with keyboard
- [x] TypeScript strict mode passes
- [x] ESLint passes
- [x] Build succeeds
- [x] No console errors
- [x] Project details accurate

## Notes

- All 4 projects should be visible and functional
- Search should be instant and responsive
- Filtering should work smoothly
- Navigation between projects should be smooth
- Mobile experience should be intuitive
- No 404 errors on valid routes
- Invalid routes should show proper error
- All external links should work
