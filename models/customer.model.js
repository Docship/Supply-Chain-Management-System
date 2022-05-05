const Mongoose = require('mongoose')

const CustomerShema = new Mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
})

const Customer = Mongoose.model("customer", CustomerShema)
module.exports = Customer