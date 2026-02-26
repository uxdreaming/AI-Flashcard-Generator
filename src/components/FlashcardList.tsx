"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import type { Flashcard } from "@/types/flashcard";
import FlashcardItem from "./FlashcardItem";
import { getCategoryColor } from "@/lib/categoryColors";
import CategoryIcon from "./CategoryIcon";

interface FlashcardListProps {
  flashcards: Flashcard[];
  onDelete: (id: string) => void;
  onSave: () => void;
  saved: boolean;
  categoryFilter: string | null;
  onCategoryChange: (category: string | null) => void;
  onBack: () => void;
}

export default function FlashcardList({
  flashcards,
  onDelete,
  onSave,
  saved,
  categoryFilter,
  onCategoryChange,
  onBack,
}: FlashcardListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("flashcard-zoom");
      return stored ? parseFloat(stored) : 1;
    }
    return 1;
  });

  const categories = useMemo(() => {
    const cats = new Set(flashcards.map((f) => f.category));
    return Array.from(cats).sort();
  }, [flashcards]);

  const filtered = useMemo(
    () =>
      categoryFilter
        ? flashcards.filter((f) => f.category === categoryFilter)
        : flashcards,
    [flashcards, categoryFilter]
  );

  useEffect(() => {
    setCurrentIndex(0);
  }, [categoryFilter]);

  useEffect(() => {
    if (currentIndex >= filtered.length && filtered.length > 0) {
      setCurrentIndex(filtered.length - 1);
    }
  }, [filtered.length, currentIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(filtered.length - 1, i + 1));
  }, [filtered.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  const handleZoomChange = (newZoom: number) => {
    const clamped = Math.min(1.5, Math.max(0.6, newZoom));
    setZoom(clamped);
    localStorage.setItem("flashcard-zoom", String(clamped));
  };

  if (filtered.length === 0) return null;

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="hidden w-72 flex-shrink-0 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 md:flex">
        {/* Sidebar header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                saved
                  ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Category filters */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-1.5 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
            <button
              onClick={() => onCategoryChange(null)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                !categoryFilter
                  ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              All
            </button>
            {categories.map((cat) => {
              const cc = getCategoryColor(cat, categories);
              return (
                <button
                  key={cat}
                  onClick={() =>
                    onCategoryChange(categoryFilter === cat ? null : cat)
                  }
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    categoryFilter === cat
                      ? `${cc.badge} ${cc.darkBadge}`
                      : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Card list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((card, i) => {
            const cc = getCategoryColor(card.category, categories);
            const isActive = i === currentIndex;
            return (
              <button
                key={card.id}
                onClick={() => setCurrentIndex(i)}
                className={`flex w-full items-start gap-3 border-b border-zinc-50 px-4 py-3 text-left transition-all dark:border-zinc-800/50 ${
                  isActive
                    ? `${cc.backBg} ${cc.darkBg} border-l-2 ${cc.border} ${cc.darkBorder}`
                    : "border-l-2 border-l-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                }`}
              >
                <div
                  className={`mt-0.5 flex-shrink-0 rounded p-1 ${isActive ? `${cc.badge} ${cc.darkBadge}` : "text-zinc-400 dark:text-zinc-500"}`}
                >
                  <CategoryIcon icon={cc.icon} size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`truncate text-sm ${isActive ? "font-semibold text-zinc-800 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}
                  >
                    {card.question}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-zinc-400 dark:text-zinc-500">
                    {card.category}
                  </p>
                </div>
                <span className="mt-0.5 flex-shrink-0 font-mono text-[10px] text-zinc-300 dark:text-zinc-600">
                  {i + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sidebar footer with zoom */}
        <div className="border-t border-zinc-100 px-4 py-2.5 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              {filtered.length} card{filtered.length !== 1 ? "s" : ""}
              {categoryFilter ? ` in ${categoryFilter}` : ""}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleZoomChange(zoom - 0.1)}
                disabled={zoom <= 0.6}
                className="rounded p-0.5 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 dark:text-zinc-500 dark:hover:text-zinc-300"
                aria-label="Zoom out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <span className="font-mono text-[10px] text-zinc-400">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => handleZoomChange(zoom + 0.1)}
                disabled={zoom >= 1.5}
                className="rounded p-0.5 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 dark:text-zinc-500 dark:hover:text-zinc-300"
                aria-label="Zoom in"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main card area */}
      <div className="flex min-h-0 flex-1 flex-col bg-zinc-50 px-6 py-4 dark:bg-zinc-900">
        {/* Mobile top bar */}
        <div className="flex flex-shrink-0 items-center justify-between pb-3 md:hidden">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-zinc-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <div className="flex items-center gap-3">
            {/* Mobile zoom */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleZoomChange(zoom - 0.1)}
                disabled={zoom <= 0.6}
                className="rounded p-1 text-zinc-400 disabled:opacity-30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
              <span className="font-mono text-[10px] text-zinc-400">{Math.round(zoom * 100)}%</span>
              <button
                onClick={() => handleZoomChange(zoom + 0.1)}
                disabled={zoom >= 1.5}
                className="rounded p-1 text-zinc-400 disabled:opacity-30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </button>
            </div>
            <button
              onClick={onSave}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                saved
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-600 text-white"
              }`}
            >
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Card takes all remaining space */}
        <div className="mx-auto w-full max-w-3xl min-h-0 flex-1">
          <FlashcardItem
            flashcard={filtered[currentIndex]}
            index={currentIndex}
            total={filtered.length}
            categories={categories}
            onDelete={onDelete}
            onPrev={handlePrev}
            onNext={handleNext}
            zoom={zoom}
          />
        </div>
      </div>
    </div>
  );
}
