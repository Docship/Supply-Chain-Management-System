const express = require("express")
const loginRouter = express.Router()
const {login} = require("../controllers/loginController.js")

loginRouter.route("/").post(login)
module.exports = loginRouter