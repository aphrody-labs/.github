import { describe, expect, test } from "bun:test";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { dependabot, plan } from "./scaffold.ts";

const template = "# head\nversion: 2\nupdates:\n  - package-ecosystem: github-actions\n    x: 1\n\n  - package-ecosystem: bun\n    x: 2\n\n  - package-ecosystem: cargo\n    x: 3\n";

describe("scaffold", () => {
  test("dependabot keeps actions plus the ecosystems the manifests need", () => {
    expect(dependabot(template, { bun: false, cargo: false })).not.toContain("bun");
    const both = dependabot(template, { bun: true, cargo: true });
    expect(both).toContain("bun");
    expect(both).toContain("cargo");
    expect(both.startsWith("# head")).toBe(true);
  });

  test("plan lists only what is missing and picks the stack from the manifests", () => {
    const repo = mkdtempSync(join(tmpdir(), "scaffold-"));
    writeFileSync(join(repo, "package.json"), "{}");
    mkdirSync(join(repo, ".github", "workflows"), { recursive: true });
    writeFileSync(join(repo, ".github", "workflows", "ci.yml"), "name: ci\n");
    writeFileSync(join(repo, "LICENSE"), "x");
    const dests = plan(repo).map((p) => p.dest);
    expect(dests).toContain(".github/CODEOWNERS");
    expect(dests).toContain(".github/dependabot.yml");
    expect(dests).not.toContain("LICENSE");
    expect(dests).not.toContain(".github/workflows/ci.yml");
    expect(dests).not.toContain("rustfmt.toml");
  });
});
