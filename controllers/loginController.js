const dbConnection = require("../db.js")
const userQuary = require("../quaries/user.quary.js")
const adminQuary = require("../quaries/admin.quary.js")
const managerQuary = require("../quaries/manager.quary.js")
const assistantQuary = require("../quaries/assistant.quary.js")
const storekeeperQuary = require("../quaries/storekeeper.quary.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecrete = '231e07bf113b22fabaca321b96e015aea7e853d91de217d264891f54a3fbce2f2831ea'



exports.login = async (req, res, next) => {
    const {
        username,
        password
    } = req.body
    // Check if username and password is provided
    console.log(username,password)
    if (!username || !password ) {
        return res.status(400).json({
            message: "Username or Password or Role not present",
            isLogged:false
        })
    }
    try {
        const sql = userQuary.findUser(username)
        dbConnection.findExecution(sql).then((user) => {
            console.log(user)
            if (user.length == 0) {
                res.status(401).json({
                    message: "Login not successful",
                    error: "User not found",
                    isLogged:false
                })
            } else {
                const userId = user[0].User_ID
                const userRole = user[0].Role
                bcrypt.compare(password, user[0].Password).then((result) => {
                    if (result) {
                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign({
                                id: userId,
                                username:username,
                                role: userRole
                            },
                            jwtSecrete, {
                                expiresIn: maxAge, // 3hrs in sec
                            }
                        );
                        res.cookie("jwt", token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000, // 3hrs in ms
                        });
                        res.status(201).json({
                            message: "User successfully Logged in",
                            user: userId,
                            isLogged:true
                        });
                        
                    } else {
                        res.status(400).json({
                            message: "Login not succesful",
                            user: userId,
                            isLogged:false
                        });
                    }
                })
            }
        })
    } catch (error) {
        console.log("login");
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

// function adminDashboadLoader(res, user) {
//     res.json({
//         message: "Admin successfully Logged in",
//         user: user._id,
//     })
// }

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