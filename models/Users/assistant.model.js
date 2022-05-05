const Mongoose = require("mongoose")

const AssistantSchema = new Mongoose.Schema({
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

const Assistant = Mongoose.model("assistant", AssistantSchema)
module.exports = Assistant