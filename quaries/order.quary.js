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
exports.findOrderForStartCity=()=>{
    return 'select `order`.* from `order` INNER JOIN route ON route.Route_ID = `order`.`Route_ID` WHERE route.Start_City=? AND `order`.`Order_ID` not IN (SELECT DISTINCT train_order_delivery.Order_ID FROM train_order_delivery)'
}
exports.dindOrderforStartCityTruck=()=>{
    return 'select `order`.* from `order` INNER JOIN route ON route.Route_ID = `order`.`Route_ID` INNER JOIN train_order_delivery on train_order_delivery.Order_ID=`order`.`Order_ID` WHERE route.Start_City=? AND `order`.`Order_ID` not IN (SELECT DISTINCT truck_order_delivery.Order_ID FROM truck_order_delivery)'
}