# Coding Style Rules

## TypeScript

- Always use strict types. No `any` unless absolutely necessary
- Interfaces over type aliases for object shapes
- Props interfaces defined at the top of component files or in `src/types/`
- Use `type` imports: `import type { Flashcard } from "@/types/flashcard"`
- Path aliases: always use `@/` prefix (maps to `./src/`)

## React Patterns

- Memoize expensive computations with `useMemo`
- Use `useCallback` for functions passed as props
- Prefer early returns for conditional rendering
- Keep components under 200 lines; extract sub-components if larger
- State that's shared between components → Zustand store
- State local to one component → `useState`

## Tailwind CSS

- Never use `@apply` — write utility classes directly
- Group classes in this order: layout → sizing → spacing → border → bg → text → effects → responsive
- Example: `flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300`
- Use arbitrary values `[value]` only for truly custom values (font sizes, specific widths)
- Always include dark mode variants

## SVG Icons

- Inline SVGs, not icon libraries
- Standard props: `width`, `height`, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `strokeWidth="1.5"` or `"2"`
- Color via parent `text-{color}` class (stroke inherits currentColor)
