import express from 'express'
import Analytics from '../models/Analytics.js'
import Contact from '../models/Contact.js'
import Blog from '../models/Blog.js'
const router = express.Router()

const today = () => new Date().toISOString().split('T')[0]

router.post('/visit', async (req, res) => {
  try {
    await Analytics.findOneAndUpdate({ date: today() }, { $inc: { visits: 1 } }, { upsert: true, new: true })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/click', async (req, res) => {
  try {
    const { project } = req.body
    if (!project) return res.status(400).json({ error: 'Project required.' })
    await Analytics.findOneAndUpdate(
      { date: today() },
      { $inc: { [`projectClicks.${project}`]: 1 } },
      { upsert: true, new: true }
    )
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const last7 = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i))
      return d.toISOString().split('T')[0]
    })

    const records = await Analytics.find({ date: { $in: last7 } })
    const allTime = await Analytics.aggregate([{ $group: { _id: null, total: { $sum: '$visits' } } }])
    const contactCount = await Contact.countDocuments()
    const unreadCount = await Contact.countDocuments({ read: false })
    const blogCount = await Blog.countDocuments({ published: true })

    const weeklyData = last7.map(date => ({
      date,
      visits: records.find(r => r.date === date)?.visits || 0
    }))

    res.json({
      success: true,
      data: {
        totalVisits: allTime[0]?.total || 0,
        weeklyData,
        contactCount,
        unreadCount,
        blogCount
      }
    })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router
