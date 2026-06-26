# Frontend — Components

## Global state

A single `ProjectConfigContext` holds the entire configuration state:

```ts
interface ProjectConfig {
  framework: FrameworkId
  language: 'ts' | 'js'
  moduleSystem: 'esm' | 'cjs'
  packageManager: PackageManagerId
  name: string
  description: string
  version: string
  nodeVersion: string
  author: string
  license: string
  dependencies: DependencyId[]
}
```

---

## Header

Fixed top bar with the logo, version badge and navigation links (Templates, Docs, GitHub).

---

## FrameworkSelector

3×2 grid of clickable cards.

**Frameworks:** NestJS, Express, Fastify, Hono, Next.js, Vite

Each card shows:
- Colored icon / mark
- Name
- Short description

Selected card receives a green border and glow (`#c5f82a`).

---

## LanguagePicker

Two toggle buttons: **TypeScript** / **JavaScript**.

Active button: `#c5f82a` background, dark text.

---

## ModulePicker

Two toggle buttons: **ESM** / **CommonJS**.

Same style as `LanguagePicker`.

---

## PackageManagerSelector

4-column grid of cards: **npm**, **yarn**, **pnpm**, **bun**.

Each card shows the name and install command (`npm install`, `pnpm i`, etc.).

---

## MetadataForm

Fields:
- Project name (full width)
- Description (full width)
- Version | Node version (select: 22.x, 20.x, 18.x)
- Author | License (select: MIT, Apache-2.0, GPL-3.0, ISC, UNLICENSED)

---

## DependencyBadge + DependencyPanel

**DependencyBadge** — shown in the dependencies section with a count badge and "+ Add" button.

**DependencyPanel** — right-side slide-in overlay.
- Search field
- List grouped by: ORM & Database, API & Docs, Auth & Security, Validation & Config, Testing, Cache & Queue, Tooling & DevOps
- Each item: toggle with `#c5f82a` checkbox style
- Footer with count and "Done" button

---

## ProjectTree

Live preview of the generated file structure.

Updates in real time as the user changes framework and dependencies.

Directories in `#c5f82a`, files in `#8a909a`.

---

## ActionBar (Footer)

Fixed bottom bar with:
- Current config summary (e.g. `nestjs · typescript · pnpm · 3 dependencies`)
- **Copy CLI** button — copies the command to clipboard
- **Generate .zip** button — POSTs to the backend and downloads the file

---

## Toast

Temporary notification (2.6s) that appears above the footer.

Use cases: "CLI command copied" / "Generating zip..."
