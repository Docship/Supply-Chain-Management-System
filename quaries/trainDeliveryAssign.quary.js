exports.addDeliveryComponents = ()=>{
    return 'INSERT INTO train_delivery_assign SET Train_ID =?,Date_Of_Depature  = ?,Time_Of_Depature = ?, Transport_Hours = ?'
}

exports.getDeliveryComponents = ()=>{
    return `SELECT * FROM train_delivery_assign`
}

exports.findDeliveryComponents = ()=>{
    return 'SELECT * FROM train_delivery_assign WHERE Assignment_ID=?'
}


