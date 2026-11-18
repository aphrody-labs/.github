# .github

The Aphrody Labs standard, its organization defaults, reusable workflows and the generated organization profile.

[![license](https://img.shields.io/github/license/aphrody-labs/.github)](LICENSE)

## Why

Every repository of the organization follows one written standard instead of its own habits. This repository holds that standard ([STANDARD.md](STANDARD.md) and its machine-readable twin [standard.toml](standard.toml)), the files GitHub inherits by default (issue forms, pull request template, `CONTRIBUTING.md`, `SECURITY.md`, `SUPPORT.md`, `CODE_OF_CONDUCT.md`), the reusable CI and release workflows, and the profile README. It is not a place for product code.

## Install

```sh
git clone https://github.com/aphrody-labs/.github.git
```

## Usage

Call a reusable workflow from a repository, or copy a starter from `workflow-templates/`:

```yaml
jobs:
  ci:
    uses: aphrody-labs/.github/.github/workflows/ci-bun.yml@main
```

Preview what the standard would change across the organization (dry run, writes nothing), then apply it:

```sh
bun tools/apply.ts
bun tools/apply.ts --apply --only=labels,rulesets
```

## Documentation

[STANDARD.md](STANDARD.md) defines classes, layout, naming, labels, rulesets, security, Actions, publishing and Cloudflare policy. `templates/` holds the README, MDX, CODEOWNERS and Dependabot templates.

## Development

```sh
bun tools/lint-standard.ts
bun test tools/
```

Contributions follow the [organization guide](CONTRIBUTING.md). Report vulnerabilities as described in the [security policy](SECURITY.md).

## License

Apache-2.0, see [LICENSE](LICENSE).
