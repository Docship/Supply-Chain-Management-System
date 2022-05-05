const Manager = require("../models/Users/manager.model.js")
const Admin = require("../models/Users/admin.model.js")
const Assistant = require("../models/Users/assistant.model.js")
const Storekeeper = require("../models/Users/storekeeper.model.js")
const Order = require("../models/Utils/order.model.js")
const Train = require("../models/Utils/train.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecrete = '231e07bf113b22fabaca321b96e015aea7e853d91de217d264891f54a3fbce2f2831ea'

exports.login = async (req, res, next) => {
    const {
        username,
        password,
        role
    } = req.body
    // Check if username and password is provided
    if (!username || !password || !role) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        var person;
        switch (role) {
            case "admin":
                person = Admin
                break;
            case "manager":
                person = Manager
                break;
            case "assistant":
                person = Assistant
                break;
            case "storekeeper":
                person = Storekeeper
                break;
            default:
                return res.status(400).json({
                    message: "Role not exists",
                })
                break;
        }

        const user = await person.findOne({
            username
        })

        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign({
                            id: user._id,
                            username,
                            role: user.role
                        },
                        jwtSecrete, {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201);
                    switch (role) {
                        case "admin":
                            adminDashboadLoader(res, user)
                            break;
                        case "manager":
                            managerDashboadLoader(res, user)
                            break;
                        case "assistant":
                            assistantDashboadLoader(res, user)
                            break;
                        default:
                            return res.status(400).json({
                                message: "Role not exists",
                            })
                            break;
                    }

                } else {
                    res.status(400).json({
                        message: "Login not succesful"
                    });
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

function adminDashboadLoader(res, user) {
    res.json({
        message: "Admin successfully Logged in",
        user: user._id,
    })
}

async function assistantDashboadLoader(res, user) {
    const orders = await Order.find({})
    res.json({
        user: user,
        orders: orders
    })
}

async function managerDashboadLoader(res, user) {
    const trains = await Train.find({})
    res.json({
        user: user,
        trains: trains
    })
}