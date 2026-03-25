import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, trim: true, lowercase: true, match: /^\S+@\S+\.\S+$/ },
  subject: { type: String, trim: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
  read:    { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Contact', contactSchema)
