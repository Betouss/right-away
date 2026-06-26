export type FrameworkId = 'nestjs' | 'express' | 'fastify' | 'hono' | 'nextjs' | 'vite'
export type PackageManagerId = 'npm' | 'yarn' | 'pnpm' | 'bun'
export type Language = 'ts' | 'js'
export type ModuleSystem = 'esm' | 'cjs'
export type DependencyId = string

export interface ProjectConfig {
  framework: FrameworkId
  language: Language
  moduleSystem: ModuleSystem
  packageManager: PackageManagerId
  name: string
  description: string
  version: string
  nodeVersion: string
  author: string
  license: string
  dependencies: DependencyId[]
}

export interface DependencyItem {
  id: string
  name: string
  desc: string
}

export interface DependencyGroup {
  group: string
  items: DependencyItem[]
}

export interface Template {
  id: FrameworkId
  name: string
  desc: string
  mark: string
  color: string
}
