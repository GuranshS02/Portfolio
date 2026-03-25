import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title:     { type: String, required: true, trim: true, maxlength: 200 },
  tag:       { type: String, trim: true, default: 'Engineering' },
  content:   { type: String, required: true, trim: true },
  excerpt:   { type: String, trim: true },
  published: { type: Boolean, default: true },
  views:     { type: Number, default: 0 },
}, { timestamps: true })

blogSchema.pre('save', function (next) {
  if (!this.excerpt && this.content)
    this.excerpt = this.content.substring(0, 150) + '...'
  next()
})

export default mongoose.model('Blog', blogSchema)
