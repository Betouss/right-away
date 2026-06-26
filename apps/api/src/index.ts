import express from 'express'
import cors from 'cors'
import catalogRouter from './routes/catalog'
import templatesRouter from './routes/templates'
import generateRouter from './routes/generate'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

// Routes
app.use('/api', catalogRouter)
app.use('/api', templatesRouter)
app.use('/api', generateRouter)

app.listen(PORT, () => {
  console.log(`Right Away API running on http://localhost:${PORT}`)
})

export default app
