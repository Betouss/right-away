import type { ProjectConfig } from './types'

export function buildCli(config: ProjectConfig): string {
  const prefix = { npm: 'npm create', yarn: 'yarn create', pnpm: 'pnpm create', bun: 'bun create' }[config.packageManager]
  let cmd = `${prefix} right-away@latest ${config.name || 'my-app'} --template ${config.framework} --${config.language}`
  if (config.moduleSystem === 'cjs') cmd += ' --cjs'
  if (config.dependencies.length) cmd += ` --add ${config.dependencies.join(',')}`
  return cmd
}

export function buildTree(config: ProjectConfig): { text: string; isDir: boolean; depth: number }[] {
  const ext = config.language === 'ts' ? 'ts' : 'js'
  const lines: { text: string; isDir: boolean; depth: number }[] = []
  const root = config.name || 'my-app'
  const push = (depth: number, text: string, isDir = false) => lines.push({ text, isDir, depth })

  push(0, root + '/', true)

  if (config.framework === 'nestjs') {
    push(1, 'src/', true)
    push(2, `main.${ext}`)
    push(2, `app.module.${ext}`)
    push(2, `app.controller.${ext}`)
    push(2, `app.service.${ext}`)
    if (config.dependencies.includes('jwt')) { push(2, 'auth/', true); push(3, `auth.module.${ext}`) }
    push(1, 'test/', true)
    push(2, `app.e2e-spec.${ext}`)
  } else if (config.framework === 'nextjs') {
    push(1, 'app/', true)
    push(2, 'layout.tsx')
    push(2, 'page.tsx')
    push(2, 'api/', true)
    push(3, 'route.ts')
    push(1, 'public/', true)
    push(1, 'next.config.mjs')
  } else if (config.framework === 'vite') {
    push(1, 'src/', true)
    push(2, 'main.tsx')
    push(2, 'App.tsx')
    push(1, 'index.html')
    push(1, `vite.config.${ext}`)
  } else {
    push(1, 'src/', true)
    push(2, `index.${ext}`)
    push(2, `app.${ext}`)
    push(2, 'routes/', true)
    push(3, `index.${ext}`)
  }

  if (config.dependencies.includes('prisma')) { push(1, 'prisma/', true); push(2, 'schema.prisma') }
  if (config.dependencies.includes('docker')) { push(1, 'Dockerfile'); push(1, 'docker-compose.yml') }
  if (config.dependencies.includes('ci')) { push(1, '.github/', true); push(2, 'workflows/', true); push(3, 'ci.yml') }
  if (config.dependencies.includes('config')) push(1, '.env.example')
  if (config.dependencies.includes('eslint')) push(1, config.language === 'ts' ? 'eslint.config.mjs' : '.eslintrc.json')
  if (config.dependencies.includes('prettier')) push(1, '.prettierrc')
  if (config.dependencies.includes('biome')) push(1, 'biome.json')
  if (config.dependencies.includes('jest')) push(1, `jest.config.${ext}`)
  if (config.language === 'ts') push(1, 'tsconfig.json')
  push(1, '.gitignore')
  push(1, 'package.json')
  push(1, 'README.md')

  return lines
}
