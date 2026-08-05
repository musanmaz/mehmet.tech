import { siteConfig } from "@/lib/site";
import { logoArt } from "../ascii";
import {
  action,
  badge,
  blank,
  dim,
  error,
  link,
  lines,
  strong,
  swatch,
  txt,
} from "../blocks";
import { findNode, isDir, slugify, walkFiles } from "../filesystem";
import { themes } from "../themes";
import type { Command, CommandContext, Line, OutputBlock } from "../types";

const sessionStart = Date.now();

function fileBlocks(ctx: CommandContext, path: string): OutputBlock[] {
  const node = findNode(ctx.root, path);
  if (!node || isDir(node)) return [error(ctx.t.errors.noSuchFile(path))];
  return node.blocks;
}

function padTo(value: string, width: number): string {
  return value.length >= width ? value : value.padEnd(width);
}

/** Trailing spaces rendered separately so links do not carry an underline. */
function gap(value: string, width: number): string {
  return " ".repeat(Math.max(1, width - value.length));
}

export const whoamiCommand: Command = {
  name: "whoami",
  aliases: ["me"],
  group: "info",
  usage: "whoami",
  run: (ctx) => fileBlocks(ctx, "/whoami.txt"),
};

export const aboutCommand: Command = {
  name: "about",
  aliases: ["intro"],
  group: "info",
  usage: "about",
  run: (ctx) => fileBlocks(ctx, "/about.md"),
};

export const projectsCommand: Command = {
  name: "projects",
  aliases: ["work"],
  group: "info",
  usage: "projects [--all]",
  run: (ctx) => {
    const all = ctx.args.includes("--all") || ctx.args.includes("-a");
    const width =
      Math.max(...siteConfig.featuredProjects.map((p) => p.name.length)) + 2;

    const out: Line[] = [
      [strong(ctx.t.labels.featuredProjects)],
      blank,
      ...siteConfig.featuredProjects.map((project): Line => [
        dim("  "),
        action(
          project.name,
          `cat /projects/featured/${slugify(project.name)}.md`,
        ),
        dim(gap(project.name, width)),
        txt(project.description, "dim"),
      ]),
    ];

    if (all) {
      for (const [category, projects] of Object.entries(
        siteConfig.otherProjects,
      )) {
        const catWidth = Math.max(...projects.map((p) => p.name.length)) + 2;
        out.push(blank, [strong(category, "accent2")], blank);
        for (const project of projects) {
          out.push([
            dim("  "),
            action(
              project.name,
              `cat /projects/other/${slugify(category)}/${slugify(project.name)}.md`,
            ),
            dim(gap(project.name, catWidth)),
            txt(project.description, "dim"),
          ]);
        }
      }
    } else {
      const otherCount = Object.values(siteConfig.otherProjects).reduce(
        (total, group) => total + group.length,
        0,
      );
      out.push(blank, [
        dim(`+ ${otherCount} ${ctx.t.labels.otherProjects.toLowerCase()} — `),
        action("projects --all", "projects --all"),
      ]);
    }

    out.push(blank, [dim(ctx.t.msgs.projectsHint)]);
    return [lines(...out)];
  },
};

export const projectCommand: Command = {
  name: "project",
  group: "info",
  usage: "project <name>",
  complete: () =>
    siteConfig.featuredProjects.map((project) => slugify(project.name)),
  run: (ctx) => {
    const query = slugify(ctx.args.join(" "));
    if (!query) return [error(ctx.t.errors.missingArg("project <name>"))];

    const candidates = walkFiles(ctx.root).filter(({ path }) =>
      path.startsWith("/projects/"),
    );
    const match =
      candidates.find(({ node }) => node.name === `${query}.md`) ??
      candidates.find(({ node }) => node.name.includes(query));

    if (!match) return [error(ctx.t.errors.unknownProject(ctx.args.join(" ")))];
    return match.node.blocks;
  },
};

export const skillsCommand: Command = {
  name: "skills",
  aliases: ["stack", "tech"],
  group: "info",
  usage: "skills",
  run: (ctx) => {
    const out: Line[] = [[strong(ctx.t.labels.skills)], blank];
    for (const [category, items] of Object.entries(siteConfig.techFocus)) {
      out.push([txt(category, "accent2", { bold: true })]);
      const line: Line = [];
      items.forEach((item, index) => {
        if (index > 0) line.push(txt(" "));
        line.push(badge(item));
      });
      out.push(line, blank);
    }
    return [lines(...out)];
  },
};

export const writingCommand: Command = {
  name: "writing",
  aliases: ["blog", "articles", "posts"],
  group: "info",
  usage: "writing",
  run: (ctx) => {
    const out: Line[] = [[strong(ctx.t.labels.writing)], blank];
    siteConfig.writing.forEach((article, index) => {
      out.push([
        dim(`  ${String(index + 1).padStart(2, "0")}  `),
        link(article.title, article.url, "accent"),
      ]);
    });
    out.push(blank, [dim("medium.com/@musanmaz")]);
    return [lines(...out)];
  },
};

export const openSourceCommand: Command = {
  name: "opensource",
  aliases: ["oss", "github"],
  group: "info",
  usage: "opensource",
  run: (ctx) => {
    const out: Line[] = [
      [strong(ctx.t.labels.openSource)],
      blank,
      [txt(ctx.t.labels.contributions, "accent2", { bold: true })],
    ];

    for (const item of siteConfig.orgContributions) {
      out.push([
        dim("  • "),
        link(item.name, item.repo, "accent"),
        dim(" — "),
        txt(item.description, "dim"),
      ]);
    }

    out.push(blank, [
      txt(`${ctx.t.labels.forks} (${siteConfig.forks.length})`, "accent2", {
        bold: true,
      }),
    ]);

    const forkLine: Line = [dim("  ")];
    siteConfig.forks.forEach((fork, index) => {
      if (index > 0) forkLine.push(txt(" "));
      forkLine.push(badge(fork.name));
    });
    out.push(forkLine, blank, [
      dim("→ "),
      action("cat /opensource/forks.txt", "cat /opensource/forks.txt"),
    ]);

    return [lines(...out)];
  },
};

export const contactCommand: Command = {
  name: "contact",
  aliases: ["reach", "hire"],
  group: "info",
  usage: "contact",
  run: (ctx) => {
    const out: Line[] = [[strong(ctx.t.labels.contact)], blank];

    out.push([txt(ctx.t.labels.emails, "accent2", { bold: true })]);
    for (const entry of siteConfig.emails) {
      out.push([
        dim("  • "),
        link(entry.address, `mailto:${entry.address}`, "accent"),
        dim("  — "),
        txt(entry.label, "dim"),
      ]);
    }

    out.push(blank, [txt(ctx.t.labels.social, "accent2", { bold: true })]);
    for (const [platform, url] of Object.entries(siteConfig.socialLinks)) {
      out.push([dim("  • "), txt(padTo(platform, 10), "fg"), link(url, url)]);
    }

    out.push(blank, [txt(ctx.t.msgs.contactCta, "dim")]);
    return [lines(...out)];
  },
};

export const emailCommand: Command = {
  name: "email",
  aliases: ["mail"],
  group: "info",
  usage: "email",
  run: (ctx) => fileBlocks(ctx, "/contact/emails.txt"),
};

export const socialCommand: Command = {
  name: "social",
  aliases: ["links"],
  group: "info",
  usage: "social",
  run: (ctx) => fileBlocks(ctx, "/contact/social.txt"),
};

function uptime(): string {
  const seconds = Math.floor((Date.now() - sessionStart) / 1000);
  const minutes = Math.floor(seconds / 60);
  return minutes > 0 ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
}

export const neofetchCommand: Command = {
  name: "neofetch",
  aliases: ["fetch", "sysinfo"],
  group: "info",
  usage: "neofetch",
  run: (ctx) => {
    const theme = themes[ctx.theme];
    const otherCount = Object.values(siteConfig.otherProjects).reduce(
      (total, group) => total + group.length,
      0,
    );
    const techCount = Object.values(siteConfig.techFocus).reduce(
      (total, group) => total + group.length,
      0,
    );
    const pad = 11;

    const row = (label: string, value: Line): Line => [
      dim(padTo(`${label}`, pad)),
      ...value,
    ];

    const right: Line[] = [
      [strong("mehmet"), dim("@"), strong("mehmet.tech")],
      [dim("─".repeat(28))],
      row("OS", [txt("mehsh 2.6.0 (web)")]),
      row(ctx.t.labels.role, [txt(siteConfig.hero.role, "accent2")]),
      row(ctx.t.labels.location, [txt("Istanbul, Turkey")]),
      row(ctx.t.labels.uptime, [txt(uptime())]),
      row("Projects", [
        txt(`${siteConfig.featuredProjects.length} featured`),
        dim(` · ${otherCount} other`),
      ]),
      row("Stack", [txt(`${techCount} technologies`)]),
      row(ctx.t.labels.writing, [txt(`${siteConfig.writing.length} articles`)]),
      row("Theme", [
        txt(ctx.theme, "accent"),
        dim(` · ${ctx.lang.toUpperCase()}`),
      ]),
      row("Contact", [
        link(siteConfig.domains["mehmet.tech"].email, `mailto:${siteConfig.domains["mehmet.tech"].email}`),
      ]),
      [],
      [
        swatch([
          theme.fg,
          theme.dim,
          theme.accent,
          theme.accent2,
          theme.accent3,
          theme.success,
          theme.warn,
          theme.error,
        ]),
      ],
    ];

    return [{ type: "split", left: logoArt, right, tone: "accent" }];
  },
};

export const infoCommands: Command[] = [
  whoamiCommand,
  aboutCommand,
  projectsCommand,
  projectCommand,
  skillsCommand,
  writingCommand,
  openSourceCommand,
  contactCommand,
  emailCommand,
  socialCommand,
  neofetchCommand,
];
