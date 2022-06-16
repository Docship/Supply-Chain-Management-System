exports.updateOrder = (orderId, isDelivered) => {
    return `UPDATE order SET Is_Delivered = "${isDelivered}" WHERE  Order_ID="${orderId}"`
}
exports.findOrder = () => {
    return 'SELECT * FROM `order` WHERE Order_ID=?'
}
exports.getOrders = () => {
    return "SELECT * FROM `order`"
}
exports.addOrder = () =>{
    return 'INSERT INTO `order` SET Customer_ID  = ?, Price = ?,Date = ?,Route_ID = ?,Is_Delivered=?,Capacity=?'
}

exports.setDelivered = () => {
    return 'UPDATE `order` SET Is_Delivered = 1 WHERE Order_ID=?'
}