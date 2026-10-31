# Isak Kadi's Developer Portfolio

A premium, minimalist developer portfolio built with React, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js 18+ or npm/yarn/pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/        # Shared, reusable components
├── layouts/          # Application layout wrappers
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── config/           # Configuration files
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Component Exports

All shared components are exported from `src/components/index.ts`:

- `Button` - Customizable button component
- `Link` - Internal/external link component
- `Card` - Card container with variants
- `Badge` - Label badges with variants
- `SectionHeading` - Semantic section headings
- `Container` - Responsive content container
- `Section` - Section wrapper with spacing
- `LoadingState` - Loading skeleton
- `EmptyState` - Empty state UI
- `ErrorState` - Error state UI
- `NotFound` - 404 page
- `Header` - Responsive navigation header
- `Footer` - Footer with social links

## Design Tokens

### Colors
- Background: `#0B1120`, `#111827`, `#172033`
- Primary Blue: `#2563EB`, `#3B82F6`, `#60A5FA`
- Text: `#F8FAF`, `#CBD5E1`, `#94A3B8`
- Borders: `#263449`

### Typography
- Font: Inter, Manrope, or comparable modern sans-serif
- Responsive scaling with mobile-first approach

### Spacing
- xs: 0.25rem, sm: 0.5rem, md: 1rem
- lg: 1.5rem, xl: 2rem, 2xl: 3rem, 3xl: 4rem

## Accessibility

- Keyboard focus indicators on all interactive elements
- Semantic HTML structure
- ARIA labels for complex components
- Reduced motion preferences respected
- WCAG 2.1 AA compliance targeted (requires manual testing)

## Responsive Design

- Mobile-first approach
- Tablet breakpoints at `md` (768px)
- Desktop layouts optimized for large screens
- Touch-friendly interactions on mobile

## Integration Notes

- Other implementation tasks should preserve existing `AppLayout` and shared components
- Page routes should be added in `src/App.tsx`
- Configuration changes should be made in `src/config/navigation.ts`
- Component ownership is coordinated through this shared design system

## Backend Infrastructure

This portfolio uses **Firebase** as the backend foundation:

### Firestore Database
- Published projects, skills, education, experience
- Site content and contact message submissions
- Type-safe data access layer in `src/services/firebase-data-service.ts`
- Security rules ensure only published content is publicly readable

### Cloud Functions
- Contact form submissions with validation and rate limiting
- Spam detection and abuse prevention
- Secure contact message persistence

### Cloudinary Image Hosting
- Project thumbnails and gallery images
- Optimized delivery with transformations
- Upload service ready for future admin dashboard

### Security
- Firestore Security Rules enforce default-deny access control
- App Check with reCAPTCHA v3 for abuse prevention
- Contact submissions only via Cloud Function (not direct writes)
- All API secrets kept server-side only

**Setup Instructions**: See `FIREBASE_SETUP_GUIDE.md`  
**Testing Guide**: See `FIREBASE_TESTING_GUIDE.md`  
**Implementation Details**: See `FIREBASE_IMPLEMENTATION_SUMMARY.md`

## Development Workflow

1. Use `@` path aliases for clean imports
2. Extend component variants in `src/components/*.tsx`
3. Add new shared types to `src/types/index.ts`
4. Use `cn()` utility for classname composition
5. Follow mobile-first responsive design
6. Use Firebase data service for dynamic content

### Environment Configuration

Create `.env.local` with Firebase and Cloudinary credentials (see `.env.example`):

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_PROJECT_ID=...
VITE_CLOUDINARY_CLOUD_NAME=...
VITE_CLOUDINARY_UPLOAD_PRESET=...
```

## Notes

- No personal portrait is included; use a placeholder if needed
- Contact details and social links are managed via configuration
- Admin features are explicitly excluded from this design system
- Backend is ready for future admin dashboard without breaking public portfolio
- Image hosting uses Cloudinary (not Firebase Storage)
