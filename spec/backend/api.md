# Backend — API

## Base URL

```
http://localhost:3001/api
```

---

## POST /generate

Receives the configuration and returns a `.zip` with the generated project.

### Request

```json
{
  "framework": "nestjs",
  "language": "ts",
  "moduleSystem": "esm",
  "packageManager": "pnpm",
  "name": "my-app",
  "description": "A blazing-fast Node.js service",
  "version": "0.1.0",
  "nodeVersion": "22.x",
  "author": "your-handle",
  "license": "MIT",
  "dependencies": ["prisma", "jwt", "docker"]
}
```

### Response

- **200** `Content-Type: application/zip` — zip file stream
- **400** `{ "error": "..." }` — invalid config
- **500** `{ "error": "..." }` — internal error

### Response headers

```
Content-Type: application/zip
Content-Disposition: attachment; filename="my-app.zip"
```

---

## GET /catalog

Returns the available dependency catalog.

### Response

```json
[
  {
    "group": "ORM & Database",
    "items": [
      { "id": "prisma", "name": "Prisma", "desc": "Type-safe ORM & schema toolkit" },
      { "id": "typeorm", "name": "TypeORM", "desc": "Decorator-based ORM" }
    ]
  }
]
```

---

## GET /templates

Returns the available frameworks.

### Response

```json
[
  { "id": "nestjs", "name": "NestJS", "desc": "Scalable server", "mark": "N", "color": "#e0234e" },
  { "id": "express", "name": "Express", "desc": "Minimal & fast", "mark": "E", "color": "#8a8f98" }
]
```
