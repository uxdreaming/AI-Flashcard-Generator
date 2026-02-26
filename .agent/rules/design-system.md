# Design System Rules

Always follow these design tokens when generating or modifying UI.

## Colors

### Base Theme
- Light background: `bg-zinc-50` (page), `bg-white` (cards/surfaces)
- Dark background: `dark:bg-zinc-900` (page), `dark:bg-zinc-800` (cards)
- Light text: `text-zinc-800` (primary), `text-zinc-500` (secondary), `text-zinc-400` (muted)
- Dark text: `dark:text-zinc-100` (primary), `dark:text-zinc-400` (secondary), `dark:text-zinc-500` (muted)

### Accent
- Primary action: `bg-blue-600`, hover: `bg-blue-700`
- Success: `bg-green-100 text-green-600`, dark: `dark:bg-green-900/50 dark:text-green-400`
- Error: `text-red-500`, backgrounds: `bg-red-50 dark:bg-red-950/40`
- Disabled: `opacity-50`

### Category Palette (8 colors, cycled)
1. Violet — `violet-50/300/600/950`
2. Blue — `blue-50/300/600/950`
3. Emerald — `emerald-50/300/600/950`
4. Amber — `amber-50/300/600/950`
5. Rose — `rose-50/300/600/950`
6. Cyan — `cyan-50/300/600/950`
7. Orange — `orange-50/300/600/950`
8. Pink — `pink-50/300/600/950`

Each category color uses these shade patterns:
- Light bg: `{color}-50`, dark bg: `dark:{color}-950/30`
- Border: `{color}-300`, dark border: `dark:{color}-700/50`
- Text: `{color}-600`, dark text: `dark:{color}-300`
- Badge: `{color}-100 text-{color}-700`, dark badge: `dark:{color}-900/50 dark:text-{color}-300`
- Gradient: `from-{color}-500 to-{adjacent}-600`

## Typography

### Fonts
- Sans: `font-sans` (Geist Sans via `--font-geist-sans`)
- Mono: `font-mono` (Geist Mono via `--font-geist-mono`)

### Scale
- Hero: `text-3xl font-bold` (30px)
- Section: `text-xl font-semibold`
- Body: `text-sm` (14px) or `text-base` (16px)
- Caption/label: `text-xs` (12px)
- Micro: `text-[10px]` (counters, hints)

### Adaptive Sizing (flashcards only)
Questions scale from 32px (short) → 16px (long) based on character count.
Answers scale from 24px (short) → 13px (long).
Applied via inline `style={{ fontSize }}`, NOT Tailwind classes.

## Spacing

Follow Tailwind 4px base grid:
- Tight: `gap-1` (4px), `gap-1.5` (6px), `gap-2` (8px)
- Standard: `gap-3` (12px), `gap-4` (16px)
- Comfortable: `gap-6` (24px), `gap-8` (32px)
- Generous: `gap-10` (40px)
- Page padding: `px-4 py-6` (mobile), up to `px-6`
- Card padding: `px-5 py-2` (header), `px-8 py-6` (body)
- Container: `max-w-5xl mx-auto` (landing), `max-w-3xl` (card area)

## Border Radius

- Buttons: `rounded-lg` (8px)
- Cards/containers: `rounded-xl` (12px)
- Large cards: `rounded-2xl` (16px)
- Pills/badges: `rounded-full`
- Small badges: `rounded-md` (6px)

## Shadows

- Cards: `shadow-lg`
- Default: `shadow` (subtle)
- Never use shadows on buttons — use border + bg change on hover

## Transitions

- Default: `transition-colors` for hover states
- Complex: `transition-all` only when multiple properties animate
- Card flip: `0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- Zoom: `0.2s ease`

## Dark Mode

- Always provide dark variants for every color
- Use `dark:` prefix — dark mode is class-based (`.dark` on `<html>`)
- Dark surfaces use `/30` or `/50` opacity for colored backgrounds
- Dark borders use `/50` opacity
- Never use `dark:bg-black` — always `dark:bg-zinc-900` or `dark:bg-zinc-800`

## Responsive

- Mobile-first approach
- Breakpoints: `md:` (768px) for layout shifts
- Sidebar: `hidden md:flex`, width `w-72`
- Touch targets: minimum 44px height for interactive elements
