exports.addDeliveryComponents = (truckNumber, driverId, assistantId, routeId,date,time,hours)=>{
    return `INSERT INTO truck_delivery_assign SET Truck_Number ="${truckNumber}", Asssistant_ID  = "${assistantId}",Route_ID = "${routeId}", Driver_ID = "${driverId}", Date_Of_Depature = "${date}", Time_Of_Depature = "${time}",Transport_Hours = "${hours}"`
}

exports.getDeliveryComponents = ()=>{
    return `SELECT * FROM truck_delivery_assign`
}

exports.findDeliveryComponents = (deliveryId)=>{
    return `SELECT * FROM truck_delivery_assign WHERE Delivery_ID="${deliveryId}"`
}

