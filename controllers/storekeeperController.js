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
    const details = {username:username,password:password,fName:fName,lName:lName}
    userController.createUserDummy(req,res,details,"ASSISTANT").then(console.log("Finished execution of create manager Function")
    )
}


exports.updateAssistant = async (req, res, next) => {
    const {
        fName,
        lName,
        username
    } = req.body
    // Verifying if role and id is presnt
    if (!fName || !lName || !username) {
        return res.status(400).json({
            message: "first name,last name or username not present"
        })
    } else {
        const assistantFindSql = assistantQuary.findAssistantByUsername(username)
        dbConnection.findExecution(assistantFindSql).then((result) => {
            if (result.length != 0) {
                const sql = assistantQuary.updateAssistant(fName, lName, username)
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

exports.addDriver = async (req, res, next) => {
    const {
        fName,
        lName
    } = req.body
    const sql = driverQuary.insertDrivet(fName, lName)
    if (!fName || !lName) {
        res.status(400).json({
            message: "first name or last name not present"
        })
    } else {
        try {
            dbConnection.insertExecution(sql).then((result) => {
                res.status(201).json({
                    message: "driver added succesfully",
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
    } else {
        const findDriver = driverQuary.findDriver(driverId)

        let driver = await dbConnection.findExecution(findDriver)
        if (driver.length == 0) {
            res.status(400).json({
                message: "Driver not exists"
            })
        } else {
            const sql = driverQuary.updateDriver(driverId, fName, lName)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "driver updated succesfully",
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

exports.deleteDriver = async (req, res, next) => {
    const {
        driverId
    } = req.body
    if (!driverId) {
        res.status(400).json({
            message: "driver id not present"
        })
    } else {
        const findDriver = driverQuary.findDriver(driverId)

        let driver = await dbConnection.findExecution(findDriver)
        if (driver.length == 0) {
            res.status(400).json({
                message: "Driver not exists"
            })
        } else {
            const sql = driverQuary.deleteDriver(driverId)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "Driver deleted succesfully",
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


exports.addTruck = async (req, res, next) => {
    const {
        truckNumber,
        capacity
    } = req.body
    const sql = truckQuary.insertTruck(truckNumber, capacity)
    if (!truckNumber || !capacity) {
        res.status(400).json({
            message: "truck number or capacity not present",
            isAdded: false
        })
    } else {
        try {
            dbConnection.insertExecution(sql).then((result) => {
                res.status(201).json({
                    message: "truck added succesfully",
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

exports.updateTruck = async (req, res, next) => {
    const {
        truckNumber,
        capacity
    } = req.body
    if (!truckNumber || !capacity) {
        res.status(400).json({
            message: "truck number or capacity id not present"
        })
    } else {
        const findTruck = truckQuary.findTruck(truckNumber)

        let truck = await dbConnection.findExecution(findTruck)
        if (truck.length == 0) {
            res.status(400).json({
                message: "Truck not exists"
            })
        } else {
            const sql = truckQuary.updateTruck(truckNumber, capacity)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "truck updated succesfully",
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

exports.deleteTruck = async (req, res, next) => {
    const {
        truckNumber
    } = req.body
    if (!truckNumber) {
        res.status(400).json({
            message: "truck number not present"
        })
    } else {
        const findTruck = truckQuary.findTruck(truckNumber)

        let truck = await dbConnection.findExecution(findTruck)
        if (truck.length == 0) {
            res.status(400).json({
                message: "Truck not exists"
            })
        } else {
            const sql = truckQuary.deleteTruck(truckNumber)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "Truck deleted succesfully",
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

exports.addRoute = async (req, res, next) => {
    const {
        startCity,
        endCity
    } = req.body
    const sql = routeQuary.insertRoute(startCity, endCity)
    if (!startCity || !endCity) {
        res.status(400).json({
            message: "start city or end city not present",
            isAdded: false
        })
    } else {
        try {
            dbConnection.insertExecution(sql).then((result) => {
                res.status(201).json({
                    message: "route added succesfully",
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
        const findRoute = routeQuary.findRoute(routeId)

        let route = await dbConnection.findExecution(findRoute)
        if (route.length == 0) {
            res.status(400).json({
                message: "Route not exists"
            })
        } else {
            const sql = routeQuary.updateRoute(routeId, startCity, endCity)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "route updated succesfully",
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

exports.deleteRoute = async (req, res, next) => {
    const {
        routeId
    } = req.body
    if (!routeId) {
        res.status(400).json({
            message: "route id not present"
        })
    } else {
        const findRoute = routeQuary.findRoute(routeId)

        let route = await dbConnection.findExecution(findRoute)
        if (route.length == 0) {
            res.status(400).json({
                message: "Route not exists"
            })
        } else {
            const sql = routeQuary.deleteRoute(routeId)
            try {
                dbConnection.updateDeleteExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "Route deleted succesfully",
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

exports.postDeliveryComponents = async (req, res, next) => {

    try {
        const truckSql = truckQuary.getTrucks()
        var trucks = await dbConnection.findExecution(truckSql)

        const assistantSql = assistantQuary.getAssistants()
        var assistants = await dbConnection.findExecution(assistantSql)

        const routeSql = routeQuary.getRoutes()
        var routes = await dbConnection.findExecution(routeSql)

        const driverSql = driverQuary.getDrivers()
        var drivers = await dbConnection.findExecution(driverSql)

        res.status(201).json({
            message:"success",
            isDelivered: true,
            trucks: trucks,
            assistants: assistants,
            drivers: drivers,
            routes: routes
        })
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
            isDelivered: false
        })
    }
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
    } else {
        try {
            const truckSql = truckQuary.findTruck(truckNumber)
            let truck = await dbConnection.findExecution(truckSql)

            const assistantSql = assistantQuary.findAssistantByAssistantId(assistantId)
            let assistant = await dbConnection.findExecution(assistantSql)

            const routeSql = routeQuary.findRoute(routeId)
            let route = await dbConnection.findExecution(routeSql)
            
            if ((truck == -1||truck.length == 0) || (assistant == -1||assistant.length == 0) || (route == -1||route.length == 0)) {
                res.status(401).json({
                    message: "wrong component id or id's or error sql",
                    isAdded: false
                })
            } else {
                try {
                    const sql = truckDeliveryAssignQuary.addDeliveryComponents(truckNumber, driverId, assistantId, routeId, date, time, hours)
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
            res.status(401).json({
                message: "error when finding components",
                isAdded: false
            })
        }
    }
}

exports.postAddTruckOrderDelivery = async (req,res,next)=>{
    try {
        const orderSql = orderQuary.getOrders()
        var orders = await dbConnection.findExecution(orderSql)

        const deliverySql = truckDeliveryAssignQuary.getDeliveryComponents()
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


exports.addTruckOrderDelivery = async (req, res, next) => {
    const {
        orderId,
        deliveryId
    } = req.body

    try {
        const orderSql = orderQuary.findOrder(orderId)
        let order = await dbConnection.findExecution(orderSql)

        const deliverySql = truckDeliveryAssignQuary.findDeliveryComponents(deliveryId)
        let delivery = await dbConnection.findExecution(deliverySql)

        if (order.length == 0 || delivery.length == 0) {
            res.status(400).json({
                message: "wrong ids",
                isAdded: false
            })
        } else {
            try {
                const sql = truckOrderDeliveryQuary.insertTruckOrderDelivery(orderId, deliveryId)
                dbConnection.insertExecution(sql).then((result) => {
                    res.status(201).json({
                        message: "success",
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
    } catch (error) {
        res.send(401).json({
            message: "error when finding Ids",
            isAdded: false
        })
    }
}