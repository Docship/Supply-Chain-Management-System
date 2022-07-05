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
        password,
        role
    } = req.body
    // Check if username and password is provided
    //console.log(username, password)
    if (!username || !password ||!role) {
        return res.status(400).json({
            message: "Username Password or Role not present",
            isLogged: false
        })
    }

    const vars = [username]
    
    switch (role) {
        case "ADMIN":
            roleSql = adminQuary.findAdminByUserName()
            break;
        case "MANAGER":
            roleSql = managerQuary.findManagerByUserName()
            break;
        case "STOREKEEPER":
            roleSql = storekeeperQuary.findStorekeeperByUsername()
            break;
        case "ASSISTANT":
            roleSql = assistantQuary.findAssistantByUsername()
            break;
        default:
            res.status(400).json({
                message: "Wrong role type",
            });
            return
    }
    const result = await dbConnection.findExecution(roleSql,vars)
    // console.log(result)
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
    const sql = userQuary.findUser()
    const userResult = await dbConnection.findExecution(sql, vars)

    // console.log(userResult)
    // console.log(userResult.result[0].User_ID)
    const userId = userResult.result[0].User_ID
    const userRole = userResult.result[0].Role
    try {
        bcrypt.compare(password, userResult.result[0].Password).then((result) => {
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
                    user: userId,
                    role:role
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
