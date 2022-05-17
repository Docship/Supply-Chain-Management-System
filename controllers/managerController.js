const storekeeperQuary = require("../quaries/storekeeper.quary.js")
const userController = require("./userController.js")
const dbConnection = require("../db.js")

exports.registerStorekeeper = async (req, res, next) => {
    const {
        username,
        password,
        fName,
        lName
    } = req.body
        userController.createUserAccount(req, res, username, password, "storekeeper").then(async (userId) => {
                console.log("userID: "+userId)
                if (userId == -1) {
                    return -1
                } else {
                    console.log("2222")
                    const sql = storekeeperQuary.insertStorekeeper(userId,fName,lName)
                    try {
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        dbConnection.insertExecution(sql).then((adminId) => {
                            //console.log(adminId)
                            res.status(201).json({
                                message: "Storekeeper successfully created",
                                user: userId,
                            });
                        })
                    } catch (error) {
                        userController.deleteUserAccount(username).then(() => {
                            res.json({
                                message: "storekeeper not successfully created",
                                error: error.mesage,
                            })
                        })
                    }
                }
            })
    console.log("Finished execution of create storekeeper Function")
}


exports.updateStorekeeper = async (req, res, next) => {
    const {
        fName,
        lName,
        username
    } = req.body
    // Verifying if role and id is presnt
    if (!fName|| !lName|| !username) {
        return res.status(400).json({
            message: "first name,last name or username not present"
        })
    } else {
        const storekeeperFindSql = storekeeperQuary.findStorekeeperByUsername(username)
        dbConnection.findExecution(storekeeperFindSql).then((result) => {
            if (result.length != 0) {
                const sql = storekeeperQuary.updateStorekeeper(fName,lName,username)
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


exports.deleteStorekeeper = async (req, res, next) => {
    const {
        username
    } = req.body
    if (!username) {
        res.status(400).json({
            message: "username not present"
        })
        retuen - 1
    } else {
        const storekeeperFindSql = storekeeperQuary.findStorekeeperByUsername(username)
        dbConnection.findExecution(storekeeperFindSql).then((result) => {
            console.log(result)
            if (result.length == 0) {
                res.status(400).json({
                    message: "Username not exists"
                })
                return -1
            } else {
                const sql = storekeeperQuary.deleteStorekeeper(username)
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