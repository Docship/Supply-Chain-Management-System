const assistantQuary = require("../quaries/assistant.quary.js")
const driverQuary = require("../quaries/driver.quary.js")
const truckQuary = require("../quaries/truck.quary.js")
const routeQuary = require("../quaries/route.quary.js")
const truckDeliveryAssignQuary = require("../quaries/truckDeliveryAssign.quary.js")
const truckOrderDeliveryQuary = require("../quaries/truckOrderDelivery.quary.js")
const orderQuary = require("../quaries/order.quary.js")

const userController = require("./userController.js")
const dbConnection = require("../db.js")
const res = require("express/lib/response")
const assistant = "ASSISTANT"



exports.registerAssistant = async (req, res, next) => {
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
        return
    }
    const details = {
        username: username,
        password: password,
        fName: fName,
        lName: lName
    }
    userController.createUser(req, res, details, "ASSISTANT").then(console.log("Finished execution of create manager Function"))
}


exports.updateAssistant = async (req, res, next) => {
    const {
        fName,
        lName,
        username
    } = req.body

    if (!fName || !lName || !username) {
        res.status(400).json({
            message: "first name,last name or username not present"
        })
        return
    }

    const assistantFindSql = assistantQuary.findAssistantByUsername()

    const result = await dbConnection.findExecution(assistantFindSql, [username])
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
    const sql = assistantQuary.updateAssistant()
    const vars = [fName, lName, username]
    const result_f = await dbConnection.updateDeleteExecution(sql, vars)

    if (result_f.status != 200) {
        res.status(result_f.status).json({
            message: result_f.message
        })
        return
    }
    res.status(result_f.status).json({
        message: result_f.message
    })
}

exports.deleteAssistant = async (req, res, next) => {
    const {
        userId
    } = req.body;
    if (!userId) {
        res.status(400).json({
            message: "userId not present",
        });
        return;
    }
    userController.deleteUserAccount(req, res, userId, "ASSISTANT")
        .then(console.log("Finished execution of delete storekeeper Function"));
}

exports.postAssistants=async (req,res,next)=>{
    const sql = assistantQuary.getAssistants()
    let result = await dbConnection.findExecution(sql)
    console.log(result)
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

exports.addDriver = async (req, res, next) => {
    const {
        fName,
        lName
    } = req.body
    if (!fName || !lName) {
        res.status(400).json({
            message: "first name or last name not present"
        })
        return
    }

    const sql = driverQuary.insertDriver()

    const result = await dbConnection.insertExecution(sql, [fName, lName])
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

exports.updateDriver = async (req, res, next) => {
    const {
        driverId,
        fName,
        lName
    } = req.body
    if (!driverId || !fName || !lName) {
        res.status(400).json({
            message: "first name, last name or driver id not present"
        })
        return
    }
    const findDriver = driverQuary.findDriver()
    let driver = await dbConnection.findExecution(findDriver, [driverId])
    if (driver.result.length == 0) {
        res.status(400).json({
            message: "Driver not exists"
        })
        return
    }
    if (driver.status != 200) {
        res.status(driver.status).json({
            message: driver.message
        })
        return
    }
    const sql = driverQuary.updateDriver()
    const vars = [fName, lName, driverId]
    const result = await dbConnection.updateDeleteExecution(sql, vars)

    if (result.status != 200) {
        res.status(result.status).json({
            message: result.message
        })
        return
    }
    res.status(result.status).json({
        message: result.message
    })
}

exports.deleteDriver = async (req, res, next) => {
    const {
        driverId
    } = req.body
    if (!driverId) {
        res.status(400).json({
            message: "driver id not present"
        })
    } else {
        const findDriver = driverQuary.findDriver()

        let driver = await dbConnection.findExecution(findDriver, [driverId])
        if (driver.status != 200) {
            res.status(driver.status).json({
                message: driver.message
            })
            return
        }
        if (driver.result.length == 0) {
            res.status(400).json({
                message: "Driver not exists"
            })
            return
        }
        const sql = driverQuary.deleteDriver()
        const vars = [driverId]
        const result = await dbConnection.updateDeleteExecution(sql, vars)
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

exports.postDrivers=async (req,res,next)=>{
    const sql = driverQuary.getDrivers()
    let result = await dbConnection.findExecution(sql)
    console.log(result)
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




exports.addTruck = async (req, res, next) => {
    const {
        truckNumber,
        capacity
    } = req.body

    if (!truckNumber || !capacity) {
        res.status(400).json({
            message: "truck number or capacity not present"
        })
        return
    }
    const findTruck = truckQuary.findTruck()

    let truck = await dbConnection.findExecution(findTruck, [truckNumber])
    if (truck.status != 200) {
        res.status(truck.status).json({
            message: truck.message
        })
        return
    }
    if (truck.result.length != 0) {
        res.status(400).json({
            message: "Truck already exists"
        })
        return
    }
    const sql = truckQuary.insertTruck()
    const vars = [truckNumber, capacity]
    const result = await dbConnection.insertExecution(sql, vars)

    if (result.status != 200) {
        res.status(result.status).json({
            message: result.message
        })
    }
    res.status(result.status).json({
        message: result.message
    })
}

exports.updateTruck = async (req, res, next) => {
    const {
        truckNumber,
        capacity
    } = req.body
    if (!truckNumber || !capacity) {
        res.status(400).json({
            message: "truck number or capacity id not present"
        })
        return
    }
    const findTruck = truckQuary.findTruck()

    let truck = await dbConnection.findExecution(findTruck, [truckNumber])
    if (truck.status != 200) {
        res.status(truck.status).json({
            message: truck.message
        })
        return
    }
    if (truck.result.length == 0) {
        res.status(400).json({
            message: "Truck not exists"
        })
        return
    }
    const sql = truckQuary.updateTruck()
    const vars = [capacity, truckNumber]
    const result = await dbConnection.updateDeleteExecution(sql, vars)
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

exports.deleteTruck = async (req, res, next) => {
    const {
        truckNumber
    } = req.body
    if (!truckNumber) {
        res.status(400).json({
            message: "truck number not present"
        })
    } else {
        const findTruck = truckQuary.findTruck()

        let truck = await dbConnection.findExecution(findTruck, [truckNumber])
        if (truck.status != 200) {
            res.status(truck.status).json({
                message: truck.message
            })
        }
        if (truck.result.length == 0) {
            res.status(400).json({
                message: "Truck not exists"
            })
        }
        const sql = truckQuary.deleteTruck()
        const vars = [truckNumber]
        const result = await dbConnection.updateDeleteExecution(sql, vars)

        if (result.status != 200) {
            res.status(result.status).json({
                message: result.message
            })
        }
        res.status(400).json({
            message: result.message
        })
    }
}

exports.postTrucks=async (req,res,next)=>{
    const sql = truckQuary.getTrucks()
    let result = await dbConnection.findExecution(sql)
    console.log(result)
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


exports.addRoute = async (req, res, next) => {
    const {
        startCity,
        endCity
    } = req.body
    if (!startCity || !endCity) {
        res.status(400).json({
            message: "start city or end city not present"
        })
        return
    }
    const sql = routeQuary.insertRoute()

    const result = await dbConnection.insertExecution(sql, [startCity, endCity])

    if (result.status != 200) {
        res.status(result.status).json({
            message: result.message
        })
        return
    }
    res.status(result.status).json({
        message: result.message
    })

}

exports.updateRoute = async (req, res, next) => {
    const {
        routeId,
        startCity,
        endCity
    } = req.body
    if (!startCity || !endCity || !routeId) {
        res.status(400).json({
            message: "route id, start city or end city not present"
        })
    } else {
        const findRoute = routeQuary.findRoute()

        let route = await dbConnection.findExecution(findRoute,[routeId])
        if (route.status != 200) {
            res.status(route.status).json({
                message: route.message
            })
            return
        }
        if (route.result.length == 0) {
            res.status(400).json({
                message: "Route not exists"
            })
            return
        }
        const sql = routeQuary.updateRoute()

        const vars = [startCity, endCity, routeId]
        const result_f = await dbConnection.updateDeleteExecution(sql,vars)
        if (result_f.status != 200) {
            res.status(result_f.status).json({
                message: result_f.message
            })
            return
        }
        res.status(result_f.status).json({
            message: result_f.message
        })
    }
}

exports.deleteRoute = async (req, res, next) => {
    const {
        routeId
    } = req.body
    if (!routeId) {
        res.status(400).json({
            message: "route id not present"
        })
        return
    }
    const findRoute = routeQuary.findRoute()

    let route = await dbConnection.findExecution(findRoute, [routeId])
    if (route.status != 200) {
        res.status(route.status).json({
            message: route.message
        })
        return
    }
    if (route.result.length == 0) {
        res.status(400).json({
            message: "Route not exists"
        })
        return
    }

    const sql = routeQuary.deleteRoute()
    const vars = [routeId]
    const result_f = await dbConnection.updateDeleteExecution(sql,vars)

    if (result_f.status != 200) {
        res.status(result_f.status).json({
            message: result_f.message
        })
        return
    }
    res.status(result_f.status).json({
        message: result_f.message
    })
}

exports.postRoutes=async (req,res,next)=>{
    const sql = routeQuary.getRoutes()
    let result = await dbConnection.findExecution(sql)
    console.log(result)
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



exports.postDeliveryComponents = async (req, res, next) => {


    const truckSql = truckQuary.getTrucks()
    var trucks = await dbConnection.findExecution(truckSql)

    const assistantSql = assistantQuary.getAssistants()
    var assistants = await dbConnection.findExecution(assistantSql)

    const routeSql = routeQuary.getRoutes()
    var routes = await dbConnection.findExecution(routeSql)

    const driverSql = driverQuary.getDrivers()
    var drivers = await dbConnection.findExecution(driverSql)

    if ((trucks.status != 200) || (assistants.status != 200) || (routes.status != 200) || (drivers.status != 200)) {
        res.status(400).json({
            message: "Route not exists"
        })
        return
    }
    if ((trucks.result.length == 0) || (assistants.result.length == 0) || (routes.result.length == 0) || (drivers.result.length == 0)) {
        res.status(400).json({
            message: "Route not exists"
        })
        return
    }
    res.status(200).json({
        message: "success",
        trucks: trucks,
        assistants: assistants,
        drivers: drivers,
        routes: routes
    })

}


exports.addDeliveryComponents = async (req, res, next) => {
    const {
        truckNumber,
        driverId,
        assistantId,
        routeId,
        date,
        time,
        hours
    } = req.body

    if (!truckNumber || !driverId || !assistantId || !routeId || !date || !time || !hours) {
        res.status(401).json({
            message: "component missing",
            isAdded: false
        })
        return
    }
    const truckSql = truckQuary.findTruck()
    let truck = await dbConnection.findExecution(truckSql, [truckNumber])

    const assistantSql = assistantQuary.findAssistantByAssistantId()
    let assistant = await dbConnection.findExecution(assistantSql, [assistantId])

    const routeSql = routeQuary.findRoute()
    let route = await dbConnection.findExecution(routeSql, [routeId])

    if ((truck.status != 200) || (assistant.status != 200) || (route.status != 200)) {
        res.status(404).json({
            message: "error"
        })
        return
    }
    if ((truck.result.length == 0) || (assistant.result.length == 0) || (route.result.length == 0)) {
        res.status(400).json({
            message: "component empty not exists"
        })
        return
    }
    const vars = [truckNumber, assistantId, routeId, driverId, date, time, hours]
    const sql = truckDeliveryAssignQuary.addDeliveryComponents()
    const result = await dbConnection.insertExecution(sql, vars)

    if (result.status == 200) {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
        return
    }
    res.status(result.status).json({
        message: result.message,
        result: result.result
    })
}

exports.postAllDeliveryComponents=async (req,res,next)=>{
    const sql = truckDeliveryAssignQuary.getDeliveryComponents()
    let result = await dbConnection.findExecution(sql)
    console.log(result)
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

exports.postAddTruckOrderDelivery = async (req, res, next) => {

    const orderSql = orderQuary.getOrders()
    var orders = await dbConnection.findExecution(orderSql)

    const deliverySql = truckDeliveryAssignQuary.getDeliveryComponents()
    var deliveries = await dbConnection.findExecution(deliverySql)
    if ((orders.status != 200) || (deliveries.status != 200)) {
        res.status(404).json({
            message: "error"
        })
        return
    }
    if ((orders.result.length == 0) || (deliveries.result.length == 0)) {
        res.status(400).json({
            message: "component empty"
        })
        return
    }
    res.status(200).json({
        message: "success",
        orders: orders,
        deliveries: deliveries
    })
}


exports.addTruckOrderDelivery = async (req, res, next) => {
    const {
        orderId,
        deliveryId
    } = req.body

    const orderSql = orderQuary.findOrder()
    let order = await dbConnection.findExecution(orderSql, [orderId])

    const deliverySql = truckDeliveryAssignQuary.findDeliveryComponents()
    let delivery = await dbConnection.findExecution(deliverySql, [deliveryId])

    if ((order.status != 200) || (delivery.status != 200)) {
        res.status(404).json({
            message: "error"
        })
        return
    }
    if ((order.result.length == 0) || (delivery.result.length == 0)) {
        res.status(400).json({
            message: "component empty"
        })
        return
    }
    const sql = truckOrderDeliveryQuary.insertTruckOrderDelivery()
    const vars = [orderId, deliveryId]
    const result = await dbConnection.insertExecution(sql, vars)

    if (result.status == 200) {
        res.status(result.status).json({
            message: result.message,
            result: result.result
        })
        return
    }
    res.status(result.status).json({
        message: result.message,
        result: result.result
    })
}

exports.postTrucksTruckOrderDelivery=async (req,res,next)=>{
    const sql = truckOrderDeliveryQuary.getTruckOrderDelivery()
    let result = await dbConnection.findExecution(sql)
    console.log(result)
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