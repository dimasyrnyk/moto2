const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    parentId: {
        type: Types.ObjectId,
        ref: 'Categories',
        default: null
    },
    name: { type: String, required: true, unique: true },
    link: { type: String, required: true, unique: true },
    image: { type: String, required: true }
})

module.exports = model('Category', schema)