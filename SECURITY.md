# Security policy

This policy applies to every public repository of Aphrody Labs and the Aphrody user account that has no `SECURITY.md` of its own.

## Reporting a vulnerability

Do not open a public issue, discussion or pull request for a vulnerability.

1. Use **Report a vulnerability** on the repository's **Security** tab (GitHub private vulnerability reporting).
2. If that tab is missing, write to contact@aphrody.com with the repository, the affected version or commit, the impact and a minimal reproduction.

Never include live credentials in a report. If you found a leaked secret, say where it is and which service it belongs to; do not test it.

## What to expect

| Step | Target |
| :-- | :-- |
| Acknowledgement | 3 days |
| Triage and severity | 7 days |
| Fix or mitigation for high and critical | 30 days |
| Coordinated disclosure | after the fix ships, credited unless you decline |

## Scope

In scope: code, workflows, releases and published packages of Aphrody-owned repositories; Aphrody-operated Cloudflare Workers and storage.

Out of scope: upstream projects we mirror as forks (report to the upstream, see the fork's README), social engineering, denial of service by volume, and findings that need a compromised maintainer account.

## Supported versions

The default branch and the latest published release of each package. Older releases receive fixes only when the repository's README says so.

## Our own hygiene

Secret scanning and push protection, Dependabot alerts and security updates, and CodeQL are enabled on public repositories. Releases are published through trusted publishing (OIDC) with provenance where the registry supports it. The rules are in [STANDARD.md](STANDARD.md).
