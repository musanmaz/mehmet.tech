import { defaultLang, isLang, type Lang } from "./i18n";
import { defaultTheme, isThemeName, type ThemeName } from "./themes";

export interface Preferences {
  /** False until the values stored in the browser have been read. */
  ready: boolean;
  theme: ThemeName;
  lang: Lang;
  crt: boolean;
  history: string[];
}

const KEYS = {
  theme: "mehsh:theme",
  lang: "mehsh:lang",
  crt: "mehsh:crt",
  history: "mehsh:history",
} as const;

const HISTORY_LIMIT = 120;

const serverSnapshot: Preferences = {
  ready: false,
  theme: defaultTheme,
  lang: defaultLang,
  crt: false,
  history: [],
};

let snapshot: Preferences = serverSnapshot;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function update(patch: Partial<Preferences>) {
  snapshot = { ...snapshot, ...patch };
  emit();
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // private mode and blocked storage keep preferences in memory only
  }
}

function readHistory(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string")
      : [];
  } catch {
    return [];
  }
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;

  const next: Preferences = { ...snapshot, ready: true };
  try {
    const storedTheme = window.localStorage.getItem(KEYS.theme);
    if (storedTheme && isThemeName(storedTheme)) next.theme = storedTheme;

    const queryLang = new URLSearchParams(window.location.search).get("lang");
    const storedLang = queryLang ?? window.localStorage.getItem(KEYS.lang);
    if (storedLang && isLang(storedLang)) next.lang = storedLang;

    next.crt = window.localStorage.getItem(KEYS.crt) === "1";
    next.history = readHistory(window.localStorage.getItem(KEYS.history));
  } catch {
    // ignore unavailable storage
  }

  snapshot = next;
  emit();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  hydrate();
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): Preferences {
  return snapshot;
}

export function getServerSnapshot(): Preferences {
  return serverSnapshot;
}

export function setThemePreference(theme: ThemeName) {
  update({ theme });
  write(KEYS.theme, theme);
}

export function setLangPreference(lang: Lang) {
  update({ lang });
  write(KEYS.lang, lang);
}

export function setCrtPreference(crt: boolean) {
  update({ crt });
  write(KEYS.crt, crt ? "1" : "0");
}

export function pushHistoryPreference(command: string) {
  const { history } = snapshot;
  if (history[history.length - 1] === command) return;
  const next = [...history, command].slice(-HISTORY_LIMIT);
  update({ history: next });
  write(KEYS.history, JSON.stringify(next));
}

export function clearHistoryPreference() {
  update({ history: [] });
  write(KEYS.history, "[]");
}
