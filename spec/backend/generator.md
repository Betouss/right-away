# Backend — Generator

## Responsibility

The generator receives a `ProjectConfig` and produces a `.zip` file in memory (no disk writes).

## Template structure

```
apps/api/src/templates/
├── nestjs/
│   ├── src/
│   │   ├── main.ts.hbs
│   │   ├── app.module.ts.hbs
│   │   ├── app.controller.ts.hbs
│   │   └── app.service.ts.hbs
│   ├── test/
│   │   └── app.e2e-spec.ts.hbs
│   └── package.json.hbs
├── express/
│   └── src/
│       ├── index.ts.hbs
│       ├── app.ts.hbs
│       └── routes/index.ts.hbs
├── fastify/ ...
├── hono/    ...
├── nextjs/  ...
└── vite/    ...
```

Templates use **Handlebars** (`.hbs`) to inject variables from the config.

## Extra files per dependency

| Dep ID     | Injected files                                      |
|------------|-----------------------------------------------------|
| `prisma`   | `prisma/schema.prisma`                              |
| `docker`   | `Dockerfile`, `docker-compose.yml`                  |
| `ci`       | `.github/workflows/ci.yml`                          |
| `config`   | `.env.example`, `.env`                              |
| `eslint`   | `eslint.config.mjs` (TS) or `.eslintrc.json` (JS)  |
| `prettier` | `.prettierrc`                                       |
| `biome`    | `biome.json`                                        |
| `jest`     | `jest.config.ts`                                    |
| `vitest`   | `vitest.config.ts`                                  |
| `jwt`      | `src/auth/` with auth module (NestJS only)          |

## Generated package.json

The generator dynamically builds `package.json`:

```ts
{
  name: config.name,
  version: config.version,
  description: config.description,
  author: config.author,
  license: config.license,
  type: config.moduleSystem === 'esm' ? 'module' : 'commonjs',
  scripts: { /* per framework */ },
  dependencies: { /* mapped by dep id */ },
  devDependencies: { /* mapped by dep id */ },
  engines: { node: config.nodeVersion }
}
```

## Generator pipeline

```
ProjectConfig
  → select base template (by framework)
  → render each .hbs file with Handlebars
  → append extra files (by dependency)
  → append dynamically built package.json
  → append .gitignore, README.md
  → pack everything with archiver → zip stream
```
