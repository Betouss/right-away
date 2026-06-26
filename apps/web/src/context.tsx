import { createContext, useContext, useState } from 'react'
import type { ProjectConfig } from './types'

const DEFAULT_CONFIG: ProjectConfig = {
  framework: 'nestjs',
  language: 'ts',
  moduleSystem: 'esm',
  packageManager: 'pnpm',
  name: 'my-app',
  description: 'A blazing-fast Node.js service',
  version: '0.1.0',
  nodeVersion: '22.x (LTS)',
  author: '',
  license: 'MIT',
  dependencies: ['prisma', 'swagger', 'config'],
}

interface ProjectConfigContextValue {
  config: ProjectConfig
  setConfig: React.Dispatch<React.SetStateAction<ProjectConfig>>
  update: (patch: Partial<ProjectConfig>) => void
}

const ProjectConfigContext = createContext<ProjectConfigContextValue | null>(null)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<ProjectConfig>(DEFAULT_CONFIG)

  const update = (patch: Partial<ProjectConfig>) => {
    setConfig(prev => ({ ...prev, ...patch }))
  }

  return (
    <ProjectConfigContext.Provider value={{ config, setConfig, update }}>
      {children}
    </ProjectConfigContext.Provider>
  )
}

export function useConfig() {
  const ctx = useContext(ProjectConfigContext)
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider')
  return ctx
}
