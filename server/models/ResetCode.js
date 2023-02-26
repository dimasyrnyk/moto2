const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    userId: {
      type: Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User'
    },
    code: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300 // this is the expiry time in seconds
    },
})

module.exports = model('ResetCode', schema)