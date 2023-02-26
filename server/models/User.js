const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: { type: String, required: true },
    roles: [{ type: String, ref: 'Role' }],
    discount: { type: Number, default: 0 },
    cart: {
        products: [{   
            type: Object,
            _id: { type: Types.ObjectId, ref: 'Product' },
            count: { type: Number },
            price: { type: Number }
        }],
        total: { type: Number, default: 0.00 }
    },
    orders: [
        {
            products: [{   
                type: Object,
                _id: { type: Types.ObjectId, ref: 'Product' },
                count: { type: Number },
                price: { type: Number }
            }],
            total: { type: Number, default: 0.00 }
        }
    ]
})

module.exports = model('User', schema)