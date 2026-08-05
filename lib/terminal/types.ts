import type { ThemeName } from "./themes";
import type { Dict, Lang } from "./i18n";

export type Tone =
  | "fg"
  | "dim"
  | "accent"
  | "accent2"
  | "accent3"
  | "success"
  | "warn"
  | "error";

export type Segment =
  | {
      kind: "text";
      text: string;
      tone?: Tone;
      bold?: boolean;
      badge?: boolean;
    }
  | { kind: "link"; text: string; href: string; tone?: Tone }
  | { kind: "action"; text: string; command: string; tone?: Tone }
  | { kind: "swatch"; colors: string[] };

export type Line = Segment[];

export type OutputBlock =
  | { type: "lines"; lines: Line[] }
  | { type: "ascii"; text: string; tone?: Tone; glow?: boolean }
  | { type: "grid"; items: Segment[] }
  | { type: "card"; title: Line; body: Line[]; accent?: Tone }
  | { type: "split"; left: string; right: Line[]; tone?: Tone }
  | { type: "prompt"; cwd: string; command: string }
  | { type: "matrix" };

export interface HistoryEntry {
  id: number;
  blocks: OutputBlock[];
}

export type FsFile = {
  type: "file";
  name: string;
  /** Rendered `cat` output. */
  blocks: OutputBlock[];
  /** Flattened plain text, used by `grep`. */
  search: string;
  /** Primary external URL, used by `open`. */
  url?: string;
  size: number;
};

export type FsDir = {
  type: "dir";
  name: string;
  children: FsNode[];
};

export type FsNode = FsFile | FsDir;

export interface CommandContext {
  /** Arguments after the command name, quotes already stripped. */
  args: string[];
  /** Raw argument string, preserved verbatim (used by `echo`). */
  rawArgs: string;
  /** Absolute working directory, e.g. `/projects/featured`. */
  cwd: string;
  /** Directory visited before the current one, used by `cd -`. */
  prevCwd: string;
  lang: Lang;
  t: Dict;
  theme: ThemeName;
  crt: boolean;
  root: FsDir;
  history: string[];
  commands: CommandRegistry;
  setCwd: (path: string) => void;
  setLang: (lang: Lang) => void;
  setTheme: (theme: ThemeName) => void;
  setCrt: (on: boolean) => void;
  clearScreen: () => void;
  clearHistory: () => void;
  openUrl: (url: string) => void;
  leave: (path: string) => void;
}

export interface Command {
  name: string;
  /** Alternative names resolved to this command. */
  aliases?: string[];
  /** i18n key under `t.help.commands` used for the one-line summary. */
  group: "fs" | "info" | "system" | "fun";
  usage: string;
  /** Hidden from `help`, still runnable. */
  hidden?: boolean;
  run: (ctx: CommandContext) => OutputBlock[] | void;
  /** Extra completion candidates for the first argument. */
  complete?: (ctx: CommandContext, token: string) => string[];
}

export type CommandRegistry = Map<string, Command>;
