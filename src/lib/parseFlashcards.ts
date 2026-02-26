interface RawFlashcard {
  question: string;
  answer: string;
  category: string;
}

/**
 * Extracts flashcards from structured text using heuristics.
 * Handles: definitions (term: description), bullet lists with sub-items,
 * numbered lists, headers as categories, and key takeaways.
 */
export function parseFlashcards(text: string): RawFlashcard[] {
  const flashcards: RawFlashcard[] = [];
  const rawLines = text.split("\n");

  let currentCategory = "General";
  let i = 0;

  while (i < rawLines.length) {
    const line = rawLines[i].trim();

    // Skip empty lines and markdown artifacts
    if (!line || line === "```" || line === "---" || line === "|||" || line.match(/^\|[-\s|]+\|$/)) {
      i++;
      continue;
    }

    // Detect category from headers (# Header or TITLE - Subtitle)
    const mdHeader = line.match(/^#{1,3}\s+(.+)/);
    if (mdHeader) {
      const h = mdHeader[1].trim();
      if (h.length > 2 && h.length < 60) currentCategory = h;
      i++;
      continue;
    }

    const titleLine = line.match(/^([A-Z][^:]{3,50})(?:\s*[-–—]\s*.+)?$/);
    if (titleLine && !line.includes(":")) {
      currentCategory = titleLine[1].trim();
      i++;
      continue;
    }

    // Pattern: section header ending with colon (e.g. "User Research Methods:")
    const sectionHeader = line.match(/^([A-Za-z][^:]{3,50}):\s*$/);
    if (sectionHeader) {
      currentCategory = sectionHeader[1].trim();
      i++;
      continue;
    }

    // Pattern: "Key takeaway:" or similar callouts
    const takeawayMatch = line.match(/^[-*]?\s*(?:key\s+)?takeaway:\s*(.+)/i);
    if (takeawayMatch) {
      let answer = takeawayMatch[1].trim();
      if (i + 1 < rawLines.length && rawLines[i + 1].trim().startsWith("(")) {
        answer += " — " + rawLines[i + 1].trim().replace(/[()]/g, "").trim();
        i++;
      }
      flashcards.push({
        question: "What is the key takeaway?",
        answer,
        category: currentCategory,
      });
      i++;
      continue;
    }

    // Pattern: "- Term: definition" on main bullets
    const bulletDef = line.match(/^[-*]\s+(.+?):\s+(.{10,})$/);
    if (bulletDef) {
      const term = bulletDef[1].trim();
      let answer = bulletDef[2].trim();

      // Collect ONLY indented sub-items (lines starting with spaces + bullet)
      const subItems: string[] = [];
      let j = i + 1;
      while (j < rawLines.length) {
        const nextRaw = rawLines[j];
        // Stop at empty lines or non-indented lines
        if (!nextRaw.trim()) break;
        if (!nextRaw.match(/^\s{2,}[*+-]\s+/)) break;
        subItems.push(nextRaw.trim().replace(/^[*+-]\s+/, "").trim());
        j++;
      }

      if (subItems.length > 0) {
        answer = answer + ". " + subItems.join(". ");
      }

      if (term.length >= 3 && term.length <= 80) {
        flashcards.push({
          question: `What is "${term}"?`,
          answer,
          category: currentCategory,
        });
      }

      i = j;
      continue;
    }

    // Pattern: numbered lists (group of 3+ consecutive items)
    const numberedMatch = line.match(/^(\d+)[.)]\s+(.+)/);
    if (numberedMatch) {
      const numberedItems: string[] = [];
      let j = i;
      while (j < rawLines.length && rawLines[j].trim().match(/^\d+[.)]\s+/)) {
        const m = rawLines[j].trim().match(/^\d+[.)]\s+(.+)/);
        if (m) numberedItems.push(m[1].trim());
        j++;
      }

      if (numberedItems.length >= 3) {
        flashcards.push({
          question: `List the ${numberedItems.length} items under "${currentCategory}"`,
          answer: numberedItems.map((item, idx) => `${idx + 1}. ${item}`).join(", "),
          category: currentCategory,
        });

        numberedItems.forEach((item, idx) => {
          if (item.length > 15) {
            flashcards.push({
              question: `What is #${idx + 1} in "${currentCategory}"?`,
              answer: item,
              category: currentCategory,
            });
          }
        });
      }

      i = j;
      continue;
    }

    // Pattern: markdown table rows (| Front | Back |)
    const tableMatch = line.match(/^\|\s*(.+?)\s*\|\s*(.+?)\s*\|$/);
    if (tableMatch) {
      const col1 = tableMatch[1].trim();
      const col2 = tableMatch[2].trim();
      if (col1.toLowerCase() !== "front" && col1.toLowerCase() !== "back" &&
          !col1.match(/^[-\s]+$/) && col2.length > 3) {
        flashcards.push({
          question: col1,
          answer: col2,
          category: currentCategory,
        });
      }
      i++;
      continue;
    }

    i++;
  }

  return flashcards;
}
