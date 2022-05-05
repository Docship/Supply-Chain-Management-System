const Mongoose = require('mongoose')

const OrderSchema = new Mongoose.Schema({
    producs: {
        type: [String],
        required: true,
    },
    delevered: {
        type: Boolean,
        default: false,
    },
})

const Order = Mongoose.model("order", OrderSchema)
module.exports = Order