exports.findStorekeeper = (userId)=>{
    return `SELECT * FROM storekeeper WHERE User_ID="${userId}"`
}

//insert Storekeeper
exports.insertStorekeeper = (userId,name)=>{
    return `INSERT INTO storekeeper(User_ID,Name,Role) VALUES("${userId}","${name}")`;
}

//delete Storekeeper
exports.deleteStorekeeper = ()=>{
    return 
}

//update Storekeeper
exports.updateStorekeeperSQL = (name,role,username)=>{
    return `UPDATE storekeeper SET name = "${name}"" WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}") "`
}