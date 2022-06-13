exports.insertTruckOrderDelivery = (orderId,deliveryId)=>{
    return `INSERT INTO truck_order_delivery SET Order_ID  ="${orderId}",Delivery_ID = "${deliveryId}"`;
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
exports.insertTruckOrderDelivery = (orederId,deliveryId)=>{
    return `INSERT INTO truck_order_delivery SET Order_ID ="${orederId}", Delivery_ID= "${deliveryId}"`;

}