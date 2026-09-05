export type ParsedPolicy = {
  /** Sub-path declared on line 1 of the .md file, e.g. "/pos-privacy-policy". */
  path: string;
  /** Markdown body with the path line stripped out. */
  body: string;
};

const PATH_LINE = /^path\s*=\s*"(.+)"\s*$/;

export function parsePolicy(raw: string): ParsedPolicy | null {
  const newlineIndex = raw.indexOf('\n');
  const firstLine = newlineIndex === -1 ? raw : raw.slice(0, newlineIndex);
  const match = firstLine.match(PATH_LINE);
  if (!match) return null;

  const body = newlineIndex === -1 ? '' : raw.slice(newlineIndex + 1).trimStart();
  return { path: match[1], body };
}
