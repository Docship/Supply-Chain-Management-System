const storekeeperQuary = require("../quaries/storekeeper.quary.js")
const trainQuary = require("../quaries/train.quary.js")
const trainDeliveryAssignQuary = require("../quaries/trainDeliveryAssign.quary.js")
const trainOrderDeliveryQuary = require("../quaries/trainOrderDelivery.quary.js")
const customerQuary = require("../quaries/customer.quary.js")
const orderQuary = require("../quaries/order.quary.js")
const routeQuary = require("../quaries/route.quary.js")

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
    }
    const details = {
        username: username,
        password: password,
        fName: fName,
        lName: lName
    }
    userController.createUser(req, res, details, "STOREKEEPER").then(console.log("Finished execution of create storekeeper Function"))
}



exports.updateStorekeeper = async (req, res, next) => {
    const {
        fName,
        lName,
        username
    } = req.body
    // Verifying if role and id is presnt
    if (!fName || !lName || !username) {
        res.status(400).json({
            message: "first name,last name or username not present"
        })
        return
    }
    const storekeeperFindSql = storekeeperQuary.findStorekeeperByUsername()
    const result = await dbConnection.findExecution(storekeeperFindSql, [username])
    if (result.status != 200) {
        res.status(result.status).json({
            message: result.message
        })
        return
    }
    if (result.result.length == 0) {
        res.status(400).json({
            message: "Username not exists"
        })
        return
    }

    const sql = storekeeperQuary.updateStorekeeper()
    const vars = [fName, lName, username]

    const fResult = await dbConnection.updateDeleteExecution(sql, vars)
    if (fResult.status != 200) {
        res.status(fResult.status).json({
            message: fResult.message
        })
        return
    }
    res.status(200).json({
        message: fResult.message
    })
}


exports.deleteStorekeeper = async (req, res, next) => {
    const {
        username
    } = req.body;
    if (!username) {
        res.status(400).json({
            message: "username not present",
        });
        return;
    }
    userController.deleteUserAccount(req, res, username, "STOREKEEPER")
        .then(console.log("Finished execution of delete storekeeper Function"));
}

exports.addTrain = async (req, res, next) => {
    const {
        startCity,
        endCity,
        capacity
    } = req.body

    if (!startCity || !endCity || !capacity) {
        res.status(400).json({
            message: "start city, end city or capacity not present"
        })
        return
    }

    const vars = [startCity, endCity, capacity]
    const sql = trainQuary.insertTrain()

    const result = await dbConnection.insertExecution(sql, vars)

    if (result.status == 200) {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
    } else {
        console.log(result)
        res.status(result.status).json({
            message: result.message
        })
    }
}

exports.updateTrain = async (req, res, next) => {
    const {
        trainId,
        startCity,
        endCity,
        capacity
    } = req.body
    if (!startCity || !endCity || !trainId || !capacity) {
        res.status(400).json({
            message: "train id, start city or end city not present"
        })
        return
    }
    const findTrain = trainQuary.findTrain()

    let train = await dbConnection.findExecution(findTrain, [trainId])
    if (train.status != 200) {
        res.status(train.status).json({
            message: train.message
        })
        return
    }
    if (train.result.length == 0) {
        res.status(400).json({
            message: "Train not exists"
        })
        return
    }

    const sql = trainQuary.updateTrain()
    const vars = [startCity, endCity, capacity, trainId]

    const result_f = await dbConnection.updateDeleteExecution(sql, vars)
    if (result_f.status != 200) {
        res.status(result_f.status).json({
            message: result_f.message
        })
        return
    }
    res.status(200).json({
        message: result_f.message
    })
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
        const findTrain = trainQuary.findTrain()

        let train = await dbConnection.findExecution(findTrain, [trainId])
        if (train.status != 200) {
            res.status(train.status).json({
                message: train.message
            })
            return
        }
        if (train.result.length == 0) {
            res.status(400).json({
                message: "Train not exists"
            })
            return
        }

        const sql = trainQuary.deleteTrain()

        const result = await dbConnection.updateDeleteExecution(sql, [trainId])

        if (result.status != 200) {
            res.status(result.status).json({
                message: result.message
            })
            return
        }
        res.status(200).json({
            message: result.message
        })
    }
}

exports.postDeliveryComponents = async (req, res, next) => {
    try {
        const trainSql = trainQuary.getTrains()
        var trains = await dbConnection.findExecution(trainSql)
        if (trains.status != 200) {
            res.status(400).json({
                message: "An error occurred",
                error: error.message,
                isDelivered: false
            })
        }
        res.status(200).json({
            message: "success",
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
exports.deleteDeliveryComponent =async (req, res, next)=>{

}
exports.deliveryComponents = async (req, res, next) => {
    const {
        trainId,
        dateOfDepature,
        timeOfDepature,
        transportHours
    } = req.body

    if (!trainId || !dateOfDepature || !timeOfDepature || !transportHours) {
        res.status(400).json({
            message: "component missing"
        })
        return
    }
    const trainSql = trainQuary.findTrain()
    let result_f = await dbConnection.findExecution(trainSql, [trainId])

    if (result_f.status != 200 || result_f.result.length == 0) {
        res.status(400).json({
            message: "wrong train id"
        })
        return
    }

    const sql = trainDeliveryAssignQuary.addDeliveryComponents()
    const vars = [trainId, dateOfDepature, timeOfDepature, transportHours]
    const result = await dbConnection.insertExecution(sql, vars)
    if (result.status == 200) {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
    } else {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
    }
}


exports.postAddTrainOrderDelivery = async (req, res, next) => {
    
        const orderSql = orderQuary.getOrders()
        var orders = await dbConnection.findExecution(orderSql)

        const deliverySql = trainDeliveryAssignQuary.getDeliveryComponents()
        var deliveries = await dbConnection.findExecution(deliverySql)

        if ((orders.status != 200 || (deliveries.status != 200))) {
            res.status(404).json({
                message: "An error occurred"
            })
            return
        }if (orders.result.length == 0 || deliveries.result.length == 0) {
            res.status(404).json({
                message: "empty data"
            })
            return
        }
        res.status(200).json({
            message: "success",
            orders: orders,
            deliveries: deliveries
        })
}


exports.addTrainOrderDelivery = async (req, res, next) => {
    const {
        orderId,
        assignmentId
    } = req.body

    const orderSql = orderQuary.findOrder()
    let order = await dbConnection.findExecution(orderSql, [orderId])

    const assignSql = trainDeliveryAssignQuary.findDeliveryComponents()
    let assigns = await dbConnection.findExecution(assignSql, [assignmentId])

    if ((order.status != 200 || order.result.length == 0) || (assigns.status != 200 || assigns.result.length == 0)) {
        res.status(400).json({
            message: "wrong component id/ids'"
        })
        return
    }

    const sql = trainOrderDeliveryQuary.insertTrainOrderDelivery()
    const result = await dbConnection.insertExecution(sql, [orderId, assignmentId])
    if (result.status == 200) {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
    } else {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
    }
}

exports.postAddOrder = async (req, res, next) => {
    
        const customerSql = customerQuary.getCustomers()
        var customers = await dbConnection.findExecution(customerSql)

        const routeSql = routeQuary.getRoutes()
        var routes = await dbConnection.findExecution(routeSql)

        if ((customers.status != 200 || (routes.status != 200))) {
            res.status(404).json({
                message: "An error occurred"
            })
            return
        }if (customers.result.length == 0 || routes.result.length == 0) {
            res.status(404).json({
                message: "empty data"
            })
            return
        }
        
        res.status(200).json({
            message: "success",
            customers: customers,
            routes: routes
        })
    
}

exports.addOrder = async (req, res, next) => {
    const {
        customerId,
        price,
        date,
        routeId,
        isDelivered,
        capacity
    } = req.body

    if (!customerId || !price || !date || !routeId || !isDelivered || !capacity) {
        res.status(400).json({
            message: "component missing",
        })
        return
    }

    const customerSql = customerQuary.findCustomer()
    let customer = await dbConnection.findExecution(customerSql, [customerId])

    const routeSql = routeQuary.findRoute()
    let route = await dbConnection.findExecution(routeSql, [routeId])

    if ((customer.status != 200 || customer.result.length == 0) || (route.status != 200 || route.result.length == 0)) {
        res.status(customer.status).json({
            message: "incorrect id's/ids'"
        })
        return
    }

    const sql = orderQuary.addOrder()
    const vars = [customerId, price, date, routeId, parseInt(isDelivered), capacity]

    const result = await dbConnection.insertExecution(sql, vars)

    if (result.status == 200) {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
    } else {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
    }
}