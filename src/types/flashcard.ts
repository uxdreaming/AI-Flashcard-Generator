export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  createdAt: number;
}

export interface FlashcardCollection {
  flashcards: Flashcard[];
  sourceFileName?: string;
  updatedAt: number;
}

export type GenerationStep =
  | "idle"
  | "uploading"
  | "extracting"
  | "generating"
  | "done";
