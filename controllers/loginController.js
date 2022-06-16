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
    console.log(username, password)
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password or Role not present",
            isLogged: false
        })
    }

    const vars = [username]
    const sql = userQuary.findUser()
    const result = await dbConnection.findExecution(sql, vars)

    //console.log(result)
    if (result.status != 200) {
        res.status(result.status).json({
            message: "Login not successful"
        })
        return
    }
    if (result.result.length == 0) {
        res.status(400).json({
            message: "User not found"
        })
        return
    }
    console.log(result.result[0].User_ID)
    const userId = result.result[0].User_ID
    const userRole = result.result[0].Role
    try {
        bcrypt.compare(password, result.result[0].Password).then((result) => {
            if (result) {
                const maxAge = 3 * 60 * 60;
                const token = jwt.sign({
                        id: userId,
                        username: username,
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
                res.status(200).json({
                    message: "User successfully Logged in",
                    user: userId
                });

            } else {
                res.status(400).json({
                    message: "Login not succesful",
                    user: userId
                });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "An error occurred"
        });
    }
}
