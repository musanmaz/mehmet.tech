import { siteConfig } from "@/lib/site";
import {
  action,
  badge,
  blank,
  blocksToText,
  dim,
  link,
  lines,
  strong,
  txt,
} from "./blocks";
import { getDict, type Lang } from "./i18n";
import type { FsDir, FsFile, FsNode, Line, OutputBlock, Segment } from "./types";

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function file(
  name: string,
  blocks: OutputBlock[],
  url?: string,
): FsFile {
  const search = `${name}\n${blocksToText(blocks)}`;
  return { type: "file", name, blocks, search, url, size: search.length };
}

function dir(name: string, children: FsNode[]): FsDir {
  return { type: "dir", name, children };
}

function section(label: string, body: Line[]): Line[] {
  return [[dim(label.toUpperCase())], ...body, blank];
}

function badgeLine(items: readonly string[]): Line {
  const out: Segment[] = [];
  items.forEach((item, index) => {
    if (index > 0) out.push(txt(" "));
    out.push(badge(item));
  });
  return out;
}

function linkLine(label: string, url: string, pad: number): Line {
  return [dim(`${label}:`.padEnd(pad)), link(url, url)];
}

interface FeaturedProject {
  name: string;
  url?: string;
  repo?: string;
  description: string;
  problem: string;
  techStack: readonly string[];
  useCase: string;
}

function projectFile(project: FeaturedProject, lang: Lang): FsFile {
  const t = getDict(lang);
  const pad = Math.max(t.labels.live.length, t.labels.repo.length) + 3;
  const body: Line[] = [
    [strong(project.name), dim("  ·  "), txt(t.labels.featuredProjects.toLowerCase(), "dim")],
    blank,
    [txt(project.description)],
    blank,
    ...section(t.labels.problem, [[txt(project.problem, "dim")]]),
    ...section(t.labels.techStack, [badgeLine(project.techStack)]),
    ...section(t.labels.useCase, [[txt(project.useCase, "dim")]]),
  ];

  if (project.url) body.push(linkLine(t.labels.live, project.url, pad));
  if (project.repo) body.push(linkLine(t.labels.repo, project.repo, pad));

  return file(
    `${slugify(project.name)}.md`,
    [lines(...body)],
    project.url ?? project.repo,
  );
}

function smallProjectFile(
  project: { name: string; repo: string; description: string; language: string },
  category: string,
  lang: Lang,
): FsFile {
  const t = getDict(lang);
  const pad =
    Math.max(
      t.labels.category.length,
      t.labels.language.length,
      t.labels.repo.length,
    ) + 3;
  return file(
    `${slugify(project.name)}.md`,
    [
      lines(
        [strong(project.name)],
        blank,
        [txt(project.description)],
        blank,
        [dim(`${t.labels.category}:`.padEnd(pad)), txt(category)],
        [dim(`${t.labels.language}:`.padEnd(pad)), badge(project.language)],
        linkLine(t.labels.repo, project.repo, pad),
      ),
    ],
    project.repo,
  );
}

function aboutFile(lang: Lang): FsFile {
  const t = getDict(lang);
  const pad = Math.max(t.labels.role.length, t.labels.focus.length) + 3;
  return file("about.md", [
    lines(
      [strong(siteConfig.name)],
      blank,
      [dim(`${t.labels.role}:`.padEnd(pad)), txt(siteConfig.hero.role)],
      [dim(`${t.labels.focus}:`.padEnd(pad)), txt(siteConfig.hero.tagline, "accent2")],
      blank,
      [txt(siteConfig.hero.intro)],
      blank,
      [
        dim("→ "),
        action("projects", "projects"),
        dim("  ·  "),
        action("skills", "skills"),
        dim("  ·  "),
        action("writing", "writing"),
        dim("  ·  "),
        action("contact", "contact"),
      ],
    ),
  ]);
}

function whoamiFile(lang: Lang): FsFile {
  const t = getDict(lang);
  return file("whoami.txt", [
    lines(
      [strong(siteConfig.name)],
      [txt(siteConfig.title.split("—")[1]?.trim() ?? siteConfig.hero.role, "accent2")],
      blank,
      [txt(siteConfig.description, "dim")],
      blank,
      [dim(`${t.labels.location}: `), txt("Istanbul, Turkey")],
      [dim(`${t.labels.shell}: `), txt("mehsh 2.6.0")],
    ),
  ]);
}

function readmeFile(lang: Lang): FsFile {
  const t = getDict(lang);
  return file("README.md", [
    lines(
      [strong(`mehmet.tech — ${t.labels.shell.toLowerCase()}`)],
      blank,
      [txt(t.msgs.helpIntro)],
      blank,
      [dim("$ "), action("help", "help"), dim("      ")],
      [dim("$ "), action("ls", "ls")],
      [dim("$ "), action("neofetch", "neofetch")],
      [dim("$ "), action("theme", "theme")],
      blank,
      [dim(`${t.labels.tip}: `), txt(t.msgs.helpFooter, "dim")],
    ),
  ]);
}

function envFile(): FsFile {
  return file(".env", [
    lines(
      [txt("# nice try", "warn")],
      [dim("SECRET_KEY="), txt("not-in-this-repository", "dim")],
      [dim("DEPLOY_TARGET="), txt("vercel", "dim")],
      [dim("COFFEE_LEVEL="), txt("critically-low", "dim")],
    ),
  ]);
}

function skillFiles(lang: Lang): FsNode[] {
  return Object.entries(siteConfig.techFocus).map(([category, items]) =>
    file(`${slugify(category)}.txt`, [
      lines(
        [strong(category)],
        blank,
        ...items.map((item): Line => [dim("• "), txt(item)]),
        blank,
        [dim(`${items.length} ${lang === "tr" ? "teknoloji" : "technologies"}`)],
      ),
    ]),
  );
}

function writingFiles(lang: Lang): FsNode[] {
  const t = getDict(lang);
  return siteConfig.writing.map((article) => {
    const slug = slugify(article.title).split("-").slice(0, 6).join("-");
    return file(
      `${slug}.md`,
      [
        lines(
          [strong(article.title)],
          blank,
          [dim("medium.com")],
          blank,
          [dim(`${t.labels.read}: `), link(article.url, article.url)],
        ),
      ],
      article.url,
    );
  });
}

function openSourceFiles(lang: Lang): FsNode[] {
  const t = getDict(lang);
  const forkLines: Line[] = siteConfig.forks.map((fork) => [
    dim("• "),
    link(fork.name, fork.repo, "accent"),
    dim(" — "),
    txt(fork.description, "dim"),
  ]);
  const contributionLines: Line[] = siteConfig.orgContributions.map((item) => [
    dim("• "),
    link(item.name, item.repo, "accent"),
    dim(" — "),
    txt(item.description, "dim"),
    txt("  "),
    badge(item.language),
  ]);

  return [
    file("forks.txt", [
      lines(
        [strong(t.labels.forks)],
        blank,
        ...forkLines,
        blank,
        [dim(`${siteConfig.forks.length} ${t.labels.total}`)],
      ),
    ]),
    file("org-contributions.txt", [
      lines([strong(t.labels.contributions)], blank, ...contributionLines),
    ]),
  ];
}

function contactFiles(lang: Lang): FsNode[] {
  const t = getDict(lang);
  const emailLines: Line[] = siteConfig.emails.map((entry) => [
    dim("• "),
    link(entry.address, `mailto:${entry.address}`, "accent"),
    dim("  — "),
    txt(entry.label, "dim"),
  ]);

  const socialLines: Line[] = Object.entries(siteConfig.socialLinks).map(
    ([platform, url]) => [
      dim("• "),
      txt(platform.padEnd(10), "accent2"),
      link(url, url),
    ],
  );

  const domainLines: Line[] = Object.entries(siteConfig.domains).map(
    ([domain, config]) => [
      dim("• "),
      link(domain.padEnd(18), `https://${domain}`, "accent"),
      txt(config.email, "dim"),
    ],
  );

  return [
    file("emails.txt", [
      lines(
        [strong(t.labels.emails)],
        blank,
        ...emailLines,
        blank,
        [txt(t.msgs.contactCta, "dim")],
      ),
    ]),
    file("social.txt", [lines([strong(t.labels.social)], blank, ...socialLines)]),
    file("domains.txt", [lines([strong("Domains")], blank, ...domainLines)]),
  ];
}

function buildRoot(lang: Lang): FsDir {
  const featured = siteConfig.featuredProjects.map((project) =>
    projectFile(project, lang),
  );

  const other = Object.entries(siteConfig.otherProjects).map(
    ([category, projects]) =>
      dir(
        slugify(category),
        projects.map((project) => smallProjectFile(project, category, lang)),
      ),
  );

  return dir("/", [
    readmeFile(lang),
    aboutFile(lang),
    whoamiFile(lang),
    envFile(),
    dir("projects", [dir("featured", featured), dir("other", other)]),
    dir("skills", skillFiles(lang)),
    dir("writing", writingFiles(lang)),
    dir("opensource", openSourceFiles(lang)),
    dir("contact", contactFiles(lang)),
  ]);
}

const cache = new Map<Lang, FsDir>();

export function getFileSystem(lang: Lang): FsDir {
  const cached = cache.get(lang);
  if (cached) return cached;
  const root = buildRoot(lang);
  cache.set(lang, root);
  return root;
}

export function isDir(node: FsNode | null | undefined): node is FsDir {
  return node?.type === "dir";
}

/** Resolves a user supplied path against the working directory. */
export function resolvePath(cwd: string, input: string): string {
  const raw = input.trim();
  if (raw === "" || raw === "~") return "/";

  const start = raw.startsWith("/") || raw.startsWith("~/") ? "/" : cwd;
  const relative = raw.startsWith("~/") ? raw.slice(2) : raw;

  const stack = start === "/" ? [] : start.split("/").filter(Boolean);
  for (const part of relative.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") stack.pop();
    else stack.push(part);
  }
  return `/${stack.join("/")}`.replace(/\/+$/, "") || "/";
}

export function findNode(root: FsDir, absPath: string): FsNode | null {
  if (absPath === "/") return root;
  let current: FsNode = root;
  for (const part of absPath.split("/").filter(Boolean)) {
    if (!isDir(current)) return null;
    const next: FsNode | undefined = current.children.find(
      (child) => child.name === part,
    );
    if (!next) return null;
    current = next;
  }
  return current;
}

export function joinPath(base: string, name: string): string {
  return base === "/" ? `/${name}` : `${base}/${name}`;
}

export function displayPath(absPath: string): string {
  return absPath === "/" ? "~" : `~${absPath}`;
}

export function visibleChildren(directory: FsDir, showHidden = false): FsNode[] {
  const children = showHidden
    ? directory.children
    : directory.children.filter((child) => !child.name.startsWith("."));
  return [...children].sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export interface WalkedFile {
  path: string;
  node: FsFile;
}

export function walkFiles(directory: FsDir, base = ""): WalkedFile[] {
  const out: WalkedFile[] = [];
  for (const child of directory.children) {
    const path = `${base}/${child.name}`;
    if (child.type === "dir") out.push(...walkFiles(child, path));
    else out.push({ path, node: child });
  }
  return out;
}

export function walkPaths(directory: FsDir, base = ""): string[] {
  const out: string[] = [];
  for (const child of directory.children) {
    const path = `${base}/${child.name}`;
    out.push(child.type === "dir" ? `${path}/` : path);
    if (child.type === "dir") out.push(...walkPaths(child, path));
  }
  return out;
}
