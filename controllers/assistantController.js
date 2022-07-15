const dbConnection = require("../db.js")
const orderQuary = require("../quaries/order.quary.js")

exports.postMarkOrderDelvery = async (req, res) => {
    const sql = orderQuary.getOrders()

    const orders = await dbConnection.findExecution(sql)
    if (orders.status != 200) {
        res.status(orders.status).json({
            message: orders.message
        })
        return
    }
    if (orders.result.length == 0) {
        res.status(400).json({
            message: "empty results"
        })
        return
    }
    res.status(200).json({
        message: "success",
        orders: orders
    })
}

exports.postOrders=async (req,res,next)=>{
    const sql = orderQuary.getOrders()
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



exports.markOrderDelvery = async (req, res) => {
    const {
        orderId
    } = req.body
    const sql = orderQuary.setDelivered()
    // sql = mysql.format(sql, [orderId]);

    const result = await dbConnection.updateDeleteExecution(sql,[orderId])
    if (result.status != 200) {
        res.status(result.status).json({
            message: result.message
        })
        return
    }
    res.status(200).json({
        message: "success"
    })
}