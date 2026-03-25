import express from 'express'
import Blog from '../models/Blog.js'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find({ published: true }).sort({ createdAt: -1 })
    res.json({ success: true, count: posts.length, data: posts })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true })
    if (!post) return res.status(404).json({ error: 'Not found.' })
    res.json({ success: true, data: post })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { title, tag, content } = req.body
    if (!title || !content) return res.status(400).json({ error: 'Title and content required.' })
    const post = await Blog.create({ title, tag, content })
    res.status(201).json({ success: true, data: post })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router
