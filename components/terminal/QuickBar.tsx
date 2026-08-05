"use client";

const QUICK_COMMANDS = [
  "help",
  "about",
  "projects",
  "skills",
  "writing",
  "opensource",
  "contact",
  "neofetch",
  "theme",
  "ls",
  "clear",
];

export function QuickBar({ onRun }: { onRun: (command: string) => void }) {
  return (
    <div
      className="flex gap-2 overflow-x-auto border-t px-3 py-2 sm:hidden"
      style={{
        borderColor: "var(--term-selection)",
        backgroundColor: "var(--term-bg-alt)",
        scrollbarWidth: "none",
      }}
    >
      {QUICK_COMMANDS.map((command) => (
        <button
          key={command}
          type="button"
          onClick={() => onRun(command)}
          className="shrink-0 rounded-full border px-3 py-1 text-xs"
          style={{
            borderColor: "var(--term-selection)",
            color: "var(--term-accent)",
          }}
        >
          {command}
        </button>
      ))}
    </div>
  );
}
