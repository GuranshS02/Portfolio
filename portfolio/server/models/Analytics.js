import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  date:          { type: String, required: true, unique: true },
  visits:        { type: Number, default: 0 },
  projectClicks: { type: Map, of: Number, default: {} },
}, { timestamps: true })

export default mongoose.model('Analytics', analyticsSchema)
