import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app'

const base = {
  framework: 'nestjs',
  language: 'ts',
  moduleSystem: 'esm',
  packageManager: 'pnpm',
  name: 'test-app',
  description: 'test',
  version: '0.1.0',
  nodeVersion: '22.x',
  author: 'test',
  license: 'MIT',
  dependencies: [],
}

describe('POST /api/generate', () => {
  it('returns 400 if framework is missing', async () => {
    const { framework: _framework, ...body } = base
    const res = await request(app)
      .post('/api/generate')
      .set('Content-Type', 'application/json')
      .send(body)
    expect(res.status).toBe(400)
  })

  it('returns 400 if name is missing', async () => {
    const { name: _name, ...body } = base
    const res = await request(app)
      .post('/api/generate')
      .set('Content-Type', 'application/json')
      .send(body)
    expect(res.status).toBe(400)
  })

  it('returns 200 with Content-Type application/zip for NestJS + TypeScript', async () => {
    const res = await request(app)
      .post('/api/generate')
      .set('Content-Type', 'application/json')
      .send(base)
    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toContain('application/zip')
  })

  it('returns 200 for Express + JavaScript config', async () => {
    const res = await request(app)
      .post('/api/generate')
      .set('Content-Type', 'application/json')
      .send({ ...base, framework: 'express', language: 'js' })
    expect(res.status).toBe(200)
  })

  it('returns 200 for Vite config', async () => {
    const res = await request(app)
      .post('/api/generate')
      .set('Content-Type', 'application/json')
      .send({ ...base, framework: 'vite' })
    expect(res.status).toBe(200)
  })

  it('response body is not empty (has bytes)', async () => {
    const res = await request(app)
      .post('/api/generate')
      .set('Content-Type', 'application/json')
      .send(base)
      .buffer(true)
      .parse((res, callback) => {
        const chunks: Buffer[] = []
        res.on('data', (chunk: Buffer) => chunks.push(chunk))
        res.on('end', () => callback(null, Buffer.concat(chunks)))
      })
    expect(res.status).toBe(200)
    const buf = res.body as Buffer
    expect(buf.length).toBeGreaterThan(0)
  })
})
