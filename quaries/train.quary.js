exports.insertTrain = (startCity,endCity,capacity)=>{
    return `INSERT INTO train SET Start_City ="${startCity}", End_City = "${endCity}", Capacity = "${capacity}"`;
}

exports.deleteTrain = (trainId)=>{
    return `DELETE FROM train WHERE Train_ID ="${trainId}" `
}

exports.updateTrain = (trainId, startCity, endCity, capacity)=>{
    return `UPDATE train SET Start_City ="${startCity}", End_City = "${endCity}", Capacity = "${capacity}" WHERE  Train_ID="${trainId}"`
}
exports.findTrain = (trainId)=>{
    return `SELECT * FROM train WHERE Train_ID="${trainId}"`
}
exports.getTrains = ()=>{
    return `SELECT * FROM train`
}