import { Router } from 'express'
import { TEMPLATES } from '../data/templates'

const router = Router()

router.get('/templates', (_req, res) => {
  res.json(TEMPLATES)
})

export default router
