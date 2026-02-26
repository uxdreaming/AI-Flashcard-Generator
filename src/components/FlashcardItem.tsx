"use client";

import { useState, useMemo } from "react";
import type { Flashcard } from "@/types/flashcard";
import { getCategoryColor } from "@/lib/categoryColors";
import CategoryIcon from "./CategoryIcon";

interface FlashcardItemProps {
  flashcard: Flashcard;
  index: number;
  total: number;
  categories: string[];
  onDelete: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
  zoom: number;
}

function getAdaptiveFontSize(text: string, isQuestion: boolean): number {
  const len = text.length;
  if (isQuestion) {
    if (len < 40) return 32;
    if (len < 80) return 26;
    if (len < 150) return 22;
    if (len < 300) return 18;
    return 16;
  }
  // answer
  if (len < 60) return 24;
  if (len < 150) return 20;
  if (len < 300) return 17;
  if (len < 600) return 15;
  return 13;
}

function isShortContent(text: string): boolean {
  return text.length < 80;
}

function formatContent(text: string) {
  const numberedInline = text.match(/\d+\.\s+.+?,\s*\d+\./);
  if (numberedInline) {
    const items = text.split(/,\s*(?=\d+\.)/).map((s) => s.trim());
    return (
      <ol className="space-y-1.5 text-left">
        {items.map((item, i) => {
          const cleaned = item.replace(/^\d+\.\s*/, "").replace(/\.$/, "");
          return (
            <li key={i} className="flex gap-2">
              <span className="flex-shrink-0 font-mono opacity-30">
                {i + 1}.
              </span>
              <span>{cleaned}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  const lines = text.split(/\n/).filter((l) => l.trim());
  const allNumbered =
    lines.length > 1 && lines.every((l) => /^\d+[.)]\s/.test(l.trim()));
  const allBulleted =
    lines.length > 1 && lines.every((l) => /^[-*]\s/.test(l.trim()));

  if (allNumbered) {
    return (
      <ol className="space-y-1.5 text-left">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="flex-shrink-0 font-mono opacity-30">
              {i + 1}.
            </span>
            <span>{line.replace(/^\d+[.)]\s*/, "")}</span>
          </li>
        ))}
      </ol>
    );
  }

  if (allBulleted) {
    return (
      <ul className="space-y-1.5 text-left">
        {lines.map((line, i) => (
          <li key={i} className="flex gap-2">
            <span className="flex-shrink-0 opacity-30">&#8226;</span>
            <span>{line.replace(/^[-*]\s*/, "")}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (lines.length > 1) {
    return (
      <div className="space-y-2 text-left">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    );
  }

  return <p>{text}</p>;
}

export default function FlashcardItem({
  flashcard,
  index,
  total,
  categories,
  onDelete,
  onPrev,
  onNext,
  zoom,
}: FlashcardItemProps) {
  const [flipped, setFlipped] = useState(false);
  const c = getCategoryColor(flashcard.category, categories);

  const questionFontSize = useMemo(
    () => getAdaptiveFontSize(flashcard.question, true),
    [flashcard.question]
  );
  const answerFontSize = useMemo(
    () => getAdaptiveFontSize(flashcard.answer, false),
    [flashcard.answer]
  );
  const showQuestionIcon = isShortContent(flashcard.question);

  const handleFlip = () => setFlipped(!flipped);

  const handleNav = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    setFlipped(false);
    action();
  };

  return (
    <div className="flex h-full flex-col gap-3">
      {/* Card container — fixed landscape aspect, centered */}
      <div className="flex min-h-0 flex-1 items-center justify-center">
        <div
          className="card-flip-container w-full"
          style={{
            maxWidth: "780px",
            aspectRatio: "16 / 10",
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            transition: "transform 0.2s ease",
          }}
        >
          <div className={`card-flip-inner ${flipped ? "flipped" : ""}`}>
            {/* Front — Question */}
            <div
              className={`card-flip-face flex flex-col overflow-hidden rounded-2xl border-2 shadow-lg ${c.border} ${c.darkBorder}`}
            >
              {/* Gradient bar */}
              <div
                className={`h-1 flex-shrink-0 bg-gradient-to-r ${c.gradient} ${c.darkGradient}`}
              />

              <div className="flex min-h-0 flex-1 flex-col bg-white dark:bg-zinc-800">
                {/* Header */}
                <div
                  className={`flex flex-shrink-0 items-center justify-between border-b px-5 py-2 ${c.backBorder}`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`rounded-md p-1 ${c.badge} ${c.darkBadge}`}>
                      <CategoryIcon icon={c.icon} size={14} />
                    </div>
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      {flashcard.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-zinc-400">
                      {index + 1}/{total}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(flashcard.id);
                      }}
                      className="rounded p-1 text-zinc-300 transition-colors hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400"
                      aria-label="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Question body */}
                <div
                  className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-8 py-6"
                  onClick={handleFlip}
                >
                  <div className="flex flex-col items-center gap-4">
                    {showQuestionIcon && (
                      <div className={`opacity-15 ${c.text}`}>
                        <CategoryIcon icon={c.icon} size={56} />
                      </div>
                    )}
                    <p
                      className="text-center font-bold leading-snug text-zinc-800 dark:text-zinc-100"
                      style={{
                        fontSize: `${questionFontSize}px`,
                        lineHeight: 1.3,
                      }}
                    >
                      {flashcard.question}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className={`flex-shrink-0 border-t px-5 py-1.5 text-center ${c.backBorder}`}
                >
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    Click to reveal answer
                  </span>
                </div>
              </div>
            </div>

            {/* Back — Answer */}
            <div
              className={`card-flip-face card-flip-back flex flex-col overflow-hidden rounded-2xl border-2 shadow-lg ${c.border} ${c.darkBorder}`}
            >
              <div
                className={`h-1 flex-shrink-0 bg-gradient-to-r ${c.gradient} ${c.darkGradient}`}
              />

              <div
                className={`flex min-h-0 flex-1 flex-col ${c.backBg} ${c.darkBg}`}
              >
                {/* Header */}
                <div
                  className={`flex flex-shrink-0 items-center justify-between border-b px-5 py-2 ${c.backBorder}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-green-100 p-1 text-green-600 dark:bg-green-900/50 dark:text-green-400">
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                      Answer
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">
                    {index + 1}/{total}
                  </span>
                </div>

                {/* Answer body */}
                <div
                  className="min-h-0 flex-1 overflow-y-auto px-8 py-6"
                  onClick={handleFlip}
                >
                  <div
                    className="leading-relaxed text-zinc-700 dark:text-zinc-300"
                    style={{
                      fontSize: `${answerFontSize}px`,
                      lineHeight: 1.5,
                    }}
                  >
                    {formatContent(flashcard.answer)}
                  </div>
                </div>

                {/* Footer */}
                <div
                  className={`flex-shrink-0 border-t px-5 py-1.5 text-center ${c.backBorder}`}
                >
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    Click to flip back
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-shrink-0 items-center justify-center gap-3">
        <button
          onClick={(e) => handleNav(e, onPrev)}
          disabled={index === 0}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700 disabled:opacity-30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-1">
          {total <= 20 ? (
            Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  i === index
                    ? `h-2 w-5 ${c.activeDot}`
                    : "h-2 w-2 bg-zinc-300 dark:bg-zinc-600"
                }`}
              />
            ))
          ) : (
            <span className="px-2 font-mono text-sm text-zinc-500 dark:text-zinc-400">
              {index + 1} / {total}
            </span>
          )}
        </div>

        <button
          onClick={(e) => handleNav(e, onNext)}
          disabled={index === total - 1}
          className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700 disabled:opacity-30 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
