# AI Flashcard Generator

Smart flashcard generator optimized for spaced repetition from any study material. Built for anyone who studies — whether you're a student, a professional learning new skills, or a curious mind exploring new topics. Drop your material in any format, get study-ready flashcards.

## Idea

Upload your study material and the system will:
1. Extract key concepts from the source (PDF, handwritten notes, audio, or plain text)
2. Generate question/answer pairs as flashcards
3. Optimize flashcards for retention using spaced repetition principles
4. Export in formats compatible with Anki and other apps

## Supported inputs

| Input type | How it works |
|------------|--------------|
| **PDF documents** | Direct text extraction from any PDF file |
| **Handwritten notes** | OCR converts photos of handwritten notes into text |
| **Voice / Audio** | AI transcription turns spoken notes or lectures into text |
| **Other text formats** | Support for .txt, .md, .docx and other common formats |

No matter how you take notes — typing, writing by hand, or speaking — the tool adapts to your workflow.

## Use cases

| Scenario | Input | Output |
|----------|-------|--------|
| Preparing a biology exam | 40-page chapter PDF | 50 flashcards with concepts, definitions and relationships |
| Learning English vocabulary | Article from The Guardian | Cards with words in context, meaning and usage examples |
| Studying for AWS certification | Official documentation PDF | Flashcards per service with exam-style questions |
| Reviewing a research paper | Paper from arxiv | Cards with hypothesis, methodology, key findings and limitations |
| Quick review after class | Photo of handwritten notes | Cards with key concepts extracted via OCR |
| Reviewing a lecture | Audio recording of a class | Cards from transcribed content with main topics |

## Roadmap

### Phase 1 - MVP
- [ ] Text extraction from PDF
- [ ] Prompt engineering to generate flashcards from text
- [ ] Basic JSON/CSV output
- [ ] End-to-end working script

### Phase 2 - Multi-format input
- [ ] OCR for handwritten notes (image to text)
- [ ] Audio/voice transcription (speech to text)
- [ ] Support for .txt, .md, .docx formats

### Phase 3 - UI & Improvements
- [ ] Interface for file uploads
- [ ] Difficulty and flashcard count selector
- [ ] Flashcard preview before export
- [ ] Anki export format (.apkg)

### Phase 4 - Intelligence
- [ ] Automatic topic and subtopic detection
- [ ] Flashcard generation with visual context (diagrams, tables)
- [ ] Quiz mode with multiple choice questions
- [ ] Difficulty analysis per concept

## Structure

```
AI-Flashcard-Generator/
├── src/              # Source code
├── data/             # Test files and generated outputs
│   └── samples/      # Example inputs (OCR, audio, screenshots)
├── docs/             # Project documentation
└── README.md
```
