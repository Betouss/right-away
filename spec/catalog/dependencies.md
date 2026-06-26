# Dependency Catalog

## ORM & Database

| ID        | Name      | npm packages                            |
|-----------|-----------|-----------------------------------------|
| `prisma`  | Prisma    | `prisma`, `@prisma/client`              |
| `typeorm` | TypeORM   | `typeorm`, `reflect-metadata`           |
| `drizzle` | Drizzle   | `drizzle-orm`, `drizzle-kit`            |
| `mongoose`| Mongoose  | `mongoose`                              |

## API & Docs

| ID        | Name               | npm packages                                       |
|-----------|--------------------|----------------------------------------------------|
| `swagger` | Swagger / OpenAPI  | `@nestjs/swagger`, `swagger-ui-express`            |
| `graphql` | GraphQL            | `@nestjs/graphql`, `@apollo/server`, `graphql`     |
| `trpc`    | tRPC               | `@trpc/server`, `@trpc/client`                     |

## Auth & Security

| ID          | Name          | npm packages                                              |
|-------------|---------------|-----------------------------------------------------------|
| `jwt`       | JWT Auth      | `@nestjs/passport`, `passport-jwt`, `@nestjs/jwt`         |
| `bcrypt`    | bcrypt        | `bcrypt`, `@types/bcrypt`                                 |
| `helmet`    | Helmet        | `helmet`                                                  |
| `throttler` | Rate limiting | `@nestjs/throttler`                                       |

## Validation & Config

| ID          | Name              | npm packages                           |
|-------------|-------------------|----------------------------------------|
| `validator` | class-validator   | `class-validator`, `class-transformer` |
| `zod`       | Zod               | `zod`                                  |
| `config`    | Config (dotenv)   | `@nestjs/config`, `dotenv`             |

## Testing

| ID       | Name    | npm packages (devDependencies)                    |
|----------|---------|---------------------------------------------------|
| `jest`   | Jest    | `jest`, `ts-jest`, `@types/jest`                  |
| `vitest` | Vitest  | `vitest`, `@vitest/ui`                            |

## Cache & Queue

| ID       | Name    | npm packages                   |
|----------|---------|--------------------------------|
| `redis`  | Redis   | `ioredis`                      |
| `bullmq` | BullMQ  | `bullmq`                       |

## Tooling & DevOps

| ID         | Name            | packages / generated files                          |
|------------|-----------------|-----------------------------------------------------|
| `eslint`   | ESLint          | `eslint`, `@typescript-eslint/*` (devDep)           |
| `prettier` | Prettier        | `prettier` (devDep)                                 |
| `biome`    | Biome           | `@biomejs/biome` (devDep)                           |
| `docker`   | Docker          | `Dockerfile` + `docker-compose.yml` (no npm package)|
| `ci`       | GitHub Actions  | `.github/workflows/ci.yml` (no npm package)         |
