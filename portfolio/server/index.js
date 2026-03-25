import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import contactRoutes from './routes/contact.js'
import blogRoutes from './routes/blog.js'
import analyticsRoutes from './routes/analytics.js'
import authRoutes from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '10kb' }))
app.use('/api', limiter)

app.use('/api/contact', contactRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/auth', authRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`))
  })
  .catch(err => { console.error('❌ MongoDB error:', err.message); process.exit(1) })
