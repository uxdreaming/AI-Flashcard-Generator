import { PDFParse } from "pdf-parse";

export async function extractText(
  buffer: Buffer,
  fileName: string,
  mimeType?: string
): Promise<string> {
  const ext = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

  if (ext === ".pdf" || mimeType === "application/pdf") {
    const pdf = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await pdf.getText();
    return result.text;
  }

  return buffer.toString("utf-8");
}
