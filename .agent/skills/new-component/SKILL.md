---
name: new-component
description: Scaffold a new component following project conventions. Use when the user asks to create a new UI component, feature, or page section.
---

# New Component Generator

Create components that match the existing project patterns exactly.

## Instructions

1. **Read the design system** at `.agent/rules/design-system.md` before writing anything
2. **Check existing components** in `src/components/` for reference patterns
3. **File placement**:
   - UI components → `src/components/ComponentName.tsx`
   - Page-level views → `src/app/page.tsx` or new route in `src/app/`
   - API endpoints → `src/app/api/[name]/route.ts`
   - Types → `src/types/typeName.ts`
   - Utils → `src/lib/utilName.ts`
4. **Follow the component pattern** from `component-patterns` skill
5. **Apply design tokens** from the design system:
   - Container: `rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800`
   - Inner padding: `px-4 py-3` (compact) or `px-6 py-4` (comfortable)
   - Text hierarchy: heading `font-medium text-zinc-800 dark:text-zinc-200`, body `text-sm text-zinc-500 dark:text-zinc-400`
6. **Add to store if needed**: Extend `useFlashcardStore` for new shared state
7. **Include dark mode** for every visual element

## Spacing Quick Reference

| Use Case | Classes |
|---|---|
| Between items in a list | `gap-2` or `gap-3` |
| Card internal padding | `p-4` or `p-5` |
| Section spacing | `gap-6` or `gap-8` |
| Page margins | `px-4 py-6` |
| Button padding | `px-4 py-2` (normal), `px-3 py-1.5` (small) |
| Icon + text | `gap-2` |

## Do Not

- Do not create components without dark mode support
- Do not use fixed pixel values for spacing — use Tailwind scale
- Do not add dependencies without discussing with user first
- Do not create utility files for single-use functions — keep them in the component
