import express from 'express'
const router = express.Router()

router.post('/login', (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Password required.' })
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Wrong password.' })
  }
  res.json({ success: true, token: process.env.ADMIN_PASSWORD })
})

router.post('/verify', (req, res) => {
  const { token } = req.body
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid token.' })
  }
  res.json({ success: true })
})

export default router