import archiver from 'archiver'
import type { ProjectConfig, FrameworkId, DependencyId } from '../types'

// ---------------------------------------------------------------------------
// npm package mapping
// ---------------------------------------------------------------------------

type PkgEntry = { deps?: Record<string, string>; devDeps?: Record<string, string> }

const DEP_PACKAGES: Record<string, PkgEntry> = {
  prisma:    { deps: { '@prisma/client': 'latest' }, devDeps: { prisma: 'latest' } },
  typeorm:   { deps: { typeorm: 'latest', 'reflect-metadata': 'latest' } },
  drizzle:   { deps: { 'drizzle-orm': 'latest' }, devDeps: { 'drizzle-kit': 'latest' } },
  mongoose:  { deps: { mongoose: 'latest' } },
  swagger:   { deps: { '@nestjs/swagger': 'latest', 'swagger-ui-express': 'latest' } },
  graphql:   { deps: { '@nestjs/graphql': 'latest', '@apollo/server': 'latest', graphql: 'latest' } },
  trpc:      { deps: { '@trpc/server': 'latest', '@trpc/client': 'latest' } },
  jwt:       { deps: { '@nestjs/passport': 'latest', 'passport-jwt': 'latest', '@nestjs/jwt': 'latest' } },
  bcrypt:    { deps: { bcrypt: 'latest' }, devDeps: { '@types/bcrypt': 'latest' } },
  helmet:    { deps: { helmet: 'latest' } },
  throttler: { deps: { '@nestjs/throttler': 'latest' } },
  validator: { deps: { 'class-validator': 'latest', 'class-transformer': 'latest' } },
  zod:       { deps: { zod: 'latest' } },
  config:    { deps: { '@nestjs/config': 'latest', dotenv: 'latest' } },
  jest:      { devDeps: { jest: 'latest', 'ts-jest': 'latest', '@types/jest': 'latest' } },
  vitest:    { devDeps: { vitest: 'latest', '@vitest/ui': 'latest' } },
  redis:     { deps: { ioredis: 'latest' } },
  bullmq:    { deps: { bullmq: 'latest' } },
  eslint:    { devDeps: { eslint: 'latest', '@typescript-eslint/eslint-plugin': 'latest', '@typescript-eslint/parser': 'latest' } },
  prettier:  { devDeps: { prettier: 'latest' } },
  biome:     { devDeps: { '@biomejs/biome': 'latest' } },
}

// ---------------------------------------------------------------------------
// package.json builder
// ---------------------------------------------------------------------------

function buildScripts(framework: FrameworkId): Record<string, string> {
  switch (framework) {
    case 'nestjs':
      return { build: 'nest build', start: 'node dist/main', dev: 'nest start --watch' }
    case 'express':
    case 'fastify':
    case 'hono':
      return { dev: 'tsx watch src/index.ts', build: 'tsc', start: 'node dist/index.js' }
    case 'nextjs':
      return { dev: 'next dev', build: 'next build', start: 'next start' }
    case 'vite':
      return { dev: 'vite', build: 'vite build', preview: 'vite preview' }
  }
}

function buildFrameworkDeps(framework: FrameworkId): { deps: Record<string, string>; devDeps: Record<string, string> } {
  const deps: Record<string, string> = {}
  const devDeps: Record<string, string> = {}

  switch (framework) {
    case 'nestjs':
      Object.assign(deps, {
        '@nestjs/core': 'latest',
        '@nestjs/common': 'latest',
        '@nestjs/platform-express': 'latest',
        'reflect-metadata': 'latest',
        rxjs: 'latest',
      })
      Object.assign(devDeps, {
        '@nestjs/cli': 'latest',
        '@nestjs/schematics': 'latest',
        '@nestjs/testing': 'latest',
      })
      break
    case 'express':
      deps['express'] = 'latest'
      devDeps['@types/express'] = 'latest'
      break
    case 'fastify':
      deps['fastify'] = 'latest'
      break
    case 'hono':
      deps['hono'] = 'latest'
      break
    case 'nextjs':
      Object.assign(deps, { next: 'latest', react: 'latest', 'react-dom': 'latest' })
      Object.assign(devDeps, { '@types/react': 'latest', '@types/react-dom': 'latest' })
      break
    case 'vite':
      Object.assign(deps, { react: 'latest', 'react-dom': 'latest' })
      Object.assign(devDeps, { vite: 'latest', '@vitejs/plugin-react': 'latest', '@types/react': 'latest', '@types/react-dom': 'latest' })
      break
  }

  return { deps, devDeps }
}

function buildPackageJson(config: ProjectConfig): string {
  const { deps: baseDeps, devDeps: baseDevDeps } = buildFrameworkDeps(config.framework)
  const deps: Record<string, string> = { ...baseDeps }
  const devDeps: Record<string, string> = { ...baseDevDeps }

  for (const depId of config.dependencies) {
    const entry = DEP_PACKAGES[depId as string]
    if (entry) {
      Object.assign(deps, entry.deps ?? {})
      Object.assign(devDeps, entry.devDeps ?? {})
    }
  }

  if (config.language === 'ts') {
    devDeps['typescript'] = 'latest'
    devDeps['@types/node'] = 'latest'
    if (['express', 'fastify', 'hono'].includes(config.framework)) {
      devDeps['tsx'] = 'latest'
    }
  }

  const pkg: Record<string, unknown> = {
    name: config.name,
    version: config.version || '0.1.0',
    description: config.description || '',
    author: config.author || '',
    license: config.license || 'MIT',
    scripts: buildScripts(config.framework),
  }

  if (Object.keys(deps).length > 0) pkg['dependencies'] = deps
  if (Object.keys(devDeps).length > 0) pkg['devDependencies'] = devDeps

  if (config.nodeVersion) {
    pkg['engines'] = { node: config.nodeVersion }
  }

  return JSON.stringify(pkg, null, 2)
}

// ---------------------------------------------------------------------------
// tsconfig.json builder
// ---------------------------------------------------------------------------

function buildTsConfig(framework: FrameworkId): string {
  if (framework === 'nestjs') {
    return JSON.stringify(
      {
        compilerOptions: {
          module: 'commonjs',
          declaration: true,
          removeComments: true,
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
          allowSyntheticDefaultImports: true,
          target: 'ES2021',
          sourceMap: true,
          outDir: './dist',
          baseUrl: './',
          incremental: true,
          skipLibCheck: true,
          strictNullChecks: false,
          noImplicitAny: false,
          strictBindCallApply: false,
          forceConsistentCasingInFileNames: false,
          noFallthroughCasesInSwitch: false,
        },
      },
      null,
      2,
    )
  }

  if (framework === 'nextjs') {
    return JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2017',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [{ name: 'next' }],
          paths: { '@/*': ['./*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      },
      null,
      2,
    )
  }

  if (framework === 'vite') {
    return JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
        },
        include: ['src'],
        references: [{ path: './tsconfig.node.json' }],
      },
      null,
      2,
    )
  }

  // express / fastify / hono
  return JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        module: 'commonjs',
        lib: ['ES2022'],
        outDir: './dist',
        rootDir: './src',
        strict: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        skipLibCheck: true,
      },
      include: ['src'],
    },
    null,
    2,
  )
}

// ---------------------------------------------------------------------------
// Base framework files
// ---------------------------------------------------------------------------

type FileEntry = { path: string; content: string }

function nestjsFiles(config: ProjectConfig): FileEntry[] {
  const name = config.name

  return [
    {
      path: 'src/main.ts',
      content: `import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
`,
    },
    {
      path: 'src/app.module.ts',
      content: `import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`,
    },
    {
      path: 'src/app.controller.ts',
      content: `import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }
}
`,
    },
    {
      path: 'src/app.service.ts',
      content: `import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
}
`,
    },
    {
      path: 'test/app.e2e-spec.ts',
      content: `import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
`,
    },
  ]
}

function expressFiles(_config: ProjectConfig): FileEntry[] {
  return [
    {
      path: 'src/index.ts',
      content: `import app from './app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`)
})
`,
    },
    {
      path: 'src/app.ts',
      content: `import express from 'express'
import router from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)

export default app
`,
    },
    {
      path: 'src/routes/index.ts',
      content: `import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' })
})

export default router
`,
    },
  ]
}

function fastifyFiles(_config: ProjectConfig): FileEntry[] {
  return [
    {
      path: 'src/index.ts',
      content: `import Fastify from 'fastify'
import routes from './routes'

const fastify = Fastify({ logger: true })

fastify.register(routes)

const PORT = Number(process.env.PORT) || 3000

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(\`Server listening at \${address}\`)
})
`,
    },
    {
      path: 'src/routes/index.ts',
      content: `import { FastifyPluginAsync } from 'fastify'

const routes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (_request, _reply) => {
    return { message: 'Hello World!' }
  })
}

export default routes
`,
    },
  ]
}

function honoFiles(_config: ProjectConfig): FileEntry[] {
  return [
    {
      path: 'src/index.ts',
      content: `import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.json({ message: 'Hello World!' }))

export default app
`,
    },
  ]
}

function nextjsFiles(config: ProjectConfig): FileEntry[] {
  return [
    {
      path: 'app/layout.tsx',
      content: `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${config.name}',
  description: '${config.description || 'Generated with Right Away'}',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`,
    },
    {
      path: 'app/page.tsx',
      content: `export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>${config.name}</h1>
      <p>Generated with Right Away</p>
    </main>
  )
}
`,
    },
    {
      path: 'app/api/route.ts',
      content: `import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello from ${config.name} API' })
}
`,
    },
    {
      path: 'next.config.mjs',
      content: `/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
`,
    },
  ]
}

function viteFiles(config: ProjectConfig): FileEntry[] {
  return [
    {
      path: 'src/main.tsx',
      content: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`,
    },
    {
      path: 'src/App.tsx',
      content: `export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>${config.name}</h1>
      <p>Generated with Right Away</p>
    </div>
  )
}
`,
    },
    {
      path: 'index.html',
      content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    },
    {
      path: 'vite.config.ts',
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`,
    },
  ]
}

function getFrameworkFiles(config: ProjectConfig): FileEntry[] {
  switch (config.framework) {
    case 'nestjs':  return nestjsFiles(config)
    case 'express': return expressFiles(config)
    case 'fastify': return fastifyFiles(config)
    case 'hono':    return honoFiles(config)
    case 'nextjs':  return nextjsFiles(config)
    case 'vite':    return viteFiles(config)
  }
}

// ---------------------------------------------------------------------------
// Dependency extra files
// ---------------------------------------------------------------------------

function buildPrismaSchema(): string {
  return `// Prisma schema
// Learn more: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`
}

function buildDrizzleConfig(config: ProjectConfig): string {
  const usePostgres = config.dependencies.includes('docker' as DependencyId)
  const dialect = usePostgres ? 'postgresql' : 'sqlite'
  const fallbackUrl = usePostgres
    ? 'postgres://postgres:postgres@localhost:5432/postgres'
    : 'file:./dev.db'

  return `import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: '${dialect}',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '${fallbackUrl}',
  },
})
`
}

function buildDockerfile(config: ProjectConfig): string {
  const pm = config.packageManager
  const installCmd = pm === 'yarn' ? 'yarn install --frozen-lockfile'
    : pm === 'pnpm' ? 'corepack enable && pnpm install --frozen-lockfile'
    : pm === 'bun'  ? 'bun install'
    : 'npm ci'
  const buildCmd = pm === 'yarn' ? 'yarn build' : pm === 'pnpm' ? 'pnpm build' : pm === 'bun' ? 'bun run build' : 'npm run build'

  return `FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN ${installCmd}
COPY . .
RUN ${buildCmd}

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "dist/index.js"]
`
}

function buildDockerCompose(config: ProjectConfig): string {
  return `version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
`
}

function buildCiYml(config: ProjectConfig): string {
  const pm = config.packageManager
  const installCmd = pm === 'yarn' ? 'yarn install --frozen-lockfile'
    : pm === 'pnpm' ? 'pnpm install --frozen-lockfile'
    : pm === 'bun'  ? 'bun install'
    : 'npm ci'
  const buildCmd = pm === 'yarn' ? 'yarn build' : pm === 'pnpm' ? 'pnpm build' : pm === 'bun' ? 'bun run build' : 'npm run build'

  const pnpmSetup = pm === 'pnpm' ? `
        - uses: pnpm/action-setup@v4
          with:
            version: 9` : ''
  const bunSetup = pm === 'bun' ? `
        - uses: oven-sh/setup-bun@v2
          with:
            bun-version: latest` : ''

  return `name: CI

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4${pnpmSetup}${bunSetup}

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: '${pm === 'bun' ? 'npm' : pm}'

      - name: Install dependencies
        run: ${installCmd}

      - name: Build
        run: ${buildCmd}
`
}

function buildEnvExample(): string {
  return `PORT=3000
NODE_ENV=development
# DATABASE_URL=file:./dev.db
`
}

function buildEslintConfig(language: string): { path: string; content: string } {
  if (language === 'ts') {
    return {
      path: 'eslint.config.mjs',
      content: `import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
]
`,
    }
  }
  return {
    path: '.eslintrc.json',
    content: JSON.stringify(
      {
        env: { node: true, es2022: true },
        extends: ['eslint:recommended'],
        parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      },
      null,
      2,
    ),
  }
}

function buildBiomeJson(): string {
  return JSON.stringify(
    {
      $schema: 'https://biomejs.dev/schemas/1.9.4/schema.json',
      organizeImports: { enabled: true },
      linter: {
        enabled: true,
        rules: { recommended: true },
      },
      formatter: {
        enabled: true,
        indentStyle: 'space',
        indentWidth: 2,
      },
      javascript: {
        formatter: {
          quoteStyle: 'single',
          semicolons: 'asNeeded',
        },
      },
    },
    null,
    2,
  )
}

function buildJestConfig(): string {
  return `import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '^.+\\\\.tsx?$': 'ts-jest',
  },
  testRegex: '.*\\\\.spec\\\\.ts$',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
}

export default config
`
}

function buildVitestConfig(): string {
  return `import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
`
}

// ---------------------------------------------------------------------------
// Always-present files
// ---------------------------------------------------------------------------

function buildGitignore(framework: FrameworkId): string {
  const extras: string[] = []
  if (framework === 'nextjs') extras.push('.next', 'out')
  if (framework === 'vite')   extras.push('dist')

  return [
    'node_modules',
    'dist',
    '.env',
    '.env.local',
    '.DS_Store',
    'coverage',
    ...extras,
  ].join('\n') + '\n'
}

function buildReadme(config: ProjectConfig): string {
  const { name, framework, language, packageManager, description } = config
  const pm = packageManager || 'npm'
  const runPrefix = pm === 'npm' ? 'npm run' : pm

  return `# ${name}

${description || 'Generated with Right Away'}

## Getting Started

\`\`\`bash
# Install dependencies
${pm} install

# Start development server
${runPrefix} dev
\`\`\`

## Available Scripts

| Script | Description |
|--------|-------------|
| \`${runPrefix} dev\`   | Start development server with hot reload |
| \`${runPrefix} build\` | Compile for production |
| \`${runPrefix} start\` | Run the production build |

## Tech Stack

- **Framework**: ${framework}
- **Language**: ${language === 'ts' ? 'TypeScript' : 'JavaScript'}
- **Package Manager**: ${pm}

## CLI Equivalent

\`\`\`bash
right-away new ${name} --framework ${framework} --language ${language} --package-manager ${pm}
\`\`\`

---

*Generated with [Right Away](https://github.com/right-away/right-away)*
`
}

// ---------------------------------------------------------------------------
// Main generator
// ---------------------------------------------------------------------------

export function generateProject(config: ProjectConfig): archiver.Archiver {
  const archive = archiver('zip', { zlib: { level: 9 } })

  const append = (path: string, content: string) => {
    archive.append(Buffer.from(content, 'utf-8'), { name: path })
  }

  // --- Framework base files ---
  const frameworkFiles = getFrameworkFiles(config)
  for (const { path, content } of frameworkFiles) {
    append(path, content)
  }

  // --- Dynamic package.json ---
  append('package.json', buildPackageJson(config))

  // --- tsconfig.json if TypeScript ---
  if (config.language === 'ts') {
    append('tsconfig.json', buildTsConfig(config.framework))
  }

  // --- Extra files per dependency ---
  const deps = config.dependencies as DependencyId[]

  if (deps.includes('prisma')) {
    append('prisma/schema.prisma', buildPrismaSchema())
  }

  if (deps.includes('drizzle')) {
    append('drizzle.config.ts', buildDrizzleConfig(config))
  }

  if (deps.includes('docker')) {
    append('Dockerfile', buildDockerfile(config))
    append('docker-compose.yml', buildDockerCompose(config))
  }

  if (deps.includes('ci')) {
    append('.github/workflows/ci.yml', buildCiYml(config))
  }

  if (deps.includes('config')) {
    append('.env.example', buildEnvExample())
  }

  if (deps.includes('eslint')) {
    const eslintFile = buildEslintConfig(config.language)
    append(eslintFile.path, eslintFile.content)
  }

  if (deps.includes('prettier')) {
    append('.prettierrc', JSON.stringify({ semi: false, singleQuote: true }, null, 2))
  }

  if (deps.includes('biome')) {
    append('biome.json', buildBiomeJson())
  }

  if (deps.includes('jest')) {
    append('jest.config.ts', buildJestConfig())
  }

  if (deps.includes('vitest')) {
    append('vitest.config.ts', buildVitestConfig())
  }

  // --- Always-present files ---
  append('.gitignore', buildGitignore(config.framework))
  append('README.md', buildReadme(config))

  return archive
}
