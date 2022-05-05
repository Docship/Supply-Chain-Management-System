const Mongoose = require('mongoose')

const TrainSchema = new Mongoose.Schema({
    truckNumber: {
        type: String,
        unique: true,
        required: true,
    },
    capacity: {
        type: Number,
        minlength: 6,
        required: true,
    },
})

const Train = Mongoose.model("tarin", TrainSchema)
module.exports = Train