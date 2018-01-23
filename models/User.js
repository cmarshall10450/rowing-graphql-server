import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import validate from 'mongoose-validator'

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validate({
        validator: 'isEmail',
        message: 'Invalid email address',
      }),
    ],
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  weightClass: {
    type: String,
    enum: ['lightweight', 'heavyweight'],
    required: true,
  },
  role: {
    type: String,
    default: 'member',
  },
  logs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Log',
      default: [],
    },
  ],
})

User.pre('save', function(next) {
  let user = this

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

export default mongoose.model('User', User)
