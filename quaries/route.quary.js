exports.insertRoute = ()=>{
    return 'INSERT INTO route SET Start_City = ?, End_City = ?';
}

exports.deleteRoute = ()=>{
    return 'DELETE FROM route WHERE Route_ID =?'
}

exports.updateRoute = ()=>{
    return 'UPDATE route SET Start_City =?, End_City = ? WHERE  Route_ID=?'
}
exports.findRoute = ()=>{
    return 'SELECT * FROM route WHERE Route_ID=?'
}
exports.getRoutes = ()=>{
    return `SELECT * FROM route`
}