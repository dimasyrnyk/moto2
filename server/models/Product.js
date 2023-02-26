const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    category: { type: String, ref: 'Categories', required: true },
    producer: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    quantity: { type: Number, required: true },
    status: { type: Number, required: true },
    price: { type: Number, required: true },
    businessPrice: { type: Number, required: true },
    shortDesc: { type: String, required: true },
    fullDesc: { type: String, required: true }
})

module.exports = model('Product', schema)