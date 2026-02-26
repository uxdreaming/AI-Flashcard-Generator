"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFlashcardStore } from "@/store/useFlashcardStore";
import FileUpload from "@/components/FileUpload";
import FlashcardList from "@/components/FlashcardList";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function Home() {
  const {
    flashcards,
    loading,
    error,
    selectedFiles,
    generationStep,
    categoryFilter,
    setFlashcards,
    deleteFlashcard,
    saveToStorage,
    loadFromStorage,
    setLoading,
    setError,
    addFiles,
    removeFile,
    setSelectedFiles,
    setGenerationStep,
    setCategoryFilter,
  } = useFlashcardStore();

  const [saved, setSaved] = useState(false);
  const [studyMode, setStudyMode] = useState(false);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Enter study mode when flashcards exist
  useEffect(() => {
    if (flashcards.length > 0 && !loading) {
      setStudyMode(true);
    }
  }, [flashcards.length, loading]);

  const handleGenerate = async () => {
    if (selectedFiles.length === 0) return;

    setLoading(true);
    setError(null);
    setSaved(false);
    setGenerationStep("uploading");

    try {
      setGenerationStep("extracting");

      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file);
      }

      setGenerationStep("generating");

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate flashcards");
      }

      const data = await res.json();

      const flashcardsWithIds = data.flashcards.map(
        (f: { question: string; answer: string; category: string }) => ({
          ...f,
          id: uuidv4(),
          createdAt: Date.now(),
        })
      );

      setGenerationStep("done");
      setFlashcards(flashcardsWithIds);
      setSelectedFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setGenerationStep("idle");
    }
  };

  const handleSave = () => {
    saveToStorage();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleBack = () => {
    setStudyMode(false);
  };

  // Study mode — full screen, no header
  if (studyMode && flashcards.length > 0) {
    return (
      <div className="study-mode h-screen">
        <FlashcardList
          flashcards={flashcards}
          onDelete={deleteFlashcard}
          onSave={handleSave}
          saved={saved}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          onBack={handleBack}
        />
      </div>
    );
  }

  // Upload / landing mode
  return (
    <div className="h-full overflow-y-auto bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto w-full max-w-5xl px-4 py-6">
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-center text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <LoadingIndicator step={generationStep} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">
                  Generate flashcards with AI
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Upload your study notes and let AI create smart flashcards
                  you can flip through, just like Anki.
                </p>
                {flashcards.length > 0 && (
                  <button
                    onClick={() => setStudyMode(true)}
                    className="w-fit rounded-xl bg-zinc-800 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
                  >
                    Resume studying ({flashcards.length} cards)
                  </button>
                )}
              </div>

              <FileUpload
                onFilesAdded={addFiles}
                onGenerate={handleGenerate}
                selectedFiles={selectedFiles}
                onRemoveFile={removeFile}
                onClearFiles={() => setSelectedFiles([])}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
