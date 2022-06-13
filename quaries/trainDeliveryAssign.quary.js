exports.addDeliveryComponents = (trainId, dateOfDepature,timeOfDepature,transportHours)=>{
    return `INSERT INTO train_delivery_assign SET Train_ID ="${trainId}",Date_Of_Depature  = "${dateOfDepature}",Time_Of_Depature = "${timeOfDepature}", Transport_Hours = "${transportHours}"`
}

exports.getDeliveryComponents = ()=>{
    return `SELECT * FROM train_delivery_assign`
}

exports.findDeliveryComponents = (assignId)=>{
    return `SELECT * FROM train_delivery_assign WHERE Assignment_ID="${assignId}"`
}

