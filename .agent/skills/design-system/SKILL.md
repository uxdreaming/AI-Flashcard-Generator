---
name: design-system
description: Reference the project design system tokens for colors, spacing, typography, and component patterns. Use when creating or modifying any UI element to ensure visual consistency.
---

# Design System Reference

When the user asks you to build, modify, or review UI, always consult the design system rules at `.agent/rules/design-system.md`.

## Instructions

1. Before writing any component, read `.agent/rules/design-system.md` for current tokens
2. Check `src/lib/categoryColors.ts` for the 8-color category palette if working with categorized content
3. Check `src/app/globals.css` for CSS variables and custom animations
4. Apply these patterns consistently:
   - Surfaces: `bg-white dark:bg-zinc-800` for cards, `bg-zinc-50 dark:bg-zinc-900` for page backgrounds
   - Borders: `border-zinc-200 dark:border-zinc-700` for neutral, category colors for themed elements
   - Radius: `rounded-xl` for containers, `rounded-lg` for buttons, `rounded-2xl` for large cards
   - Spacing: multiples of 4px via Tailwind scale (gap-2, gap-3, gap-4, etc.)
5. Always include dark mode variants for every color class
6. Test that text has sufficient contrast in both themes

## Do Not

- Do not invent new color tokens outside the established palette
- Do not use hardcoded hex colors in components — use Tailwind classes
- Do not use `@apply` in CSS
- Do not use opacity less than 0.3 for text content
