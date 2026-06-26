# Frontend — Flows

## Flow 1: Configure and generate project

```
User opens the site
  → Initial state: NestJS · TypeScript · ESM · pnpm · no deps
  → Selects framework         → ProjectTree updates
  → Selects language          → ProjectTree updates (extensions .ts/.js)
  → Selects module system     → saved to config
  → Selects package manager   → saved to config
  → Fills in metadata         → saved to config
  → Clicks "+ Add" (deps)     → DependencyPanel opens
    → Searches / selects deps → list and ProjectTree update
    → Clicks "Done"           → DependencyPanel closes
  → Clicks "Generate .zip"    → POST /api/generate
    → button shows loading
    → success: automatic .zip download
    → error: error toast
```

## Flow 2: Copy CLI command

```
  → Clicks "Copy CLI"
    → copies string to clipboard
    → button changes to "Copied!" for 1.6s
    → toast "CLI command copied to clipboard"
```

## Flow 3: Search dependency in panel

```
  → DependencyPanel is open
  → Types in the search field
    → filters by name and description in real time
    → if no results: shows "No dependencies match '...'"
```
