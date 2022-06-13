exports.findAssistantByUserId = (userId)=>{
    return `SELECT * FROM assistant WHERE User_ID="${userId}"`
}
exports.findAssistantByUsername = (username)=>{
    return `SELECT * FROM assistant WHERE User_ID = (select User_ID from user where Username = "${username}")`
}
exports.findAssistantByAssistantId = (assistantId)=>{
    return `SELECT * FROM assistant WHERE ID="${assistantId}"`
}

//insert Assistant
exports.insertAssistant = (userId,fName,lName)=>{
    return `INSERT INTO assistant SET User_ID = (select User_ID from user where User_ID = "${userId}"), First_Name = "${fName}",Last_Name = "${lName}"`;
}

//delete Assistant
exports.deleteAssistant = (username)=>{
    return `DELETE FROM assistant WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}

//update Assistant
exports.updateAssistant = (fName,lName,username)=>{
    return `UPDATE assistant SET First_Name = "${fName}",Last_Name = "${lName}" WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}

exports.getAssistants = ()=>{
    return `SELECT * FROM assistant`
}