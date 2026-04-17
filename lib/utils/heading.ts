export function toHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export function getBlockText(children?: Array<{ text?: string }>): string {
  const fullText = children?.map((child) => child.text ?? '').join('') ?? '';

  return fullText.replace(/^(\d+(\.\d+)*[\.\)]|•)\s+/, '');
}