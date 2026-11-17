<!-- Title: area: imperative summary, at most 72 characters (type(scope): summary is also accepted). It becomes the squash commit subject. Rules: docs/standards/code-style.md -->

## What changed and why

<!-- The problem and who sees it, then what this change does and why this approach. Name the line that is the fix when the change also refactors. Link the issue: Closes #123 -->

## How it was verified

<!-- Exact commands and what they printed. Say what you did not run. A behavior change has a test that fails without the fix: name it. -->

```sh

```

## Risk

<!-- What could break, who is affected, how likely. "None" needs a reason. -->

## Rollback

<!-- How to undo it: revert this commit, flip a flag, redeploy a tag. Note any data or migration that does not revert. -->

## Breaking changes and migration

<!-- Delete this section when there are none. Label the pull request `breaking` and add a `BREAKING CHANGE:` footer. -->

## Checklist

- [ ] The diff was re-read line by line; no debug output, scratch files, formatter churn or lockfile ride-alongs
- [ ] Tests added or updated, or the reason is stated above (docs, dependency bump, CI)
- [ ] Docs, types and help text updated where the surface changed
- [ ] Dead code orphaned by this change is deleted and named above
- [ ] No secrets, `.env` files, developer-machine paths or private hostnames
- [ ] No assistant or bot attribution in the commit messages
