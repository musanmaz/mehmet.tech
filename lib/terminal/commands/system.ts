import { siteConfig } from "@/lib/site";
import { bannerArt } from "../ascii";
import {
  action,
  ascii,
  badge,
  blank,
  dim,
  error,
  lines,
  link,
  strong,
  success,
  swatch,
  txt,
} from "../blocks";
import { findNode, isDir, resolvePath, walkFiles } from "../filesystem";
import { getDict, isLang, langs, type Lang } from "../i18n";
import { isThemeName, themeNames, themes, type ThemeName } from "../themes";
import type { Command, Line, OutputBlock } from "../types";

export function welcomeBlocks(lang: Lang): OutputBlock[] {
  const t = getDict(lang);
  return [
    ascii(bannerArt),
    lines(
      [dim("│ "), txt(siteConfig.name, "accent2"), dim("  ·  "), txt("mehmet.tech", "accent3")],
      [dim("│ "), txt(t.welcomeSub, "dim")],
      blank,
      [
        dim("  "),
        action("help", "help"),
        dim("  ·  "),
        action("ls", "ls"),
        dim("  ·  "),
        action("about", "about"),
        dim("  ·  "),
        action("projects", "projects"),
        dim("  ·  "),
        action("theme", "theme"),
        dim("  ·  "),
        action("contact", "contact"),
      ],
      blank,
      [dim(t.welcomeHint)],
    ),
  ];
}

export const helpCommand: Command = {
  name: "help",
  aliases: ["?", "commands"],
  group: "system",
  usage: "help",
  run: (ctx) => {
    const unique = [...new Set(ctx.commands.values())].filter(
      (command) => !command.hidden,
    );
    const width = Math.max(...unique.map((command) => command.name.length)) + 3;
    const groups: Array<Command["group"]> = ["info", "fs", "system", "fun"];

    const out: Line[] = [[txt(ctx.t.msgs.helpIntro, "dim")], blank];

    for (const group of groups) {
      const members = unique
        .filter((command) => command.group === group)
        .sort((a, b) => a.name.localeCompare(b.name));
      if (members.length === 0) continue;

      out.push([strong(ctx.t.groups[group])]);
      for (const command of members) {
        out.push([
          dim("  "),
          action(command.name, command.name),
          dim(" ".repeat(Math.max(1, width - command.name.length))),
          txt(ctx.t.summaries[command.name] ?? "", "dim"),
        ]);
      }
      out.push(blank);
    }

    out.push([dim(ctx.t.msgs.helpFooter)]);
    return [lines(...out)];
  },
};

export const manCommand: Command = {
  name: "man",
  group: "system",
  usage: "man <command>",
  complete: (ctx) => [...ctx.commands.keys()],
  run: (ctx) => {
    const name = ctx.args[0];
    if (!name) return [error(ctx.t.errors.missingArg("man <command>"))];

    const command = ctx.commands.get(name);
    if (!command) return [error(ctx.t.errors.noManual(name))];

    const out: Line[] = [
      [strong(command.name.toUpperCase()), dim(`  (${ctx.t.groups[command.group]})`)],
      blank,
      [txt(ctx.t.summaries[command.name] ?? "")],
      blank,
      [dim(`${ctx.t.labels.usage}: `), txt(command.usage, "accent3")],
    ];

    if (command.aliases?.length) {
      out.push([
        dim(`${ctx.t.labels.aliases}: `),
        txt(command.aliases.join(", "), "accent2"),
      ]);
    }

    const details = ctx.t.details[command.name];
    if (details) out.push(blank, [txt(details, "dim")]);

    return [lines(...out)];
  },
};

export const themeCommand: Command = {
  name: "theme",
  aliases: ["themes", "colors"],
  group: "system",
  usage: "theme [name|random|next]",
  complete: () => [...themeNames, "random", "next"],
  run: (ctx) => {
    const arg = ctx.args[0];

    if (!arg) {
      const width = Math.max(...themeNames.map((name) => name.length)) + 3;
      const out: Line[] = [[strong(ctx.t.labels.themes)], blank];
      for (const name of themeNames) {
        const theme = themes[name];
        out.push([
          dim("  "),
          swatch([theme.accent, theme.accent2, theme.accent3, theme.fg, theme.bg]),
          txt(" "),
          action(name, `theme ${name}`),
          dim(" ".repeat(Math.max(1, width - name.length))),
          txt(theme.label, "dim"),
          ...(name === ctx.theme
            ? [txt("  "), badge(ctx.t.labels.current, "success")]
            : []),
        ]);
      }
      out.push(blank, [dim(ctx.t.msgs.themePreview)]);
      return [lines(...out)];
    }

    let next: ThemeName;
    if (arg === "random") {
      const pool = themeNames.filter((name) => name !== ctx.theme);
      next = pool[Math.floor(Math.random() * pool.length)];
    } else if (arg === "next") {
      const index = themeNames.indexOf(ctx.theme);
      next = themeNames[(index + 1) % themeNames.length];
    } else if (isThemeName(arg)) {
      next = arg;
    } else {
      return [error(ctx.t.errors.unknownTheme(arg))];
    }

    ctx.setTheme(next);
    return [success(ctx.t.msgs.themeSet(`${next} — ${themes[next].label}`))];
  },
};

export const langCommand: Command = {
  name: "lang",
  aliases: ["language", "dil"],
  group: "system",
  usage: "lang <en|tr>",
  complete: () => [...langs],
  run: (ctx) => {
    const arg = ctx.args[0];
    if (!arg) {
      return [
        lines([
          dim(`${ctx.t.labels.current}: `),
          txt(ctx.lang, "accent"),
          dim("  ·  "),
          ...langs.flatMap((code, index): Line =>
            index === 0
              ? [action(code, `lang ${code}`)]
              : [dim(" / "), action(code, `lang ${code}`)],
          ),
        ]),
      ];
    }

    if (!isLang(arg)) return [error(ctx.t.errors.unknownLang(arg))];
    ctx.setLang(arg);
    return [success(getDict(arg).msgs.langSet)];
  },
};

export const crtCommand: Command = {
  name: "crt",
  group: "system",
  usage: "crt [on|off]",
  complete: () => ["on", "off"],
  run: (ctx) => {
    const arg = ctx.args[0];
    const next = arg === "on" ? true : arg === "off" ? false : !ctx.crt;
    ctx.setCrt(next);
    return [success(next ? ctx.t.msgs.crtOn : ctx.t.msgs.crtOff)];
  },
};

export const clearCommand: Command = {
  name: "clear",
  aliases: ["cls"],
  group: "system",
  usage: "clear",
  run: (ctx) => {
    ctx.clearScreen();
  },
};

export const historyCommand: Command = {
  name: "history",
  group: "system",
  usage: "history [clear]",
  complete: () => ["clear"],
  run: (ctx) => {
    if (ctx.args[0] === "clear") {
      ctx.clearHistory();
      return [success(ctx.t.msgs.historyCleared)];
    }
    if (ctx.history.length === 0) return [lines([dim(ctx.t.msgs.historyEmpty)])];

    return [
      lines(
        ...ctx.history.map((entry, index): Line => [
          dim(`${String(index + 1).padStart(4)}  `),
          action(entry, entry, "fg"),
        ]),
      ),
    ];
  },
};

const openTargets: Record<string, string> = {
  github: siteConfig.socialLinks.github,
  linkedin: siteConfig.socialLinks.linkedin,
  medium: siteConfig.socialLinks.medium,
  x: siteConfig.socialLinks.x,
  twitter: siteConfig.socialLinks.x,
  site: siteConfig.url,
  website: siteConfig.url,
  mail: `mailto:${siteConfig.domains["mehmet.tech"].email}`,
  email: `mailto:${siteConfig.domains["mehmet.tech"].email}`,
};

export const openCommand: Command = {
  name: "open",
  aliases: ["xdg-open", "start"],
  group: "system",
  usage: "open <target|url>",
  complete: (ctx) => [
    ...Object.keys(openTargets),
    ...walkFiles(ctx.root)
      .filter(({ node }) => node.url)
      .map(({ path }) => path),
  ],
  run: (ctx) => {
    const target = ctx.args[0];
    if (!target) return [error(ctx.t.errors.missingArg("open <target>"))];

    const direct =
      openTargets[target.toLowerCase()] ??
      (/^(https?:\/\/|mailto:)/.test(target) ? target : undefined);

    if (direct) {
      ctx.openUrl(direct);
      return [lines([dim(ctx.t.msgs.opening(direct))])];
    }

    const node = findNode(ctx.root, resolvePath(ctx.cwd, target));
    if (node && !isDir(node) && node.url) {
      ctx.openUrl(node.url);
      return [lines([dim(ctx.t.msgs.opening(node.url))])];
    }

    const match = walkFiles(ctx.root).find(
      ({ node: file }) =>
        file.url && file.name.toLowerCase().includes(target.toLowerCase()),
    );
    if (match?.node.url) {
      ctx.openUrl(match.node.url);
      return [lines([dim(ctx.t.msgs.opening(match.node.url))])];
    }

    return [error(ctx.t.errors.nothingToOpen)];
  },
};

export const dateCommand: Command = {
  name: "date",
  group: "system",
  usage: "date",
  run: (ctx) => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat(
      ctx.lang === "tr" ? "tr-TR" : "en-GB",
      {
        dateStyle: "full",
        timeStyle: "medium",
        timeZone: "Europe/Istanbul",
      },
    ).format(now);
    return [lines([txt(formatted), dim("  (Europe/Istanbul)")])];
  },
};

export const echoCommand: Command = {
  name: "echo",
  group: "system",
  usage: "echo <text>",
  run: (ctx) => [lines([txt(ctx.rawArgs)])],
};

export const bannerCommand: Command = {
  name: "banner",
  aliases: ["logo"],
  group: "system",
  usage: "banner",
  run: (ctx) => welcomeBlocks(ctx.lang),
};

export const exitCommand: Command = {
  name: "exit",
  aliases: ["quit", "logout", "back", "site"],
  group: "system",
  usage: "exit",
  run: (ctx) => {
    ctx.leave("/");
    return [
      lines([dim(ctx.t.msgs.leaving)], [link(siteConfig.url, siteConfig.url)]),
    ];
  },
};

export const systemCommands: Command[] = [
  helpCommand,
  manCommand,
  themeCommand,
  langCommand,
  crtCommand,
  clearCommand,
  historyCommand,
  openCommand,
  dateCommand,
  echoCommand,
  bannerCommand,
  exitCommand,
];
