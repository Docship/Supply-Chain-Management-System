const Mongoose = require('mongoose')

const TruckSchema = new Mongoose.Schema({
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

const Truck = Mongoose.model("truck", TruckSchema)
module.exports = Truck
