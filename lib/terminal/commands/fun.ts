import { blank, dim, lines, txt, warn } from "../blocks";
import type { Command, Line } from "../types";

export const sudoCommand: Command = {
  name: "sudo",
  group: "fun",
  usage: "sudo <command>",
  run: (ctx) => [
    lines(
      [txt(`[sudo] password for guest: ${"*".repeat(8)}`, "dim")],
      [txt(ctx.t.fun.sudo, "error")],
    ),
  ],
};

export const rmCommand: Command = {
  name: "rm",
  group: "fun",
  usage: "rm [-rf] <path>",
  run: (ctx) => [
    lines(...ctx.t.fun.rmrf.map((line, index): Line => [
      txt(line, index === 0 ? "error" : "dim"),
    ])),
  ],
};

export const matrixCommand: Command = {
  name: "matrix",
  group: "fun",
  usage: "matrix",
  run: (ctx) => [
    lines([txt(ctx.t.fun.matrix, "success")]),
    { type: "matrix" },
  ],
};

export const fortuneCommand: Command = {
  name: "fortune",
  group: "fun",
  usage: "fortune",
  run: (ctx) => {
    const list = ctx.t.fun.fortunes;
    const quote = list[Math.floor(Math.random() * list.length)];
    return [
      lines(
        [dim("┌" + "─".repeat(Math.min(quote.length, 60) + 2) + "┐")],
        [dim("│ "), txt(quote, "accent2"), dim(" │")],
        [dim("└" + "─".repeat(Math.min(quote.length, 60) + 2) + "┘")],
      ),
    ];
  },
};

export const coffeeCommand: Command = {
  name: "coffee",
  aliases: ["brew"],
  group: "fun",
  usage: "coffee",
  run: (ctx) => [
    lines(
      [dim("      )  )  )")],
      [dim("     (  (  (")],
      [dim("    ┌─────────┐──┐")],
      [dim("    │ "), txt("mehsh", "accent"), dim("   │  │")],
      [dim("    │         │──┘")],
      [dim("    └─────────┘")],
      blank,
      [txt(ctx.t.fun.coffee, "warn")],
    ),
  ],
};

export const vimCommand: Command = {
  name: "vim",
  aliases: ["nvim", "vi", "nano", "emacs"],
  group: "fun",
  usage: "vim [file]",
  run: (ctx) => [warn(ctx.t.fun.vim)],
};

export const funCommands: Command[] = [
  sudoCommand,
  rmCommand,
  matrixCommand,
  fortuneCommand,
  coffeeCommand,
  vimCommand,
];
