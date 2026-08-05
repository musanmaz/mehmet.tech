import {
  action,
  blank,
  dim,
  error,
  grid,
  lines,
  strong,
  txt,
} from "../blocks";
import {
  displayPath,
  findNode,
  isDir,
  joinPath,
  resolvePath,
  visibleChildren,
  walkFiles,
  walkPaths,
} from "../filesystem";
import type {
  Command,
  FsDir,
  FsNode,
  Line,
  OutputBlock,
  Segment,
} from "../types";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  return `${(bytes / 1024).toFixed(1)}K`;
}

function nodeSegment(node: FsNode, parentPath: string): Segment {
  const path = joinPath(parentPath, node.name);
  return node.type === "dir"
    ? action(`${node.name}/`, `cd ${path}`, "accent")
    : action(node.name, `cat ${path}`, "fg");
}

/** Completion candidates for path-like arguments. */
function pathCompletions(cwd: string, root: FsDir, token: string): string[] {
  const slash = token.lastIndexOf("/");
  const prefix = slash === -1 ? "" : token.slice(0, slash + 1);
  const base = resolvePath(cwd, prefix || ".");
  const directory = findNode(root, base);
  if (!isDir(directory)) return [];
  return visibleChildren(directory, token.startsWith(".")).map(
    (child) => `${prefix}${child.name}${child.type === "dir" ? "/" : ""}`,
  );
}

export const lsCommand: Command = {
  name: "ls",
  aliases: ["dir", "list"],
  group: "fs",
  usage: "ls [-l] [-a] [path]",
  complete: (ctx, token) => pathCompletions(ctx.cwd, ctx.root, token),
  run: (ctx) => {
    const flags = ctx.args.filter((arg) => arg.startsWith("-")).join("");
    const target = ctx.args.find((arg) => !arg.startsWith("-")) ?? ".";
    const absolute = resolvePath(ctx.cwd, target);
    const node = findNode(ctx.root, absolute);

    if (!node) return [error(ctx.t.errors.noSuchFile(target))];
    if (!isDir(node)) {
      return [lines([nodeSegment(node, absolute.replace(/\/[^/]*$/, "") || "/")])];
    }

    const children = visibleChildren(node, flags.includes("a"));
    if (children.length === 0) return [lines([dim(`(${ctx.t.labels.empty})`)])];

    if (flags.includes("l")) {
      return [
        lines(
          ...children.map((child): Line => {
            const mode = child.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
            const size =
              child.type === "dir"
                ? String(child.children.length)
                : formatSize(child.size);
            return [
              dim(mode.padEnd(12)),
              dim(size.padStart(9)),
              txt("  "),
              nodeSegment(child, absolute),
            ];
          }),
        ),
      ];
    }

    return [grid(children.map((child) => nodeSegment(child, absolute)))];
  },
};

export const cdCommand: Command = {
  name: "cd",
  group: "fs",
  usage: "cd [path|..|~|-]",
  complete: (ctx, token) =>
    pathCompletions(ctx.cwd, ctx.root, token).filter((entry) =>
      entry.endsWith("/"),
    ),
  run: (ctx) => {
    const target = ctx.args[0] ?? "~";
    const absolute =
      target === "-" ? ctx.prevCwd : resolvePath(ctx.cwd, target);
    const node = findNode(ctx.root, absolute);

    if (!node) return [error(ctx.t.errors.noSuchFile(target))];
    if (!isDir(node)) return [error(ctx.t.errors.notADirectory(target))];

    ctx.setCwd(absolute);
    if (target === "-") return [lines([dim(displayPath(absolute))])];
  },
};

export const pwdCommand: Command = {
  name: "pwd",
  group: "fs",
  usage: "pwd",
  run: (ctx) => [lines([txt(ctx.cwd, "accent")])],
};

export const catCommand: Command = {
  name: "cat",
  aliases: ["less", "more", "bat", "read"],
  group: "fs",
  usage: "cat <file> [file...]",
  complete: (ctx, token) => pathCompletions(ctx.cwd, ctx.root, token),
  run: (ctx) => {
    if (ctx.args.length === 0) {
      return [error(ctx.t.errors.missingArg("cat <file>"))];
    }

    const output: OutputBlock[] = [];
    for (const target of ctx.args) {
      const absolute = resolvePath(ctx.cwd, target);
      const node = findNode(ctx.root, absolute);
      if (!node) {
        output.push(error(ctx.t.errors.noSuchFile(target)));
        continue;
      }
      if (isDir(node)) {
        output.push(error(ctx.t.errors.isADirectory(target)));
        continue;
      }
      output.push(...node.blocks);
    }
    return output;
  },
};

function treeLines(
  directory: FsDir,
  base: string,
  prefix: string,
  out: Line[],
): void {
  const children = visibleChildren(directory);
  children.forEach((child, index) => {
    const last = index === children.length - 1;
    out.push([
      dim(`${prefix}${last ? "└── " : "├── "}`),
      nodeSegment(child, base),
    ]);
    if (child.type === "dir") {
      treeLines(
        child,
        joinPath(base, child.name),
        `${prefix}${last ? "    " : "│   "}`,
        out,
      );
    }
  });
}

export const treeCommand: Command = {
  name: "tree",
  group: "fs",
  usage: "tree [path]",
  complete: (ctx, token) => pathCompletions(ctx.cwd, ctx.root, token),
  run: (ctx) => {
    const target = ctx.args[0] ?? ".";
    const absolute = resolvePath(ctx.cwd, target);
    const node = findNode(ctx.root, absolute);
    if (!node) return [error(ctx.t.errors.noSuchFile(target))];
    if (!isDir(node)) return [error(ctx.t.errors.notADirectory(target))];

    const out: Line[] = [[strong(displayPath(absolute))]];
    treeLines(node, absolute, "", out);
    return [lines(...out)];
  },
};

export const findCommand: Command = {
  name: "find",
  group: "fs",
  usage: "find <name>",
  run: (ctx) => {
    const needle = ctx.args.join(" ").toLowerCase();
    if (!needle) return [error(ctx.t.errors.missingArg("find <name>"))];

    const matches = walkPaths(ctx.root).filter((path) =>
      path.toLowerCase().includes(needle),
    );
    if (matches.length === 0) return [lines([dim(ctx.t.labels.noMatches)])];

    return [
      lines(
        ...matches.map((path): Line => {
          const isDirectory = path.endsWith("/");
          const clean = isDirectory ? path.slice(0, -1) : path;
          return [
            action(path, `${isDirectory ? "cd" : "cat"} ${clean}`, isDirectory ? "accent" : "fg"),
          ];
        }),
        blank,
        [dim(`${matches.length} ${ctx.t.labels.matches}`)],
      ),
    ];
  },
};

export const grepCommand: Command = {
  name: "grep",
  aliases: ["search"],
  group: "fs",
  usage: "grep <pattern>",
  run: (ctx) => {
    const pattern = ctx.args.join(" ").trim();
    if (!pattern) return [error(ctx.t.msgs.grepUsage)];

    const needle = pattern.toLowerCase();
    const out: Line[] = [];
    let total = 0;

    for (const { path, node } of walkFiles(ctx.root)) {
      const hits = node.search
        .split("\n")
        .filter((line) => line.toLowerCase().includes(needle));
      if (hits.length === 0) continue;

      total += hits.length;
      out.push([action(path, `cat ${path}`, "accent")]);
      for (const hit of hits.slice(0, 3)) {
        const index = hit.toLowerCase().indexOf(needle);
        const snippetStart = Math.max(0, index - 30);
        const before = hit.slice(snippetStart, index).trimStart();
        const match = hit.slice(index, index + pattern.length);
        const after = hit.slice(index + pattern.length, index + pattern.length + 60);
        out.push([
          dim("  "),
          dim(snippetStart > 0 ? `…${before}` : before),
          txt(match, "warn", { bold: true }),
          dim(after.trimEnd()),
        ]);
      }
      out.push(blank);
    }

    if (total === 0) return [lines([dim(ctx.t.labels.noMatches)])];
    out.push([dim(`${total} ${ctx.t.labels.matches}`)]);
    return [lines(...out)];
  },
};

export const fsCommands: Command[] = [
  lsCommand,
  cdCommand,
  pwdCommand,
  catCommand,
  treeCommand,
  findCommand,
  grepCommand,
];
