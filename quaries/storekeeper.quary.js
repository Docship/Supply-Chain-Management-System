exports.findStorekeeperByUserId = (userId)=>{
    return `SELECT * FROM storekeeper WHERE User_ID="${userId}"`
}
exports.findStorekeeperByUsername = (username)=>{
    return `SELECT * FROM storekeeper WHERE User_ID = (select User_ID from user where Username = "${username}")`
}

//insert Storekeeper
exports.insertStorekeeper = (userId,fName,lName)=>{
    return `INSERT INTO storekeeper SET User_ID = (select User_ID from user where User_ID = "${userId}"), First_Name = "${fName}",Last_Name = "${lName}"`;
}

//delete Storekeeper
exports.deleteStorekeeper = (username)=>{
    return `DELETE FROM storekeeper WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}

//update Storekeeper
exports.updateStorekeeper = (fName,lName,username)=>{
    return `UPDATE storekeeper SET First_Name = "${fName}",Last_Name = "${lName}" WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}
