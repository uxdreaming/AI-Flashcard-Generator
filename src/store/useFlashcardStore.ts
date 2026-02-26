import { create } from "zustand";
import type {
  Flashcard,
  FlashcardCollection,
  GenerationStep,
} from "@/types/flashcard";

const STORAGE_KEY = "flashcards";

interface FlashcardState {
  flashcards: Flashcard[];
  loading: boolean;
  error: string | null;
  selectedFiles: File[];
  generationStep: GenerationStep;
  categoryFilter: string | null;
  setFlashcards: (flashcards: Flashcard[]) => void;
  addFlashcards: (flashcards: Flashcard[]) => void;
  deleteFlashcard: (id: string) => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSelectedFiles: (files: File[]) => void;
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  setGenerationStep: (step: GenerationStep) => void;
  setCategoryFilter: (category: string | null) => void;
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  flashcards: [],
  loading: false,
  error: null,
  selectedFiles: [],
  generationStep: "idle",
  categoryFilter: null,

  setFlashcards: (flashcards) => set({ flashcards }),

  addFlashcards: (newFlashcards) =>
    set((state) => ({
      flashcards: [...state.flashcards, ...newFlashcards],
    })),

  deleteFlashcard: (id) =>
    set((state) => ({
      flashcards: state.flashcards.filter((f) => f.id !== id),
    })),

  saveToStorage: () => {
    const { flashcards } = get();
    const collection: FlashcardCollection = {
      flashcards,
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  },

  loadFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const collection: FlashcardCollection = JSON.parse(raw);
      if (collection.flashcards && Array.isArray(collection.flashcards)) {
        set({ flashcards: collection.flashcards });
      }
    } catch {
      console.error("Failed to load flashcards from storage");
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedFiles: (files) => set({ selectedFiles: files }),
  addFiles: (files) =>
    set((state) => ({
      selectedFiles: [...state.selectedFiles, ...files],
    })),
  removeFile: (index) =>
    set((state) => ({
      selectedFiles: state.selectedFiles.filter((_, i) => i !== index),
    })),
  setGenerationStep: (step) => set({ generationStep: step }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
}));
