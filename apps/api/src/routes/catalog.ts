import { Router } from 'express'
import { CATALOG } from '../data/catalog'

const router = Router()

router.get('/catalog', (_req, res) => {
  res.json(CATALOG)
})

export default router
