exports.insertTrainOrderDelivery = ()=>{
    return 'INSERT INTO train_order_delivery SET Order_ID  =?, Assignment_ID = ?';
}
exports.updateTrainOrderDelivery = (orederId,assignmentId,id)=>{
    return `UPDATE train_order_delivery SET Order_ID ="${orederId}", Assignment_ID  = "${assignmentId}" WHERE  ID="${id}"`
}
exports.findTrainOrderDelivery = (id)=>{
    return `SELECT * FROM train_order_delivery WHERE Assignment_ID ="${id}"`
}
exports.getTrainOrderDelivery = ()=>{
    return `SELECT * FROM train_order_delivery`
}
