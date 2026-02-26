"use client";

import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2.5">
          {/* Stacked cards icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-blue-600 dark:text-blue-400"
          >
            <rect x="2" y="4" width="16" height="14" rx="2" />
            <rect x="6" y="2" width="16" height="14" rx="2" />
            <line x1="10" y1="8" x2="18" y2="8" />
            <line x1="10" y1="12" x2="16" y2="12" />
          </svg>
          <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            AI Flashcard Gen
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
