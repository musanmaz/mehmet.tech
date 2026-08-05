import type { Line, OutputBlock, Segment, Tone } from "./types";

export function txt(
  text: string,
  tone: Tone = "fg",
  opts: { bold?: boolean } = {},
): Segment {
  return { kind: "text", text, tone, bold: opts.bold };
}

export function dim(text: string): Segment {
  return txt(text, "dim");
}

export function strong(text: string, tone: Tone = "accent"): Segment {
  return txt(text, tone, { bold: true });
}

export function badge(text: string, tone: Tone = "accent3"): Segment {
  return { kind: "text", text, tone, badge: true };
}

export function link(
  text: string,
  href: string,
  tone: Tone = "accent3",
): Segment {
  return { kind: "link", text, href, tone };
}

export function action(
  text: string,
  command: string,
  tone: Tone = "accent",
): Segment {
  return { kind: "action", text, command, tone };
}

export function swatch(colors: string[]): Segment {
  return { kind: "swatch", colors };
}

export const blank: Line = [];

export function lines(...items: Line[]): OutputBlock {
  return { type: "lines", lines: items };
}

export function text(...items: string[]): OutputBlock {
  return { type: "lines", lines: items.map((s) => (s ? [txt(s)] : [])) };
}

export function heading(title: string): Line {
  return [strong(title.toUpperCase())];
}

export function rule(width = 46): Line {
  return [dim("─".repeat(width))];
}

export function kv(label: string, value: Segment[], pad = 12): Line {
  return [dim(`${label}:`.padEnd(pad)), ...value];
}

export function ascii(
  content: string,
  tone: Tone = "accent",
  glow = true,
): OutputBlock {
  return { type: "ascii", text: content, tone, glow };
}

export function grid(items: Segment[]): OutputBlock {
  return { type: "grid", items };
}

export function card(title: Line, body: Line[], accent: Tone = "accent"): OutputBlock {
  return { type: "card", title, body, accent };
}

export function error(message: string): OutputBlock {
  return lines([txt(message, "error")]);
}

export function warn(message: string): OutputBlock {
  return lines([txt(message, "warn")]);
}

export function success(message: string): OutputBlock {
  return lines([txt(message, "success")]);
}

function segmentText(segment: Segment): string {
  switch (segment.kind) {
    case "text":
    case "link":
    case "action":
      return segment.text;
    case "swatch":
      return "";
  }
}

/** Flattens blocks into plain text so `grep` and `find` can search them. */
export function blocksToText(blocks: OutputBlock[]): string {
  const out: string[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case "lines":
        for (const line of block.lines) {
          out.push(line.map(segmentText).join(""));
        }
        break;
      case "grid":
        out.push(block.items.map(segmentText).join(" "));
        break;
      case "card":
        out.push(block.title.map(segmentText).join(""));
        for (const line of block.body) {
          out.push(line.map(segmentText).join(""));
        }
        break;
      case "split":
        for (const line of block.right) {
          out.push(line.map(segmentText).join(""));
        }
        break;
      case "ascii":
      case "prompt":
      case "matrix":
        break;
    }
  }
  return out.join("\n");
}
