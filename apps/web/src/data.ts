export const FRAMEWORKS = [
  { id: 'nestjs', name: 'NestJS', desc: 'Scalable server', mark: 'N', color: '#e0234e' },
  { id: 'express', name: 'Express', desc: 'Minimal & fast', mark: 'E', color: '#8a8f98' },
  { id: 'fastify', name: 'Fastify', desc: 'Low overhead', mark: 'F', color: '#3b9c9c' },
  { id: 'hono', name: 'Hono', desc: 'Edge runtime', mark: 'H', color: '#ff7a18' },
  { id: 'nextjs', name: 'Next.js', desc: 'Fullstack React', mark: '▲', color: '#e8eaed' },
  { id: 'vite', name: 'Vite', desc: 'SPA frontend', mark: 'V', color: '#a259ff' },
]

export const PACKAGE_MANAGERS = [
  { id: 'npm', name: 'npm', cmd: 'npm install', color: '#cb3837' },
  { id: 'yarn', name: 'yarn', cmd: 'yarn', color: '#2c8ebb' },
  { id: 'pnpm', name: 'pnpm', cmd: 'pnpm i', color: '#f9ad00' },
  { id: 'bun', name: 'bun', cmd: 'bun install', color: '#fbf0df' },
]

export const CATALOG = [
  { group: 'ORM & Database', items: [
    { id: 'prisma', name: 'Prisma', desc: 'Type-safe ORM & schema toolkit' },
    { id: 'typeorm', name: 'TypeORM', desc: 'Decorator-based ORM' },
    { id: 'drizzle', name: 'Drizzle', desc: 'Lightweight SQL ORM' },
    { id: 'mongoose', name: 'Mongoose', desc: 'MongoDB ODM' },
  ]},
  { group: 'API & Docs', items: [
    { id: 'swagger', name: 'Swagger / OpenAPI', desc: 'Auto-generated API docs' },
    { id: 'graphql', name: 'GraphQL', desc: 'Schema-first GraphQL API' },
    { id: 'trpc', name: 'tRPC', desc: 'End-to-end typesafe APIs' },
  ]},
  { group: 'Auth & Security', items: [
    { id: 'jwt', name: 'JWT Auth', desc: 'Passport + JSON Web Tokens' },
    { id: 'bcrypt', name: 'bcrypt', desc: 'Password hashing' },
    { id: 'helmet', name: 'Helmet', desc: 'Secure HTTP headers' },
    { id: 'throttler', name: 'Rate limiting', desc: 'Request throttling guard' },
  ]},
  { group: 'Validation & Config', items: [
    { id: 'validator', name: 'class-validator', desc: 'DTO validation decorators' },
    { id: 'zod', name: 'Zod', desc: 'Schema validation' },
    { id: 'config', name: 'Config (dotenv)', desc: 'Typed env configuration' },
  ]},
  { group: 'Testing', items: [
    { id: 'jest', name: 'Jest', desc: 'Unit & integration tests' },
    { id: 'vitest', name: 'Vitest', desc: 'Vite-native test runner' },
  ]},
  { group: 'Cache & Queue', items: [
    { id: 'redis', name: 'Redis', desc: 'ioredis client' },
    { id: 'bullmq', name: 'BullMQ', desc: 'Background job queues' },
  ]},
  { group: 'Tooling & DevOps', items: [
    { id: 'eslint', name: 'ESLint', desc: 'Linting' },
    { id: 'prettier', name: 'Prettier', desc: 'Code formatter' },
    { id: 'biome', name: 'Biome', desc: 'Fast lint + format' },
    { id: 'docker', name: 'Docker', desc: 'Dockerfile + compose' },
    { id: 'ci', name: 'GitHub Actions', desc: 'CI workflow' },
  ]},
]
