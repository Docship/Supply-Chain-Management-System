exports.insertTrain = ()=>{
    return 'INSERT INTO train SET Start_City =?, End_City = ?, Capacity = ?';
}

exports.deleteTrain = ()=>{
    return 'DELETE FROM train WHERE Train_ID =?'
}

exports.updateTrain = ()=>{
    return 'UPDATE train SET Start_City =?, End_City = ?, Capacity = ? WHERE  Train_ID=?'
}
exports.findTrain = ()=>{
    return 'SELECT * FROM train WHERE Train_ID=?'
}
exports.getTrains = ()=>{
    return `SELECT * FROM train`
}