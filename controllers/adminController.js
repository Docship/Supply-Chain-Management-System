const adminQuary = require("../quaries/admin.quary.js")
const managerQuary = require("../quaries/manager.quary.js")
const userController = require("./userController.js")
const dbConnection = require("../db.js")
// import { setTimeout } from 'timers/promises';

exports.createAdminAccount = async (req, res, next) => {
    const username = "admin55@g.com"
    const password = "123456"
    const name = "bimsara"
    const role = "admin"

    const adminSearchSql = adminQuary.findAdminByUserName(username)
    let admins =await dbConnection.findExecution(adminSearchSql)

    if (admins.length != 0) {
        res.status(400).json({
            message: "Username already exists"
        })
    }else{
        userController.createUserAccount(req, res, username, password, role).then(async (userId) => {
            console.log(userId)
            if (userId == -1) {
                //console.log("1111")
                return -1
            } else {
                console.log("2222")
                const sql = adminQuary.insertAdmin(userId, name)
                try {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    dbConnection.insertExecution(sql).then((adminId) => {
                        //console.log(adminId)
                        res.status(200).json({
                            message: "Admin successfully created",
                            user: userId,
                        });
                        
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
    }
       
    console.log("Finished execution of createAdmin Function")
}


exports.registerManager = async (req, res, next) => {
    const {
        username,
        password,
        name,
        managerRole
    } = req.body

    userController.createUserAccount(req, res, username, password, "manager").then(async (userId) => {
        if (userId == -1) {
            //console.log(userId)
            return -1
        } else {
            //console.log("2222")
            const sql = managerQuary.insertManager(userId, name, managerRole)
            try {
                await new Promise(resolve => setTimeout(resolve, 5000));
                dbConnection.insertExecution(sql).then((adminId) => {
                    res.json({
                        message: "Manager successfully created",
                        user: userId,
                    });
                    return 0
                }).catch((error) => {
                    throw error
                })
            } catch (error) {
                userController.findUserAccount(username).then(() => {
                    userController.deleteUserAccount(username).then(() => {
                        res.json({
                            message: "manager not successful created",
                            error: error.mesage,
                        })
                    }).catch((error) => {
                        res.json({
                            message: "you cant use this username anymore",
                            error: error.mesage,
                        })
                        return -1
                    })
                })
            }
        }

    })
    //console.log("Finished execution of create manager Function")
}

exports.updateManager = async (req, res, next) => {
    const {
        name,
        role,
        username
    } = req.body
    // Verifying if role and id is presnt
    if (!name || !role || !username) {
        return res.status(400).json({
            message: "name or role or username not present"
        })
    } else {
        const managerFindSql = managerQuary.findManager(username)
        dbConnection.findExecution(managerFindSql).then((result) => {
            if (result.length != 0) {
                const sql = managerQuary.updateManagerSQL(name, role, username)
                try {
                    dbConnection.updateDeleteExecution(sql).then((result) => {
                        //console.log(result)
                        res.status(201).json({
                            message: "Update successful"
                        });
                        return 0
                    }).catch((error) => {
                        console.log("4");
                        res.status(400).json({
                            message: "An error occurred",
                            error: error.message
                        });
                        return -1
                    })
                } catch (error) {
                    //console.log(error)
                    console.log("3");
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
                return -1
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
        retuen -1
    }else{
        const managerFindSql = managerQuary.findManager(username)
        dbConnection.findExecution(managerFindSql).then((result) => {
            //console.log(result)
            if (result.length == 0) {
                res.status(400).json({
                    message: "Username not exists"
                })
                return -1
            }else{
                const sql = managerQuary.deleteManager(username)
                //console.log(sql)
                try {
                    dbConnection.updateDeleteExecution(sql).then(async () => {
                        userController.deleteUserAccount(username).then((result) => {
                            res.status(201).json({
                                message: "User successfully deleted"
                            })
                        })
                    }).catch((error) => {
                        console.log("2");
                        res.status(400).json({
                            message: "An error occurred",
                            error: error.message
                        });
                        return -1
                    })
                } catch (error) {
                    console.log("1");
                    res.status(400).json({
                        message: "An error occurred",
                        error: error.message
                    })
                    return -1
                }
            }
        }) 
    }
}