exports.insertTruck = (truckNumber,capacity)=>{
    return `INSERT INTO truck SET Truck_Number ="${truckNumber}", Capacity = "${capacity}"`;
}

exports.deleteTruck = (truckNumber)=>{
    return `DELETE FROM truck WHERE Truck_Number ="${truckNumber}" `
}

exports.updateTruck = (truckNumber,capacity)=>{
    return `UPDATE truck SET Capacity = "${capacity}" WHERE  Truck_Number="${truckNumber}"`
}
exports.findTruck = (truckNumber)=>{
    return `SELECT * FROM truck WHERE Truck_Number="${truckNumber}"`
}
exports.getTrucks = ()=>{
    return `SELECT * FROM truck`
}