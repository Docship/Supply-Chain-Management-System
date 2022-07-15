exports.findAssistantByUserId = (userId)=>{
    return `SELECT * FROM assistant WHERE User_ID="${userId}"`
}
exports.findAssistantByUsername = ()=>{
    return 'SELECT * FROM assistant WHERE User_ID = (select User_ID from user where Username = ?)'
}
exports.findAssistantByAssistantId = ()=>{
    return 'SELECT * FROM assistant WHERE ID=?'
}

//insert Assistant
exports.insertAssistant = ()=>{
    return 'INSERT INTO assistant SET User_ID = (select User_ID from user where User_ID = ?), First_Name = ?,Last_Name = ?';
}

//delete Assistant
exports.deleteAssistant = ()=>{
    return 'DELETE FROM assistant WHERE User_ID =?'
}

//update Assistant
exports.updateAssistant = ()=>{
    return 'UPDATE assistant SET First_Name = ?,Last_Name = ? WHERE User_ID =(SELECT User_ID from user WHERE Username = ?)'
}

exports.getAssistants = ()=>{
    return `SELECT * FROM assistant`
}