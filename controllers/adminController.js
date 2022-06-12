const adminQuary = require("../quaries/admin.quary.js")
const managerQuary = require("../quaries/manager.quary.js")
const userController = require("./userController.js")
const dbConnection = require("../db.js")
// import { setTimeout } from 'timers/promises';
const admin = "ADMIN"
const manager = "MANAGER"
exports.createAdminAccount = async (req, res, next) => {
    const username = "admin55@g.com"
    const password = "123456"
    const name = "bimsara"

    userController.createUserAccount(req, res, username, password, admin).then(async (userId) => {
        console.log(userId)
        if (userId == -1) {
            //console.log("1111")
            return -1
        } else {
            console.log("2222")
            const sql = adminQuary.insertAdmin(userId, name)
            try {
                //await new Promise(resolve => setTimeout(resolve, 3000));
                dbConnection.insertExecution(sql).then((result) => {
                    //console.log(adminId)
                    if (result == -1) {
                        res.status(400).json({
                            message: "error",
                            isAdded: false
                        })
                    } else {
                        res.status(201).json({
                            message: "Admin successfully created",
                            user: userId,
                        });
                    }
                })
            } catch (error) {
                userController.deleteUserAccount(username).then(() => {
                    res.json({
                        message: "admin not successfully created",
                        error: error.mesage,
                    })
                })
            }
        }

    })
    console.log("Finished execution of createAdmin Function")
}


exports.registerManager = async (req, res, next) => {
    const {
        username,
        password,
        fName,
        lName,
        managerRole
    } = req.body

    if (!username || !password || !fName || !lName || !managerRole) {
        res.status(400).json({
            message: "username,password,first name,last name or manager role not present"
        })
        return
    }
    const details = {username:username,password:password,fName:fName,lName:lName,managerRole:managerRole}
    userController.createUserDummy(req,res,details,"MANAGER").then(console.log("Finished execution of create manager Function")
    )
}

exports.updateManager = async (req, res, next) => {
    const {
        fName,
        lName,
        role,
        username
    } = req.body
    // Verifying if role and id is presnt
    // console.log(fName,
    //     lName,
    //     role,
    //     username)
    if (!fName || !lName || !role || !username) {
        return res.status(400).json({
            message: "name or role or username not present"
        })
    } else {
        const managerFindSql = managerQuary.findManagerByUserName(username)
        dbConnection.findExecution(managerFindSql).then((result) => {
            if (result == -1) {
                res.status(400).json({
                    message: "error",
                    isFind: false
                })
            } 
            else if (result.length != 0) {
                const sql = managerQuary.updateManagerSQL(fName, lName, role, username)
                try {
                    dbConnection.updateDeleteExecution(sql).then((result) => {
                        res.status(201).json({
                            message: "Update successful"
                        });
                        return 0
                    })
                } catch (error) {
                    res.status(400).json({
                        message: "An error occurred",
                        error: error.message
                    })
                    return -1
                }
            } else {
                res.status(400).json({
                    message: "Username not exists"
                })
            }
        })

    }
}

exports.deleteManager = async (req, res, next) => {
    const {
        username
    } = req.body
    if (!username) {
        res.status(400).json({
            message: "username not present"
        })
        retuen - 1
    } else {
        const managerFindSql = managerQuary.findManagerByUserName(username)
        dbConnection.findExecution(managerFindSql).then((result) => {
            //console.log(result)
            if (result == -1) {
                res.status(400).json({
                    message: "error",
                    isDelted: false
                })
            } else if (result.length == 0) {
                res.status(400).json({
                    message: "Username not exists",
                    isDelted: false
                })
                return -1
            } else {
                const sql = managerQuary.deleteManager(username)
                //console.log(sql)
                try {
                    dbConnection.updateDeleteExecution(sql).then(async () => {
                        userController.deleteUserAccount(username).then((result) => {
                            res.status(201).json({
                                message: "User successfully deleted",
                                isDelted: true
                            })
                        })
                    }).catch((error) => {
                        throw error
                    })
                } catch (error) {
                    console.log("1");
                    res.status(400).json({
                        message: "An error occurred",
                        error: error.message,
                        isDelted: false
                    })
                    return -1
                }
            }
        })
    }
}