# Testing Strategy — Right Away

## Philosophy

Right Away is a code-generation tool. Testing focuses on two concerns:

1. **API correctness**: Every endpoint must return well-typed, predictable responses. Generated ZIP archives must be structurally valid for any supported framework/language combination.
2. **UI behaviour**: The form-driven frontend must route user selections through to the download correctly. Key flows — selecting a framework, toggling options, adding/removing dependencies, and triggering generation — are tested end-to-end in a real browser.

We avoid unit-testing internal generator logic in isolation; instead we verify the final output through the HTTP boundary, which gives us more confidence with less coupling to implementation details.

### What we test

| Layer | Tool | What |
|---|---|---|
| API (integration) | Vitest + Supertest | HTTP endpoints, response shapes, error handling, ZIP generation |
| Frontend (E2E) | Playwright + Chromium | Page loads, UI interactions, dependency panel, action bar |

### What we do not test

- The exact contents of generated ZIP files (too brittle; verified manually)
- CSS/visual regressions (out of scope for this phase)
- Internal generator functions in isolation (covered transitively by the generate endpoint tests)

---

## API Tests — Vitest + Supertest

Location: `apps/api/src/__tests__/`

### Endpoints covered

#### `GET /api/health`
- Returns `200` with `{ ok: true }`

#### `GET /api/catalog`
- Returns `200`
- Body is an array of exactly **7** dependency groups
- Each group has a `group` (string) and `items` (array)
- Every item has `id`, `name`, and `desc` string fields

#### `GET /api/templates`
- Returns `200`
- Body is an array of exactly **6** framework templates
- Every item has `id`, `name`, `mark`, and `color` string fields

#### `POST /api/generate`
- Returns `400` when `framework` is missing
- Returns `400` when `name` is missing
- Returns `200` with `Content-Type: application/zip` for a valid NestJS + TypeScript payload
- Returns `200` for Express + JavaScript payload
- Returns `200` for Vite payload
- Response body is non-empty (ZIP archive has bytes)

### Running API tests

```bash
cd apps/api
pnpm test
```

Tests use Vitest in `run` mode (single-pass, no watch). The Express `app` is imported directly without binding to a port, so tests are fast and require no network port.

---

## E2E Tests — Playwright

Location: `apps/web/e2e/`

The Playwright config (`apps/web/playwright.config.ts`) boots the Vite dev server automatically and re-uses an already-running server if present.

### Flows covered

#### `home.spec.ts` — Page shell
- Page loads and the header shows "right away"
- Hero section renders the "PROJECT GENERATOR" badge
- All 6 framework cards are visible: NestJS, Express, Fastify, Hono, Next.js, Vite
- Package manager section shows all 4 options: npm, yarn, pnpm, bun
- Project structure section is visible in the right column

#### `framework.spec.ts` — Framework and language toggles
- Clicking the Express card selects it (verifies the green border colour via computed style)
- Clicking "JavaScript" button in Language section toggles to JS
- Clicking "ESM" / "CommonJS" toggles the module system
- Switching frameworks updates the project tree (different root files appear)

#### `dependencies.spec.ts` — Dependency panel flow
- Clicking "+ Add" opens the dependency panel slide-in
- Panel renders a search input
- Typing "prisma" filters the list to show Prisma
- Clicking Prisma row marks it selected (checkbox fills green)
- Clicking "Done" closes the panel
- Prisma appears in the selected dependencies list in the main view
- Clicking the × button on Prisma removes it from the list

#### `generate.spec.ts` — Action bar
- Clicking "Copy CLI" results in the button text changing to "Copied!" (or a toast appearing)
- "Generate .zip" button is present and enabled in the default state
- Clicking "Generate .zip" does not throw a JavaScript error (backend may not be running)

### Running E2E tests

```bash
# Requires the Vite dev server — Playwright starts it automatically
cd apps/web
pnpm test:e2e

# Run in headed mode for debugging
pnpm exec playwright test --headed

# Run a specific file
pnpm exec playwright test e2e/home.spec.ts
```

> E2E tests require Chromium to be installed. Run `pnpm exec playwright install chromium` once if the browser is not present.
