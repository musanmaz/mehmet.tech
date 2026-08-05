"use client";

import { useSyncExternalStore } from "react";
import {
  clearHistoryPreference,
  getServerSnapshot,
  getSnapshot,
  pushHistoryPreference,
  setCrtPreference,
  setLangPreference,
  setThemePreference,
  subscribe,
} from "@/lib/terminal/preferences";

/**
 * Terminal preferences (theme, language, CRT effect, command history) backed by
 * localStorage. Reads happen through an external store so the first paint stays
 * identical on the server and the client.
 */
export function useTerminalPersistence() {
  const preferences = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    ready: preferences.ready,
    theme: preferences.theme,
    lang: preferences.lang,
    crt: preferences.crt,
    commandHistory: preferences.history,
    setTheme: setThemePreference,
    setLang: setLangPreference,
    setCrt: setCrtPreference,
    pushHistory: pushHistoryPreference,
    clearHistory: clearHistoryPreference,
  };
}
