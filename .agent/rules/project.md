# AI Flashcard Gen — Project Rules

You are working on **AI Flashcard Gen**, a Next.js 16 app with React 19, Tailwind CSS 4, Zustand, and Google Gemini API.

## Tech Stack

- Next.js 16 with App Router (`src/app/`)
- React 19 with `"use client"` for interactive components
- Tailwind CSS 4 (utility-first, no tailwind.config — uses CSS-based config in `globals.css`)
- Zustand 5 for state management (`src/store/`)
- TypeScript 5 strict mode
- Geist Sans + Geist Mono fonts
- Google Gemini 2.0 Flash for AI generation

## File Organization

```
src/
  app/           → Pages and API routes
  components/    → React components (one per file, default export)
  lib/           → Utility functions and API clients
  store/         → Zustand stores
  types/         → TypeScript interfaces
```

## Code Conventions

- Components: PascalCase filenames, default exports, `"use client"` when using hooks
- Interfaces: defined in `src/types/` or co-located at top of component file
- State: all shared state goes through Zustand store, never prop drilling more than 2 levels
- API routes: `src/app/api/[endpoint]/route.ts` using NextRequest/NextResponse
- No class components. Only function components with hooks
- No inline styles except for dynamic values (fontSize, transform, scale)
- All static styling via Tailwind utility classes
