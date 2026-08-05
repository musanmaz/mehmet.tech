"use client";

import { displayPath } from "@/lib/terminal/filesystem";

export function PromptLabel({ cwd }: { cwd: string }) {
  return (
    <span className="shrink-0 select-none">
      <span style={{ color: "var(--term-success)" }}>guest</span>
      <span style={{ color: "var(--term-dim)" }}>@</span>
      <span style={{ color: "var(--term-accent2)" }}>mehmet.tech</span>
      <span style={{ color: "var(--term-dim)" }}>:</span>
      <span style={{ color: "var(--term-accent3)" }}>{displayPath(cwd)}</span>
      <span style={{ color: "var(--term-dim)" }}>$ </span>
    </span>
  );
}
