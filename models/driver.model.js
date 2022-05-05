const Mongoose = require('mongoose')

const DriverSchema = new Mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    hours: {
        type: Number,
        default: 0,
        required: true,
    },
})

const Driver = Mongoose.model("customer", DriverSchema)
module.exports = Driver