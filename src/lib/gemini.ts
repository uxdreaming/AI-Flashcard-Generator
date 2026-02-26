import { GoogleGenAI } from "@google/genai";

interface RawFlashcard {
  question: string;
  answer: string;
  category: string;
}

const MAX_TEXT_LENGTH = 30_000;

export async function generateFlashcardsWithAI(
  text: string
): Promise<RawFlashcard[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "tu_key_aqui") {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const ai = new GoogleGenAI({ apiKey });

  const truncated = text.slice(0, MAX_TEXT_LENGTH);

  const prompt = `You are a study flashcard generator. Analyze the following text and create flashcards from the key concepts, definitions, facts, and important information.

Rules:
- Generate between 5 and 30 flashcards depending on the content length
- Each flashcard must have a clear, specific question and a concise answer
- Group flashcards into logical categories based on the content topics
- Questions should test understanding, not just recall
- Answers should be complete but concise (1-3 sentences)
- Do NOT include trivial or obvious information

Return ONLY a JSON array with this exact format (no other text):
[
  {
    "question": "What is...?",
    "answer": "It is...",
    "category": "Topic Name"
  }
]

Text to analyze:
${truncated}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  const raw = response.text ?? "";
  const cleaned = raw.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed)) {
    throw new Error("Gemini response is not an array");
  }

  return parsed.map((item: Record<string, unknown>) => ({
    question: String(item.question || ""),
    answer: String(item.answer || ""),
    category: String(item.category || "General"),
  }));
}
