import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app'

describe('GET /api/templates', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/api/templates')
    expect(res.status).toBe(200)
  })

  it('returns an array of exactly 6 templates', async () => {
    const res = await request(app).get('/api/templates')
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(6)
  })

  it('each template has id, name, mark, and color string fields', async () => {
    const res = await request(app).get('/api/templates')
    for (const template of res.body) {
      expect(typeof template.id).toBe('string')
      expect(typeof template.name).toBe('string')
      expect(typeof template.mark).toBe('string')
      expect(typeof template.color).toBe('string')
    }
  })
})
