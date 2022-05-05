const Mongoose = require('mongoose')

const ProductShcema = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})
const Product = Mongoose.model("product", ProductShcema)
module.exports = Product