exports.insertDrivet = (fName,lName)=>{
    return `INSERT INTO driver SET First_Name ="${fName}", Last_Name = "${lName}"`;
}

exports.deleteDriver = (driverId)=>{
    return `DELETE FROM driver WHERE ID ="${driverId}" `
}

exports.updateDriver = (driverId,fName,lName)=>{
    return `UPDATE driver SET First_Name = "${fName}",Last_Name = "${lName}" WHERE  ID="${driverId}"`
}
exports.findDriver = (driverId)=>{
    return `SELECT * FROM driver WHERE ID=${driverId}`
}
exports.getDrivers = ()=>{
    return `SELECT * FROM driver`
}