import express from 'express'
import nodemailer from 'nodemailer'
import Contact from '../models/Contact.js'

const router = express.Router()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message)
      return res.status(400).json({ error: 'Name, email and message required.' })

    // Save to MongoDB
    const contact = await Contact.create({ name, email, subject, message })

    // Send email notification
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New message from ${name} — ${subject || 'Portfolio Contact'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;border:1px solid #e0d9ce;border-radius:12px;">
          <h2 style="color:#c8531a;margin-bottom:4px;">New Portfolio Message</h2>
          <p style="color:#6b6660;font-size:13px;margin-bottom:24px;">Someone reached out through your portfolio contact form.</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;font-size:13px;color:#6b6660;width:80px;">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;font-size:14px;font-weight:600;color:#0f0e0c;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;font-size:13px;color:#6b6660;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;font-size:14px;color:#1a6bc8;">
                <a href="mailto:${email}" style="color:#1a6bc8;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;font-size:13px;color:#6b6660;">Subject</td>
              <td style="padding:10px 0;border-bottom:1px solid #f0ebe3;font-size:14px;color:#0f0e0c;">${subject || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;font-size:13px;color:#6b6660;vertical-align:top;">Message</td>
              <td style="padding:10px 0;font-size:14px;color:#0f0e0c;line-height:1.7;">${message}</td>
            </tr>
          </table>

          <div style="margin-top:24px;padding:16px;background:#faf7f2;border-radius:8px;">
            <p style="margin:0;font-size:12px;color:#6b6660;">Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email,
    })

    res.status(201).json({ success: true, message: 'Message sent!', id: contact._id })
  } catch (err) {
    console.error('Contact error:', err.message)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, count: messages.length, data: messages })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.patch('/:id/read', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    if (!contact) return res.status(404).json({ error: 'Not found.' })
    res.json({ success: true, data: contact })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

export default router