const { Schema,model } = require('mongoose')

const categorySchema = Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

categorySchema.methods.toJSON = function() {
    const { __v,status,_id,...category } = this.toObject()
    return category
}

module.exports = model('Category', categorySchema)