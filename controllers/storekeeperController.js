const assistantQuary = require("../quaries/assistant.quary.js")
const userController = require("./userController.js")
const dbConnection = require("../db.js")

exports.registerAssistant = async (req, res, next) => {
    const {
        username,
        password,
        fName,
        lName
    } = req.body
        userController.createUserAccount(req, res, username, password, "assistant").then(async (userId) => {
                console.log("userID: "+userId)
                if (userId == -1) {
                    return -1
                } else {
                    console.log("2222")
                    const sql = assistantQuary.insertAssistant(userId,fName,lName)
                    try {
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        dbConnection.insertExecution(sql).then((adminId) => {
                            //console.log(adminId)
                            res.status(201).json({
                                message: "assistant successfully created",
                                user: userId,
                            });
                        })
                    } catch (error) {
                        userController.deleteUserAccount(username).then(() => {
                            res.json({
                                message: "assistant not successfully created",
                                error: error.mesage,
                            })
                        })
                    }
                }
            })
    console.log("Finished execution of create assistant Function")
}


exports.updateAssistant = async (req, res, next) => {
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
        const assistantFindSql = assistantQuary.findAssistantByUsername(username)
        dbConnection.findExecution(assistantFindSql).then((result) => {
            if (result.length != 0) {
                const sql = assistantQuary.updateAssistant(fName,lName,username)
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


exports.deleteAssistant = async (req, res, next) => {
    const {
        username
    } = req.body
    if (!username) {
        res.status(400).json({
            message: "username not present"
        })
        retuen - 1
    } else {
        const assistantFindSql = assistantQuary.findAssistantByUsername(username)
        dbConnection.findExecution(assistantFindSql).then((result) => {
            console.log(result)
            if (result.length == 0) {
                res.status(400).json({
                    message: "Username not exists"
                })
                return -1
            } else {
                const sql = assistantQuary.deleteAssistant(username)
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