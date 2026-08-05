"use client";

import { memo } from "react";
import type { Line, OutputBlock, Segment, Tone } from "@/lib/terminal/types";
import { MatrixRain } from "./MatrixRain";
import { PromptLabel } from "./PromptLabel";

const toneVar: Record<Tone, string> = {
  fg: "var(--term-fg)",
  dim: "var(--term-dim)",
  accent: "var(--term-accent)",
  accent2: "var(--term-accent2)",
  accent3: "var(--term-accent3)",
  success: "var(--term-success)",
  warn: "var(--term-warn)",
  error: "var(--term-error)",
};

function color(tone: Tone = "fg"): string {
  return toneVar[tone];
}

interface SegmentViewProps {
  segment: Segment;
  onRun: (command: string) => void;
}

function SegmentView({ segment, onRun }: SegmentViewProps) {
  if (segment.kind === "swatch") {
    return (
      <span className="inline-flex translate-y-[2px] gap-[2px]">
        {segment.colors.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className="inline-block h-3 w-3 rounded-[2px]"
            style={{ backgroundColor: value }}
          />
        ))}
      </span>
    );
  }

  if (segment.kind === "link") {
    return (
      <a
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: color(segment.tone ?? "accent3") }}
      >
        {segment.text}
      </a>
    );
  }

  if (segment.kind === "action") {
    return (
      <button
        type="button"
        onClick={() => onRun(segment.command)}
        className="cursor-pointer text-left underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70"
        style={{ color: color(segment.tone ?? "accent") }}
        title={segment.command}
      >
        {segment.text}
      </button>
    );
  }

  if (segment.badge) {
    return (
      <span
        className="mr-[1px] inline-block rounded-sm border px-[5px] py-[1px] text-[0.85em] leading-normal"
        style={{
          color: color(segment.tone ?? "accent3"),
          borderColor: "var(--term-selection)",
          backgroundColor: "var(--term-bg-alt)",
        }}
      >
        {segment.text}
      </span>
    );
  }

  return (
    <span
      className={segment.bold ? "font-bold" : undefined}
      style={{ color: color(segment.tone) }}
    >
      {segment.text}
    </span>
  );
}

function LineView({
  line,
  onRun,
}: {
  line: Line;
  onRun: (command: string) => void;
}) {
  if (line.length === 0) return <div aria-hidden>&nbsp;</div>;
  return (
    <div className="whitespace-pre-wrap break-words">
      {line.map((segment, index) => (
        <SegmentView key={index} segment={segment} onRun={onRun} />
      ))}
    </div>
  );
}

function BlockView({
  block,
  onRun,
}: {
  block: OutputBlock;
  onRun: (command: string) => void;
}) {
  switch (block.type) {
    case "lines":
      return (
        <div>
          {block.lines.map((line, index) => (
            <LineView key={index} line={line} onRun={onRun} />
          ))}
        </div>
      );

    case "ascii":
      return (
        <pre
          className="overflow-hidden leading-[1.05] font-bold"
          style={{
            color: color(block.tone ?? "accent"),
            fontSize: "clamp(4.5px, 2.55vw, 13px)",
            textShadow: block.glow
              ? "0 0 12px color-mix(in srgb, currentColor 55%, transparent)"
              : undefined,
          }}
        >
          {block.text}
        </pre>
      );

    case "grid":
      return (
        <div className="flex flex-wrap gap-x-6">
          {block.items.map((segment, index) => (
            <SegmentView key={index} segment={segment} onRun={onRun} />
          ))}
        </div>
      );

    case "split":
      return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <pre
            className="shrink-0 leading-[1.15]"
            style={{
              color: color(block.tone ?? "accent"),
              fontSize: "clamp(8px, 2.4vw, 13px)",
            }}
          >
            {block.left}
          </pre>
          <div className="min-w-0 flex-1">
            {block.right.map((line, index) => (
              <LineView key={index} line={line} onRun={onRun} />
            ))}
          </div>
        </div>
      );

    case "card":
      return (
        <div
          className="my-1 rounded-md border px-3 py-2"
          style={{
            borderColor: "var(--term-selection)",
            backgroundColor: "var(--term-bg-alt)",
          }}
        >
          <LineView line={block.title} onRun={onRun} />
          {block.body.map((line, index) => (
            <LineView key={index} line={line} onRun={onRun} />
          ))}
        </div>
      );

    case "prompt":
      return (
        <div className="mt-2 whitespace-pre-wrap break-words">
          <PromptLabel cwd={block.cwd} />
          <span style={{ color: color("fg") }}>{block.command}</span>
        </div>
      );

    case "matrix":
      return <MatrixRain />;
  }
}

export const OutputRenderer = memo(function OutputRenderer({
  blocks,
  onRun,
}: {
  blocks: OutputBlock[];
  onRun: (command: string) => void;
}) {
  return (
    <div className="space-y-0">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} onRun={onRun} />
      ))}
    </div>
  );
});
