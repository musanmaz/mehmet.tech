"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useTerminalPersistence } from "@/hooks/useTerminalPersistence";
import { action, dim, error, grid, lines, txt } from "@/lib/terminal/blocks";
import {
  parseInput,
  registry,
  suggestCommand,
  welcomeBlocks,
} from "@/lib/terminal/commands";
import { complete } from "@/lib/terminal/complete";
import { getFileSystem } from "@/lib/terminal/filesystem";
import { getDict } from "@/lib/terminal/i18n";
import { getSnapshot } from "@/lib/terminal/preferences";
import { themeVars } from "@/lib/terminal/themes";
import type {
  CommandContext,
  HistoryEntry,
  OutputBlock,
} from "@/lib/terminal/types";
import { OutputRenderer } from "./OutputRenderer";
import { PromptLine } from "./PromptLine";
import { QuickBar } from "./QuickBar";

const MAX_BLOCKS = 500;
const BOOT_STEP_MS = 110;
const BOOTED_KEY = "mehsh:booted";

function trimEntries(entries: HistoryEntry[]): HistoryEntry[] {
  let total = entries.reduce((sum, entry) => sum + entry.blocks.length, 0);
  if (total <= MAX_BLOCKS) return entries;

  const kept = [...entries];
  while (total > MAX_BLOCKS && kept.length > 1) {
    total -= kept[0].blocks.length;
    kept.shift();
  }
  return kept;
}

export function TerminalShell() {
  const router = useRouter();
  const {
    ready,
    theme,
    setTheme,
    lang,
    setLang,
    crt,
    setCrt,
    commandHistory,
    pushHistory,
    clearHistory,
  } = useTerminalPersistence();

  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [caret, setCaret] = useState(0);
  const [focused, setFocused] = useState(false);
  const [cwd, setCwd] = useState("/");
  const [prevCwd, setPrevCwd] = useState("/");
  const [historyCursor, setHistoryCursor] = useState<number | null>(null);
  const [booted, setBooted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const bootTimers = useRef<number[]>([]);
  const bootStarted = useRef(false);
  const bootedRef = useRef(false);
  const deepLinkRun = useRef(false);

  const t = useMemo(() => getDict(lang), [lang]);

  const appendEntry = useCallback((blocks: OutputBlock[]) => {
    if (blocks.length === 0) return;
    idRef.current += 1;
    const entry: HistoryEntry = { id: idRef.current, blocks };
    setEntries((previous) => trimEntries([...previous, entry]));
  }, []);

  const buildContext = useCallback(
    (args: string[], rawArgs: string, onClear: () => void): CommandContext => {
      // Read the live preferences instead of the render-time copy so chained
      // commands (deep links, rapid clicks) see each other's side effects.
      const preferences = getSnapshot();

      return {
        args,
        rawArgs,
        cwd,
        prevCwd,
        lang: preferences.lang,
        t: getDict(preferences.lang),
        theme: preferences.theme,
        crt: preferences.crt,
        root: getFileSystem(preferences.lang),
        history: preferences.history,
        commands: registry,
        setCwd: (path) => {
          setPrevCwd(cwd);
          setCwd(path);
        },
        setLang,
        setTheme,
        setCrt,
        clearScreen: onClear,
        clearHistory,
        openUrl: (url) => window.open(url, "_blank", "noopener,noreferrer"),
        leave: (path) => {
          window.setTimeout(() => router.push(path), 400);
        },
      };
    },
    [clearHistory, cwd, prevCwd, router, setCrt, setLang, setTheme],
  );

  const runCommand = useCallback(
    (raw: string, echo = true) => {
      const blocks: OutputBlock[] = [];
      if (echo) blocks.push({ type: "prompt", cwd, command: raw });

      const parsed = parseInput(raw);
      if (!parsed) {
        appendEntry(blocks);
        return;
      }

      pushHistory(raw.trim());

      const command = registry.get(parsed.name);
      if (!command) {
        blocks.push(error(t.errors.notFound(parsed.name)));
        const suggestion = suggestCommand(parsed.name);
        if (suggestion) {
          blocks.push(
            lines([
              dim(`${t.errors.didYouMean(suggestion)} `),
              action(suggestion, suggestion),
            ]),
          );
        }
        appendEntry(blocks);
        return;
      }

      let cleared = false;
      const context = buildContext(parsed.args, parsed.rawArgs, () => {
        cleared = true;
      });

      let result: OutputBlock[] | void;
      try {
        result = command.run(context);
      } catch {
        result = [error("internal error while running the command")];
      }

      if (cleared) {
        setEntries([]);
        return;
      }
      if (result) blocks.push(...result);
      appendEntry(blocks);
    },
    [appendEntry, buildContext, cwd, pushHistory, t],
  );

  const runRef = useRef(runCommand);
  useEffect(() => {
    runRef.current = runCommand;
  }, [runCommand]);

  const stableRun = useCallback((command: string) => {
    runRef.current(command);
    inputRef.current?.focus();
  }, []);

  const finishBoot = useCallback(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    bootTimers.current.forEach((timer) => window.clearTimeout(timer));
    bootTimers.current = [];
    idRef.current += 1;
    setEntries([
      {
        id: idRef.current,
        blocks: [
          lines(...t.boot.map((line) => [dim(line)])),
          lines([txt(t.bootReady, "success")]),
          ...welcomeBlocks(lang),
        ],
      },
    ]);
    setBooted(true);
    try {
      window.sessionStorage.setItem(BOOTED_KEY, "1");
    } catch {
      // session storage is optional
    }
  }, [lang, t]);

  useEffect(() => {
    if (!ready || bootStarted.current) return;
    bootStarted.current = true;

    let skipAnimation = false;
    try {
      skipAnimation = window.sessionStorage.getItem(BOOTED_KEY) === "1";
    } catch {
      skipAnimation = false;
    }

    if (skipAnimation) {
      finishBoot();
      return;
    }

    t.boot.forEach((line, index) => {
      bootTimers.current.push(
        window.setTimeout(
          () => appendEntry([lines([dim(line)])]),
          BOOT_STEP_MS * (index + 1),
        ),
      );
    });

    bootTimers.current.push(
      window.setTimeout(
        () => {
          appendEntry([lines([txt(t.bootReady, "success")], [])]);
          appendEntry(welcomeBlocks(lang));
          bootedRef.current = true;
          setBooted(true);
          try {
            window.sessionStorage.setItem(BOOTED_KEY, "1");
          } catch {
            // ignore
          }
        },
        BOOT_STEP_MS * (t.boot.length + 2),
      ),
    );
  }, [appendEntry, finishBoot, lang, ready, t]);

  useEffect(() => {
    const timers = bootTimers.current;
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  // Deep links such as /terminal?cmd=projects;theme%20nord run on arrival.
  useEffect(() => {
    if (!booted || deepLinkRun.current) return;
    deepLinkRun.current = true;

    const requested = new URLSearchParams(window.location.search).get("cmd");
    if (!requested) return;

    requested
      .split(";")
      .map((command) => command.trim())
      .filter(Boolean)
      .slice(0, 5)
      .forEach((command) => runRef.current(command));
  }, [booted]);

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (finePointer) inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!bootedRef.current) finishBoot();
      // Leave browser shortcuts and Tab navigation alone.
      if (event.metaKey || event.altKey || event.ctrlKey) return;
      if (event.key === "Tab") return;
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [finishBoot]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [entries, input]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const syncCaret = useCallback(() => {
    const element = inputRef.current;
    if (element) setCaret(element.selectionStart ?? element.value.length);
  }, []);

  const setInputValue = useCallback((value: string, position?: number) => {
    setInput(value);
    const next = position ?? value.length;
    setCaret(next);
    requestAnimationFrame(() => {
      inputRef.current?.setSelectionRange(next, next);
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!booted) {
        event.preventDefault();
        finishBoot();
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        setEntries([]);
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "c") {
        event.preventDefault();
        appendEntry([{ type: "prompt", cwd, command: `${input}^C` }]);
        setInputValue("");
        setHistoryCursor(null);
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "u") {
        event.preventDefault();
        setInputValue("");
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setInputValue(input.slice(0, caret), caret);
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setInputValue(input, 0);
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === "e") {
        event.preventDefault();
        setInputValue(input, input.length);
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        const context = buildContext([], "", () => {});
        const completion = complete(input, context);
        if (completion.candidates.length > 1) {
          appendEntry([
            { type: "prompt", cwd, command: input },
            grid(
              completion.candidates.map((candidate) =>
                txt(candidate, "accent3"),
              ),
            ),
          ]);
        }
        if (completion.value !== input) setInputValue(completion.value);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (commandHistory.length === 0) return;
        const next =
          historyCursor === null
            ? commandHistory.length - 1
            : Math.max(0, historyCursor - 1);
        setHistoryCursor(next);
        setInputValue(commandHistory[next]);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyCursor === null) return;
        const next = historyCursor + 1;
        if (next >= commandHistory.length) {
          setHistoryCursor(null);
          setInputValue("");
          return;
        }
        setHistoryCursor(next);
        setInputValue(commandHistory[next]);
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const value = input;
        setInputValue("");
        setHistoryCursor(null);
        runCommand(value);
      }
    },
    [
      appendEntry,
      booted,
      buildContext,
      caret,
      commandHistory,
      cwd,
      finishBoot,
      historyCursor,
      input,
      runCommand,
      setInputValue,
    ],
  );

  const handleSurfaceClick = useCallback(() => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={`terminal-root fixed inset-0 flex flex-col font-mono text-[13px] leading-relaxed sm:text-sm ${
        crt ? "terminal-crt" : ""
      }`}
      style={{
        ...themeVars(theme),
        backgroundColor: "var(--term-bg)",
        color: "var(--term-fg)",
      }}
    >
      <header
        className="flex shrink-0 items-center gap-3 border-b px-3 py-2 text-xs"
        style={{
          borderColor: "var(--term-selection)",
          backgroundColor: "var(--term-bg-alt)",
        }}
      >
        <span className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--term-error)" }} />
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--term-warn)" }} />
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "var(--term-success)" }} />
        </span>
        <span className="truncate" style={{ color: "var(--term-dim)" }}>
          guest@mehmet.tech — mehsh
        </span>
        <span className="ml-auto flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => stableRun("theme")}
            className="rounded border px-2 py-0.5 transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--term-selection)", color: "var(--term-accent)" }}
          >
            {theme}
          </button>
          <button
            type="button"
            onClick={() => stableRun(`lang ${lang === "en" ? "tr" : "en"}`)}
            className="rounded border px-2 py-0.5 uppercase transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--term-selection)", color: "var(--term-accent2)" }}
          >
            {lang}
          </button>
          <button
            type="button"
            onClick={() => stableRun("crt")}
            className="hidden rounded border px-2 py-0.5 transition-opacity hover:opacity-70 sm:block"
            style={{
              borderColor: "var(--term-selection)",
              color: crt ? "var(--term-accent3)" : "var(--term-dim)",
            }}
          >
            crt
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded border px-2 py-0.5 transition-opacity hover:opacity-70"
            style={{ borderColor: "var(--term-selection)", color: "var(--term-dim)" }}
          >
            exit
          </button>
        </span>
      </header>

      <div
        ref={scrollRef}
        onClick={handleSurfaceClick}
        className="terminal-scroll relative flex-1 overflow-y-auto px-3 py-3 sm:px-5 sm:py-4"
      >
        <div role="log" aria-live="polite" aria-atomic="false">
          {entries.map((entry) => (
            <OutputRenderer key={entry.id} blocks={entry.blocks} onRun={stableRun} />
          ))}
        </div>

        <PromptLine
          cwd={cwd}
          value={input}
          caret={caret}
          focused={focused}
          inputRef={inputRef}
          onChange={setInput}
          onKeyDown={handleKeyDown}
          onSelectionChange={syncCaret}
          onFocusChange={setFocused}
        />
      </div>

      <QuickBar onRun={stableRun} />
    </div>
  );
}
