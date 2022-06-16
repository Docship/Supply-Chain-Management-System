exports.insertTruckOrderDelivery = ()=>{
    return 'INSERT INTO truck_order_delivery SET Order_ID  =?,Delivery_ID = ?';
}
exports.updateTruckOrderDelivery = (orederId,deliveryId,id)=>{
    return `UPDATE truck_order_delivery SET Order_ID ="${orederId}",Delivery_ID = "${deliveryId}" WHERE  ID="${id}"`
}
exports.findTruckOrderDelivery = (id)=>{
    return `SELECT * FROM truck_order_delivery WHERE Delivery_ID="${id}"`
}
exports.getTruckOrderDelivery = ()=>{
    return `SELECT * FROM truck_order_delivery`
}
exports.insertTruckOrderDelivery = ()=>{
    return 'INSERT INTO truck_order_delivery SET Order_ID =?, Delivery_ID= ?'

}