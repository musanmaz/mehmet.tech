"use client";

import type { KeyboardEvent, RefObject } from "react";
import { PromptLabel } from "./PromptLabel";

interface PromptLineProps {
  cwd: string;
  value: string;
  caret: number;
  focused: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSelectionChange: () => void;
  onFocusChange: (focused: boolean) => void;
}

export function PromptLine({
  cwd,
  value,
  caret,
  focused,
  inputRef,
  onChange,
  onKeyDown,
  onSelectionChange,
  onFocusChange,
}: PromptLineProps) {
  const position = Math.min(caret, value.length);
  const before = value.slice(0, position);
  const current = value.slice(position, position + 1) || " ";
  const after = value.slice(position + 1);

  return (
    <div className="relative mt-2">
      <label className="flex flex-wrap items-start" htmlFor="terminal-input">
        <PromptLabel cwd={cwd} />
        <span className="whitespace-pre-wrap break-all" style={{ color: "var(--term-fg)" }}>
          {before}
          <span
            className={focused ? "terminal-caret" : "terminal-caret-idle"}
            style={{
              backgroundColor: focused ? "var(--term-caret)" : "transparent",
              color: focused ? "var(--term-bg)" : "var(--term-caret)",
              outline: focused ? "none" : "1px solid var(--term-caret)",
            }}
          >
            {current}
          </span>
          {after}
        </span>
      </label>

      <input
        id="terminal-input"
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        onKeyUp={onSelectionChange}
        onClick={onSelectionChange}
        onSelect={onSelectionChange}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        className="absolute inset-0 h-full w-full cursor-text bg-transparent opacity-0 outline-none"
        style={{ fontSize: 16 }}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Terminal input"
      />
    </div>
  );
}
