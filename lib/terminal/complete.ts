import { commandNames, registry } from "./commands";
import type { CommandContext } from "./types";

export interface Completion {
  /** The line as it should look after completing. */
  value: string;
  /** Remaining candidates when the completion is ambiguous. */
  candidates: string[];
}

function commonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    let index = 0;
    while (index < prefix.length && prefix[index] === value[index]) index += 1;
    prefix = prefix.slice(0, index);
  }
  return prefix;
}

export function complete(input: string, ctx: CommandContext): Completion {
  const trailingSpace = /\s$/.test(input);
  const parts = input.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return { value: input, candidates: [] };

  const completingCommand = parts.length === 1 && !trailingSpace;
  const token = trailingSpace ? "" : parts[parts.length - 1];

  let pool: string[];
  if (completingCommand) {
    pool = commandNames;
  } else {
    const command = registry.get(parts[0].toLowerCase());
    pool = command?.complete?.(ctx, token) ?? [];
  }

  const matches = [...new Set(pool)].filter((candidate) =>
    candidate.toLowerCase().startsWith(token.toLowerCase()),
  );

  if (matches.length === 0) return { value: input, candidates: [] };

  const resolved = matches.length === 1 ? matches[0] : commonPrefix(matches);
  if (resolved.length < token.length) return { value: input, candidates: matches };

  const head = completingCommand
    ? ""
    : `${parts.slice(0, trailingSpace ? parts.length : -1).join(" ")} `;
  const suffix =
    matches.length === 1 && !resolved.endsWith("/") ? " " : "";

  return {
    value: `${head}${resolved}${suffix}`,
    candidates: matches.length > 1 ? matches : [],
  };
}
