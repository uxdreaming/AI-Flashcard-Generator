---
name: accessibility-check
description: Audit components for accessibility issues. Use when reviewing UI code, creating interactive elements, or before finalizing any component that users interact with.
---

# Accessibility Check

Audit and fix accessibility issues in this Next.js + Tailwind project.

## Instructions

1. **Interactive elements**: Every button must have visible text content or an `aria-label`
2. **Keyboard navigation**: All interactive elements must be focusable and operable with keyboard
3. **Color contrast**: Verify text meets WCAG AA minimums:
   - Normal text: 4.5:1 ratio
   - Large text (18px+ or 14px bold): 3:1 ratio
   - Check both light and dark themes
4. **Focus indicators**: Ensure `focus:ring` or `focus:outline` on interactive elements (Tailwind provides defaults but verify custom-styled elements)
5. **Form inputs**: Must have associated labels (visible or `aria-label`)
6. **Images/icons**: Decorative SVGs: `aria-hidden="true"`. Meaningful SVGs: `role="img"` + `aria-label`
7. **Motion**: The card flip animation should respect `prefers-reduced-motion`
8. **Screen reader text**: Use `sr-only` class for text that should be readable but not visible

## Common Issues in This Project

- Icon-only buttons (close, delete, nav arrows) — always check `aria-label`
- Category badges are decorative — ensure they don't confuse screen readers
- Flashcard flip interaction needs keyboard support (Enter/Space to flip)
- File upload drag zone needs keyboard alternative (already has click-to-browse)

## Checklist

- [ ] All buttons have accessible names
- [ ] Color contrast passes AA in both themes
- [ ] Keyboard navigation works for all interactive flows
- [ ] Loading states are announced (`aria-live="polite"`)
- [ ] Error messages are associated with inputs (`aria-describedby`)

## Do Not

- Do not remove existing `aria-label` attributes
- Do not hide interactive elements from screen readers
- Do not rely solely on color to convey meaning
