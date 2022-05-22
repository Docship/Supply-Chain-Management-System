const storekeeperQuary = require("../quaries/storekeeper.quary.js")
const trainQuary = require("../quaries/train.quary.js")
const trainDeliveryAssignQuary = require("../quaries/trainDeliveryAssign.quary.js")
const trainOrderDeliveryQuary = require("../quaries/trainOrderDelivery.quary.js")

const orderQuary = require("../quaries/order.quary.js")
const userController = require("./userController.js")
const dbConnection = require("../db.js")
const req = require("express/lib/request")
const storekeeper = "STOREKEEPER"

exports.registerStorekeeper = async (req, res, next) => {
    const {
        username,
        password,
        fName,
        lName
    } = req.body
    if (!fName || !lName || !password || !username) {
        res.status(400).json({
            message: "first name, last name, password or username not present"
        })
    }else{
        userController.createUserAccount(req, res, username, password, storekeeper).then(async (userId) => {
            console.log("userID: "+userId)
            if (userId == -1) {
                return -1
            } else {
                console.log("2222")
                const sql = storekeeperQuary.insertStorekeeper(userId,fName,lName)
                try {
                    //await new Promise(resolve => setTimeout(resolve, 3000));
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
    }  
    //console.log("Finished execution of create storekeeper Function")
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


exports.addTrain = async (req, res, next) => {
    const {
        startCity,
        endCity,capacity
    } = req.body
    const sql = trainQuary.insertTrain(startCity, endCity,capacity)
    if (!startCity || !endCity||!capacity) {
        res.status(400).json({
            message: "start city, end city or capacity not present",
            isAdded: false
        })
    } else {
        try {
            dbConnection.insertExecution(sql).then((result) => {
                res.status(201).json({
                    message: "train added succesfully",
                    isAdded: true
                })
            })
        } catch (error) {
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
                isAdded: false
            })
        }
    }
}

exports.updateTrain = async (req, res, next) => {
    const {
        trainId,
        startCity,
        endCity,
        capacity
    } = req.body
    if (!startCity || !endCity || !trainId||!capacity) {
        res.status(400).json({
            message: "train id, start city or end city not present"
        })
    } else {
        const findTrain = trainQuary.findTrain(trainId)

        let train = await dbConnection.findExecution(findTrain)
        if (train.length == 0) {
            res.status(400).json({
                message: "Train not exists"
            })
        } else {
            const sql = trainQuary.updateTrain(trainId, startCity, endCity, capacity)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "train updated succesfully",
                        isUpdated: true
                    })
                })
            } catch (error) {
                res.status(400).json({
                    message: "An error occurred",
                    error: error.message,
                    isUpdated: false
                })
            }
        }
    }
}

exports.deleteTrain = async (req, res, next) => {
    const {
        trainId
    } = req.body
    if (!trainId) {
        res.status(400).json({
            message: "train id not present"
        })
    } else {
        const findTrain = trainQuary.findTrain(trainId)

        let train = await dbConnection.findExecution(findTrain)
        if (train.length == 0) {
            res.status(400).json({
                message: "Train not exists"
            })
        } else {
            const sql = trainQuary.deleteTrain(trainId)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "Train deleted succesfully",
                        isDeleted: true
                    })
                })
            } catch (error) {
                res.status(400).json({
                    message: "An error occurred",
                    error: error.message,
                    isDeleted: false
                })
            }
        }
    }
}

exports.postDeliveryComponents=async (req,res,next)=>{
    try {
        const trainSql = trainQuary.getTrains()
        var trains = await dbConnection.findExecution(trainSql)

        res.status(201).json({
            message:"success",
            isDelivered: true,
            trains: trains,
        })
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
            isDelivered: false
        })
    }
}

exports.deliveryComponents = async  (req,res,next)=>{
    const {
        trainId,
        dateOfDepature,
        timeOfDepature,
        transportHours
    } = req.body

    if (!trainId || !dateOfDepature || !timeOfDepature || !transportHours) {
        res.send(401).json({
            message: "component missing",
            isAdded: false
        })
    } else {
        try {
            const trainSql = trainQuary.findTrain(trainId)
            let train = await dbConnection.findExecution(trainSql)

            if (train.length == 0) {
                res.send(401).json({
                    message: "wrong train id ",
                    isAdded: false
                })
            } else {
                try {
                    const sql = trainDeliveryAssignQuary.addDeliveryComponents(trainId,dateOfDepature,timeOfDepature,transportHours)
                    dbConnection.insertExecution(sql).then((result) => {
                        res.status(201).json({
                            message: "Delivery components added",
                            isAdded: true
                        })
                    })
                } catch (error) {
                    res.status(400).json({
                        message: "An error occurred",
                        isAdded: false
                    })
                }
            }
        } catch {
            res.send(401).json({
                message: "error when finding components",
                isAdded: false
            })
        }
    }
}


exports.postAddTrainOrderDelivery = async (req,res,next)=>{
    try {
        const orderSql = orderQuary.getOrders()
        var orders = await dbConnection.findExecution(orderSql)

        const deliverySql = trainDeliveryAssignQuary.getDeliveryComponents()
        var deliveries = await dbConnection.findExecution(deliverySql)

        res.status(201).json({
            message:"success",
            isDelivered: true,
            orders: orders,
            deliveries: deliveries
        })
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
            isDelivered: false
        })
    }
}


exports.addTrainOrderDelivery = async (req, res, next) => {
    const {
        orderId,
        assignmentId
    } = req.body

    try {
        const orderSql = orderQuary.findOrder(orderId)
        let order = await dbConnection.findExecution(orderSql)

        const assignSql = trainDeliveryAssignQuary.findDeliveryComponents(assignmentId)
        let assigns = await dbConnection.findExecution(assignSql)
       
        if ((order==-1 || order.length == 0) || (assigns==-1 || assigns.length == 0)) {
            res.status(400).json({
                message: "error",
                isAdded: false
            })
        } else {
            try {
                const sql = trainOrderDeliveryQuary.insertTrainOrderDelivery(orderId, assignmentId)
                dbConnection.insertExecution(sql).then((result) => {
                    if (result == -1) {
                        res.status(400).json({
                            message: "error",
                            isAdded: false
                        })
                    }else{
                        res.status(201).json({
                            message: "success",
                            isAdded: true
                        })
                    }
                    
                }).catch((err)=>{throw new Error(err)})
            } catch (error) {
                res.status(400).json({
                    message: error.message,
                    isAdded: false
                })
            }
        }
    } catch (error) {
        res.status(401).json({
            message: "error when finding Ids",
            isAdded: false
        })
    }
}