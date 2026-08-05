import type { Command, CommandRegistry } from "../types";
import { fsCommands } from "./fs";
import { funCommands } from "./fun";
import { infoCommands } from "./info";
import { systemCommands } from "./system";

export { welcomeBlocks } from "./system";

export const allCommands: Command[] = [
  ...infoCommands,
  ...fsCommands,
  ...systemCommands,
  ...funCommands,
];

export const registry: CommandRegistry = new Map();

for (const command of allCommands) {
  registry.set(command.name, command);
  for (const alias of command.aliases ?? []) {
    registry.set(alias, command);
  }
}

export const commandNames: string[] = [...registry.keys()].sort();

export interface ParsedInput {
  name: string;
  args: string[];
  rawArgs: string;
}

const TOKEN = /"([^"]*)"|'([^']*)'|(\S+)/g;

export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let match: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(input)) !== null) {
    tokens.push(match[1] ?? match[2] ?? match[3]);
  }
  return tokens;
}

export function parseInput(input: string): ParsedInput | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const tokens = tokenize(trimmed);
  const [name, ...args] = tokens;
  const rawArgs = trimmed.slice(name.length).trim();
  return { name: name.toLowerCase(), args, rawArgs };
}

function distance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  let previous = Array.from({ length: cols }, (_, index) => index);

  for (let i = 1; i < rows; i += 1) {
    const current = [i];
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      );
    }
    previous = current;
  }
  return previous[cols - 1];
}

/** Closest known command name, used for the "did you mean" hint. */
export function suggestCommand(input: string): string | null {
  const name = input.toLowerCase();
  const prefixMatch = commandNames.find((candidate) =>
    candidate.startsWith(name),
  );
  if (prefixMatch) return prefixMatch;

  let best: string | null = null;
  let bestScore = Infinity;
  for (const candidate of commandNames) {
    const score = distance(name, candidate);
    if (score < bestScore) {
      bestScore = score;
      best = candidate;
    }
  }
  return bestScore <= Math.max(2, Math.floor(name.length / 3)) ? best : null;
}
