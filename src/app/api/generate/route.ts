import { NextRequest, NextResponse } from "next/server";
import { extractText } from "@/lib/extractText";
import { generateFlashcardsWithAI } from "@/lib/gemini";
import { parseFlashcards } from "@/lib/parseFlashcards";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB per file
const ALLOWED_EXTENSIONS = [".pdf", ".txt", ".md"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "text/plain",
  "text/markdown",
  "text/x-markdown",
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const textParts: string[] = [];

    for (const file of files) {
      const ext = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();

      if (!ALLOWED_EXTENSIONS.includes(ext) && !ALLOWED_MIME_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `Invalid file type for "${file.name}". Allowed: .pdf, .txt, .md` },
          { status: 400 }
        );
      }

      if (file.size > MAX_SIZE) {
        return NextResponse.json(
          { error: `"${file.name}" is too large. Maximum size is 10MB.` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const text = await extractText(buffer, file.name, file.type);

      if (text.trim()) {
        textParts.push(text);
      }
    }

    const combinedText = textParts.join("\n\n---\n\n");

    if (!combinedText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from any of the files." },
        { status: 422 }
      );
    }

    let flashcards;
    try {
      flashcards = await generateFlashcardsWithAI(combinedText);
    } catch (aiError) {
      console.warn("Gemini failed, falling back to heuristic parser:", aiError);
      flashcards = parseFlashcards(combinedText);
    }

    if (flashcards.length === 0) {
      return NextResponse.json(
        {
          error:
            "No flashcards could be generated. Try files with more structured content.",
        },
        { status: 422 }
      );
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate flashcards" },
      { status: 500 }
    );
  }
}
