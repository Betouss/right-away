import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app'

describe('GET /api/catalog', () => {
  it('returns 200', async () => {
    const res = await request(app).get('/api/catalog')
    expect(res.status).toBe(200)
  })

  it('returns an array with exactly 7 groups', async () => {
    const res = await request(app).get('/api/catalog')
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body).toHaveLength(7)
  })

  it('each group has a group string and an items array', async () => {
    const res = await request(app).get('/api/catalog')
    for (const group of res.body) {
      expect(typeof group.group).toBe('string')
      expect(group.group.length).toBeGreaterThan(0)
      expect(Array.isArray(group.items)).toBe(true)
    }
  })

  it('all items have id, name, and desc string fields', async () => {
    const res = await request(app).get('/api/catalog')
    for (const group of res.body) {
      for (const item of group.items) {
        expect(typeof item.id).toBe('string')
        expect(typeof item.name).toBe('string')
        expect(typeof item.desc).toBe('string')
      }
    }
  })
})
