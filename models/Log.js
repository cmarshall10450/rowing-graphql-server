import mongoose, { Schema } from 'mongoose'

const Log = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    distance: {
      type: Number,
      required: true,
    },
    comments: String,
  },
  { timestamps: true }
)

export default mongoose.model('Log', Log)
