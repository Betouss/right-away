import type { Template } from '../types'

export const TEMPLATES: Template[] = [
  { id: 'nestjs',  name: 'NestJS',  desc: 'Scalable server',  mark: 'N', color: '#e0234e' },
  { id: 'express', name: 'Express', desc: 'Minimal & fast',   mark: 'E', color: '#8a8f98' },
  { id: 'fastify', name: 'Fastify', desc: 'Low overhead',     mark: 'F', color: '#3b9c9c' },
  { id: 'hono',    name: 'Hono',    desc: 'Edge runtime',     mark: 'H', color: '#ff7a18' },
  { id: 'nextjs',  name: 'Next.js', desc: 'Fullstack React',  mark: '▲', color: '#e8eaed' },
  { id: 'vite',    name: 'Vite',    desc: 'SPA frontend',     mark: 'V', color: '#a259ff' },
]
