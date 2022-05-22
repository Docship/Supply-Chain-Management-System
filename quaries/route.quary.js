exports.insertRoute = (startCity,endCity)=>{
    return `INSERT INTO route SET Start_City ="${startCity}", End_City = "${endCity}"`;
}

exports.deleteRoute = (routeId)=>{
    return `DELETE FROM route WHERE Route_ID ="${routeId}" `
}

exports.updateRoute = (routeId,startCity,endCity)=>{
    return `UPDATE route SET Start_City ="${startCity}", End_City = "${endCity}" WHERE  Route_ID="${routeId}"`
}
exports.findRoute = (routeId)=>{
    return `SELECT * FROM route WHERE Route_ID=${routeId}`
}
exports.getRoutes = ()=>{
    return `SELECT * FROM route`
}