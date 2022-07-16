exports.addDeliveryComponents = ()=>{
    return 'INSERT INTO truck_delivery_assign SET Truck_Number =?, Asssistant_ID  = ?,Route_ID = ?, Driver_ID = ?, Date_Of_Depature = ?, Time_Of_Depature = ?,Transport_Hours = ?'
}

exports.getDeliveryComponents = ()=>{
    return `SELECT * FROM truck_delivery_assign`
}

exports.findDeliveryComponents = ()=>{
    return 'SELECT * FROM truck_delivery_assign WHERE Delivery_ID=?'
}
exports.deleteOrderDeliveryByAssignId = ()=>{
    return 'DELETE FROM truck_delivery_assign WHERE Delivery_ID=?'
}
