# Contributing to Right Away

Thank you for taking the time to contribute! This document explains how to get involved.

---

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Getting started](#getting-started)
- [How to contribute](#how-to-contribute)
- [Development workflow](#development-workflow)
- [Commit convention](#commit-convention)
- [Pull request process](#pull-request-process)
- [Areas open for contribution](#areas-open-for-contribution)

---

## Code of conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating you agree to uphold it.

---

## Getting started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Setup

```bash
git clone https://github.com/Betouss/right-away.git
cd right-away
pnpm install
pnpm dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:3001

---

## How to contribute

### Report a bug

Open an issue using the **Bug report** template. Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser / Node version

### Suggest a feature

Open an issue using the **Feature request** template. Describe the use case clearly — what problem does it solve?

### Submit code

1. Find an open issue labeled `good first issue` or `help wanted`
2. Comment on it to claim it
3. Fork the repo and create a branch from `main`
4. Make your changes following the guidelines below
5. Open a pull request

---

## Development workflow

```bash
# Run everything
pnpm dev

# API tests
pnpm --filter api test

# E2E tests (requires dev server running)
pnpm --filter web test:e2e
```

### Adding a new framework

1. Add the template ID to `packages/shared/src/index.ts`
2. Add the framework to `apps/api/src/data/templates.ts`
3. Add the base files to `apps/api/src/generator/index.ts`
4. Add the framework card data to `apps/web/src/data.ts`
5. Update the file tree logic in `apps/web/src/utils.ts`
6. Add a test case in `apps/api/src/__tests__/generate.test.ts`

### Adding a new dependency

1. Add the dep ID to `packages/shared/src/index.ts`
2. Add it to `apps/api/src/data/catalog.ts`
3. Add its npm packages to the `DEP_PACKAGES` map in `apps/api/src/generator/index.ts`
4. Add any extra files it injects in the generator
5. Add it to `apps/web/src/data.ts` (CATALOG)
6. Update `spec/catalog/dependencies.md`

---

## Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add Fastify framework template
fix: correct package.json type field for CJS projects
docs: update contributing guide
test: add E2E test for dependency panel
chore: update archiver to v7
```

Types: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `style`

---

## Pull request process

1. Branch name: `feat/add-bun-support`, `fix/zip-headers`, etc.
2. Keep PRs focused — one concern per PR
3. Fill in the PR template completely
4. All tests must pass
5. At least one maintainer approval is required before merging
6. Squash merge is preferred

---

## Areas open for contribution

| Area | Description | Label |
|------|-------------|-------|
| New frameworks | Bun, Elysia, Remix, SvelteKit, Astro | `framework` |
| New dependencies | More ORMs, auth providers, queue libs | `catalog` |
| Templates | Improve generated file content | `templates` |
| UI polish | Animations, responsiveness, dark mode | `ui` |
| Tests | More E2E coverage, edge cases | `testing` |
| Docs | Examples, guides, translations | `docs` |
