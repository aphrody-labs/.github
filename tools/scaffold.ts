#!/usr/bin/env bun
// Brings one repository to the original_required files of standard.toml from templates/ and workflow-templates/. Writes only what is
// missing, never overwrites; the stack (bun, rust) comes from the manifests found at the repository root.
//   bun tools/scaffold.ts <repo dir> [--dry-run]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const ROOT = join(import.meta.dir, "..");

export interface Planned { dest: string; content: string }

/** The dependabot.yml of a repository: the github-actions block plus one block per manifest found (templates/dependabot.yml). */
export function dependabot(template: string, has: { bun: boolean; cargo: boolean }): string {
  const parts = template.split(/^(?=  - package-ecosystem: )/m);
  const head = parts.shift() as string;
  const keep = parts.filter((b) => {
    if (b.startsWith("  - package-ecosystem: github-actions")) return true;
    if (b.startsWith("  - package-ecosystem: bun")) return has.bun;
    if (b.startsWith("  - package-ecosystem: cargo")) return has.cargo;
    return false;
  });
  return `${head}${keep.join("").replace(/\n+$/, "")}\n`;
}

export function plan(repo: string, root = ROOT): Planned[] {
  const read = (p: string) => readFileSync(join(root, p), "utf8");
  const has = { bun: existsSync(join(repo, "package.json")), cargo: existsSync(join(repo, "Cargo.toml")) };
  const std = Bun.TOML.parse(read("standard.toml")) as { files: { original_required: string[]; templates: { source: string; dest: string; when?: string; mode: string }[] } };
  const wanted = new Map<string, () => string | undefined>([
    ["LICENSE", () => read("LICENSE")],
    [".github/CODEOWNERS", () => read("templates/CODEOWNERS")],
    [".github/dependabot.yml", () => dependabot(read("templates/dependabot.yml"), has)],
    [".github/workflows/ci.yml", () => (has.cargo ? read("workflow-templates/aphrody-ci-rust.yml") : has.bun ? read("workflow-templates/aphrody-ci-bun.yml") : undefined)],
    [".editorconfig", () => read(".editorconfig")],
    [".gitattributes", () => read(".gitattributes")],
    [".gitignore", () => undefined],
    ["README.md", () => undefined],
  ]);
  const out: Planned[] = [];
  for (const dest of std.files.original_required) {
    const make = wanted.get(dest);
    const content = make?.();
    if (content !== undefined && !existsSync(join(repo, dest))) out.push({ dest, content });
  }
  for (const t of std.files.templates) {
    if (t.mode !== "copy" || existsSync(join(repo, t.dest))) continue;
    if (t.when && !existsSync(join(repo, t.when))) continue;
    out.push({ dest: t.dest, content: read(t.source) });
  }
  const markdownlint = ".markdownlint-cli2.jsonc";
  if (!existsSync(join(repo, markdownlint))) out.push({ dest: markdownlint, content: read("templates/markdownlint-cli2.jsonc") });
  return out;
}

if (import.meta.main) {
  const repo = resolve(Bun.argv[2] ?? ".");
  const dry = Bun.argv.includes("--dry-run");
  const items = plan(repo);
  for (const it of items) {
    if (!dry) {
      mkdirSync(dirname(join(repo, it.dest)), { recursive: true });
      writeFileSync(join(repo, it.dest), it.content);
    }
    console.log(`${dry ? "would write" : "wrote"} ${it.dest}`);
  }
  if (!items.length) console.log("nothing missing");
}
