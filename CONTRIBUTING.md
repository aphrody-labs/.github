# Contributing

Thanks for helping. This is the default guide for every Aphrody Labs repository; a repository's own `CONTRIBUTING.md` overrides it. The organization rules live in [STANDARD.md](STANDARD.md).

## Before you start

- Search open and closed issues. For anything larger than a small fix, open an issue first and wait for a maintainer's yes.
- Security problem: stop and read [SECURITY.md](SECURITY.md).
- Forks (marked "forked from") track an upstream: send changes upstream, not here, unless the README says the fork carries patches.

## Setup

Each repository documents its own setup under **Development** in the README. Defaults:

| Stack | Install | Check |
| :-- | :-- | :-- |
| Bun / TypeScript | `bun install --frozen-lockfile` | `bun run lint && bun run typecheck && bun test` |
| Rust | `cargo fetch --locked` | `cargo fmt --check && cargo clippy --all-targets -- -D warnings && cargo test` |
| C / C++ (LLVM) | `cmake -S . -B build -G Ninja` | `cmake --build build && ctest --test-dir build` |
| Go | `go mod download` | `go vet ./... && go test ./...` |

Run the checks locally before you push. Heavy builds run on the build host or in CI, not on a laptop.

## Changes

1. Keep one logical change per pull request; keep it small enough to review in one sitting.
2. Commit messages follow Bun's shape, `area: summary` (for example `install: keep the bin link of a native dependency`), imperative, 72 characters or fewer, with a body that says why and how it was verified; `type(scope): summary` is also accepted. Mark breaking changes with a `BREAKING CHANGE:` footer. Format and examples: [commit-format.md](docs/standards/commit-format.md); check with `bun tools/check-commit.ts --range origin/main..HEAD`.
3. Add or update tests and docs with the code. Delete dead code instead of commenting it out.
4. Do not commit secrets, `.env` files, generated build output or vendored copies of code that a dependency manager can fetch.
5. Do not add tool-generated attribution trailers to commits.
6. Sign off with `git commit -s` only if the repository's README asks for a DCO.

## Pull requests

Fill in the pull request template: what changed and why, how it was verified (commands and output), risk, rollback. The title is the squash commit subject and follows the commit rules. A pull request is ready when:

- CI is green (`ci / gate`), including docs lint when docs changed.
- New behavior has a test; user-visible changes have a docs entry and, for published packages, a label from the release notes categories (`breaking`, `feature`, `bug`, `docs`, `chore`).
- All review threads are resolved. Squash or rebase merge only; history on the default branch is linear.

Maintainers who work solo or through automation may commit to the default branch directly. The history rules still apply: no force push, no deletion, linear history.

## Code style and review

Code follows the [unified code style](docs/standards/code-style.md): `bun fmt` and `bun lint` for TypeScript, `rustfmt` and `clippy` for Rust, with the configuration in `templates/`. Reviewers use the [review checklist](templates/REVIEW.md).

## Documentation

README and community files are GitHub-flavored Markdown. Site content under `docs/` may be MDX with `title` and `description` front matter. Write English first; translations are added through the repository's i18n catalogs. See the README template in [STANDARD.md](STANDARD.md#3-readme-and-docs).

## Licensing

Your contribution is licensed under the repository's license (Apache-2.0 unless the repository says otherwise). Do not submit code you cannot license that way.
