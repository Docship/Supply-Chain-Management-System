exports.updateOrder = (orderId,isDelivered)=>{
    return `UPDATE order SET Is_Delivered = "${isDelivered}" WHERE  Order_ID="${orderId}"`
}
exports.findOrder = (orderId)=>{
    return "SELECT * FROM "+ "`order`"+` WHERE Order_ID=${orderId}`
}
exports.getOrders = ()=>{
    return "SELECT * FROM `order`"
}