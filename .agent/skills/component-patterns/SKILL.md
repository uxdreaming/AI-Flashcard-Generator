---
name: component-patterns
description: Follow established component patterns for this project. Use when creating new React components, modifying existing ones, or reviewing component architecture.
---

# Component Patterns

This project follows specific patterns for React components. Apply these when creating or modifying components.

## Instructions

### File Structure
1. `"use client"` directive at top (if component uses hooks or browser APIs)
2. Imports (React, types, libs, sibling components)
3. Interface for props
4. Helper functions (private, not exported)
5. Default export function component

### Standard Component Template
```tsx
"use client";

import { useState } from "react";
import type { SomeType } from "@/types/someType";

interface MyComponentProps {
  data: SomeType;
  onAction: () => void;
}

export default function MyComponent({ data, onAction }: MyComponentProps) {
  const [state, setState] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
      {/* content */}
    </div>
  );
}
```

### Interactive Elements Pattern
- Buttons: `rounded-lg px-4 py-2 text-sm font-medium transition-colors`
- Primary: `bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`
- Secondary: `border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-400 dark:hover:bg-zinc-800`
- Icon buttons: `rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-zinc-300`

### Card Pattern
```
rounded-2xl border-2 shadow-lg
  → gradient bar: h-1 bg-gradient-to-r
  → header: border-b px-5 py-2, flex justify-between
  → body: flex-1 overflow-y-auto px-8 py-6
  → footer: border-t px-5 py-1.5 text-center
```

### State Management
- Use Zustand store at `src/store/useFlashcardStore.ts` for shared state
- Local UI state (open/closed, hover, flip) stays in component with `useState`
- Never read localStorage directly — always go through store methods

## Do Not

- Do not create wrapper components that just pass props through
- Do not use class components
- Do not add `console.log` in components (only in lib/ for error handling)
- Do not import from `react-dom` directly in components
