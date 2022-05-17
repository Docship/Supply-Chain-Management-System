const storekeeperQuary = require("../quaries/storekeeper.quary.js")

exports.registerStorekeeper = async (req, res, next) => {
    const {
        username,
        password,
        name,
    } = req.body
    userController.createUserAccount(req, res, username, password, "storekeeper").then(async (userId) => {
        const sql = storekeeperQuary.insertStorekeeper(userId, name)
        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            dbConnection.insertExecution(sql).then((adminId) => {
                res.json({
                    message: "Storekeeper successfully created",
                    user: userId,
                });
            })
        } catch (error) {
            userController.findUserAccount(() => {

                userController.updateDeleteExecution(userId).then(() => {
                    res.json({
                        message: "storekeeper not successful created",
                        error: error.mesage,
                    })
                })
            })

        }
    })
    console.log("Finished execution of create storekeeper Function")
}

exports.updateStorekeeper = async (req, res, next) => {
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
        try {
            storekeeperQuary.updateStorekeeperSQL(name, role, username).then(() => {
                res.status("201").json({
                    message: "Update successful",
                    user
                });
            })
        } catch {
            console.log("man-1")
            res.status(400).json({
                message: "An error occurred",
                error: error.message
            });
        }
    }
}

exports.deleteStorekeeper = async (req, res, next) => {
    const {
        userId
    } = req.body

    const sql = storekeeperQuary.deleteStorekeeper(userId)
    try {
        dbConnection.updateDeleteExecution(sql).then(() => {
            userController.deleteUserAccount(userId).then((deletedId) => {
                res.status(201).json({
                    message: "User successfully deleted",
                })
            })
        })
    } catch (error) {
        console.log("man-2");
        res.status(400).json({
            message: "An error occurred",
            error: error.message
        })
    }
}