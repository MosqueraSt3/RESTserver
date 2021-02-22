const { Schema,model } = require('mongoose')

const itemSchema = Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    available: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

itemSchema.methods.toJSON = function() {
    const { __v,status,_id,...item } = this.toObject()
    item.uid = _id
    return item
}

module.exports = model('Item', itemSchema)