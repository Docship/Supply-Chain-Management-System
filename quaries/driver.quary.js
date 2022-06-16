exports.insertDriver = (fName,lName)=>{
    return 'INSERT INTO driver SET First_Name =?, Last_Name = ?'
}

exports.deleteDriver = ()=>{
    return 'DELETE FROM driver WHERE ID =?'
}

exports.updateDriver = ()=>{
    return 'UPDATE driver SET First_Name = ? ,Last_Name = ? WHERE  ID=?'
}
exports.findDriver = ()=>{
    return 'SELECT * FROM driver WHERE ID=?'
}
exports.getDrivers = ()=>{
    return `SELECT * FROM driver`
}