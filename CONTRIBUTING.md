# Contributing to TrackLoom

## Getting started

- Node 22, pnpm 9
- Install: `pnpm install`
- Build: `pnpm build`
- Test: `pnpm test`
- Lint/format: `pnpm lint` / `pnpm lint:fix`

## Monorepo

- Packages live in `packages/*`, apps in `apps/*`, docs in `docs/site`.

## Commits & Releases

- Use Conventional Commits (`feat:`, `fix:`, etc.)
- For user-facing changes, run `pnpm changeset` and pick semver bump.
- Releases are managed by Changesets. Maintainers run `pnpm release`.

## PRs

- Include tests for changes.
- Ensure CI (lint, build, test, size) is green.
- Link to related issues and include a brief rationale.

## Code style

- Biome handles lint & format (`biome.json`).

## Communication

- Discussions and proposals: open a GitHub Discussion or draft PR.
