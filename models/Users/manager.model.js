const Mongoose = require("mongoose")

const ManagerSchema = new Mongoose.Schema({
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
})

const Manager = Mongoose.model("manager", ManagerSchema)
module.exports = Manager