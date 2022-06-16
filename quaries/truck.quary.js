exports.insertTruck = ()=>{
    return 'INSERT INTO truck SET Truck_Number =?, Capacity = ?'
}

exports.deleteTruck = ()=>{
    return 'DELETE FROM truck WHERE Truck_Number =?'
}

exports.updateTruck = ()=>{
    return 'UPDATE truck SET Capacity = ? WHERE  Truck_Number=?'
}
exports.findTruck = ()=>{
    return 'SELECT * FROM truck WHERE Truck_Number=?'
}
exports.getTrucks = ()=>{
    return 'SELECT * FROM truck'
}