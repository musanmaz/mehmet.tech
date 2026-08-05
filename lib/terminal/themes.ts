export interface TerminalTheme {
  label: string;
  bg: string;
  bgAlt: string;
  fg: string;
  dim: string;
  accent: string;
  accent2: string;
  accent3: string;
  success: string;
  warn: string;
  error: string;
  selection: string;
  caret: string;
}

export const themes = {
  matrix: {
    label: "Matrix — classic phosphor green",
    bg: "#050a05",
    bgAlt: "#0a120a",
    fg: "#7ee787",
    dim: "#3f7a45",
    accent: "#39ff14",
    accent2: "#25c95a",
    accent3: "#a5f3a0",
    success: "#39ff14",
    warn: "#d7ff5e",
    error: "#ff5f56",
    selection: "#1d3b21",
    caret: "#39ff14",
  },
  "tokyo-night": {
    label: "Tokyo Night — cool blue dusk",
    bg: "#1a1b26",
    bgAlt: "#16161e",
    fg: "#c0caf5",
    dim: "#6d78a3",
    accent: "#7aa2f7",
    accent2: "#bb9af7",
    accent3: "#7dcfff",
    success: "#9ece6a",
    warn: "#e0af68",
    error: "#f7768e",
    selection: "#283457",
    caret: "#7aa2f7",
  },
  dracula: {
    label: "Dracula — purple night",
    bg: "#282a36",
    bgAlt: "#21222c",
    fg: "#f8f8f2",
    dim: "#7684b4",
    accent: "#bd93f9",
    accent2: "#ff79c6",
    accent3: "#8be9fd",
    success: "#50fa7b",
    warn: "#f1fa8c",
    error: "#ff5555",
    selection: "#44475a",
    caret: "#ff79c6",
  },
  nord: {
    label: "Nord — arctic frost",
    bg: "#2e3440",
    bgAlt: "#272c36",
    fg: "#d8dee9",
    dim: "#7b88a1",
    accent: "#88c0d0",
    accent2: "#b48ead",
    accent3: "#81a1c1",
    success: "#a3be8c",
    warn: "#ebcb8b",
    error: "#bf616a",
    selection: "#434c5e",
    caret: "#88c0d0",
  },
  gruvbox: {
    label: "Gruvbox — warm retro",
    bg: "#282828",
    bgAlt: "#1d2021",
    fg: "#ebdbb2",
    dim: "#a89984",
    accent: "#fabd2f",
    accent2: "#d3869b",
    accent3: "#83a598",
    success: "#b8bb26",
    warn: "#fe8019",
    error: "#fb4934",
    selection: "#3c3836",
    caret: "#fabd2f",
  },
  "catppuccin-mocha": {
    label: "Catppuccin Mocha — soft pastel",
    bg: "#1e1e2e",
    bgAlt: "#181825",
    fg: "#cdd6f4",
    dim: "#7f849c",
    accent: "#cba6f7",
    accent2: "#f5c2e7",
    accent3: "#89dceb",
    success: "#a6e3a1",
    warn: "#f9e2af",
    error: "#f38ba8",
    selection: "#313244",
    caret: "#f5e0dc",
  },
  "solarized-light": {
    label: "Solarized Light — daylight mode",
    bg: "#fdf6e3",
    bgAlt: "#eee8d5",
    fg: "#586e75",
    dim: "#93a1a1",
    accent: "#268bd2",
    accent2: "#d33682",
    accent3: "#2aa198",
    success: "#859900",
    warn: "#b58900",
    error: "#dc322f",
    selection: "#e4ddc6",
    caret: "#073642",
  },
  amber: {
    label: "Amber — vintage CRT terminal",
    bg: "#140c00",
    bgAlt: "#1d1200",
    fg: "#ffb000",
    dim: "#9a6b00",
    accent: "#ffcc33",
    accent2: "#ff9d00",
    accent3: "#ffe4a1",
    success: "#ffd166",
    warn: "#ffcc33",
    error: "#ff5f1f",
    selection: "#3a2600",
    caret: "#ffcc33",
  },
  synthwave: {
    label: "Synthwave — neon sunset",
    bg: "#241b2f",
    bgAlt: "#1a1425",
    fg: "#f4eee4",
    dim: "#9a86bd",
    accent: "#ff7edb",
    accent2: "#36f9f6",
    accent3: "#fede5d",
    success: "#72f1b8",
    warn: "#fede5d",
    error: "#fe4450",
    selection: "#423365",
    caret: "#36f9f6",
  },
  mono: {
    label: "Mono — pure monochrome",
    bg: "#0a0a0a",
    bgAlt: "#141414",
    fg: "#e5e5e5",
    dim: "#7a7a7a",
    accent: "#ffffff",
    accent2: "#c8c8c8",
    accent3: "#9a9a9a",
    success: "#f0f0f0",
    warn: "#c8c8c8",
    error: "#ffffff",
    selection: "#2a2a2a",
    caret: "#ffffff",
  },
} as const satisfies Record<string, TerminalTheme>;

export type ThemeName = keyof typeof themes;

export const themeNames = Object.keys(themes) as ThemeName[];

export const defaultTheme: ThemeName = "matrix";

export function isThemeName(value: string): value is ThemeName {
  return Object.prototype.hasOwnProperty.call(themes, value);
}

/** CSS custom properties consumed by the terminal components. */
export function themeVars(name: ThemeName): Record<string, string> {
  const t = themes[name];
  return {
    "--term-bg": t.bg,
    "--term-bg-alt": t.bgAlt,
    "--term-fg": t.fg,
    "--term-dim": t.dim,
    "--term-accent": t.accent,
    "--term-accent2": t.accent2,
    "--term-accent3": t.accent3,
    "--term-success": t.success,
    "--term-warn": t.warn,
    "--term-error": t.error,
    "--term-selection": t.selection,
    "--term-caret": t.caret,
  };
}
