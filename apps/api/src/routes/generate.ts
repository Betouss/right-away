import { Router, Request, Response } from 'express'
import { generateProject } from '../generator'
import type { ProjectConfig } from '../types'

const router = Router()

router.post('/generate', async (req: Request, res: Response) => {
  try {
    const config = req.body as ProjectConfig

    if (!config.framework || !config.name) {
      res.status(400).json({ error: 'framework and name are required' })
      return
    }

    // Provide safe defaults for optional fields
    const fullConfig: ProjectConfig = {
      framework: config.framework,
      name: config.name,
      language: config.language ?? 'ts',
      moduleSystem: config.moduleSystem ?? 'esm',
      packageManager: config.packageManager ?? 'npm',
      description: config.description ?? '',
      version: config.version ?? '0.1.0',
      nodeVersion: config.nodeVersion ?? '>=18.0.0',
      author: config.author ?? '',
      license: config.license ?? 'MIT',
      dependencies: config.dependencies ?? [],
    }

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fullConfig.name}.zip"`,
    )

    const archive = generateProject(fullConfig)

    archive.on('error', (err) => {
      console.error('Archive error:', err)
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to generate project archive' })
      }
    })

    archive.pipe(res)
    await archive.finalize()
  } catch (err) {
    console.error('Generate route error:', err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

export default router
