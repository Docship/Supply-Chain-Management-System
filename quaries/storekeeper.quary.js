exports.findStorekeeperByUserId = (userId)=>{
    return 'SELECT * FROM storekeeper WHERE User_ID=?'
}
exports.findStorekeeperByUsername = ()=>{
    return 'SELECT * FROM storekeeper WHERE User_ID = (select User_ID from user where Username = ?)'
}

//insert Storekeeper
exports.insertStorekeeper = ()=>{
    return 'INSERT INTO storekeeper SET User_ID = (select User_ID from user where User_ID = ?), First_Name = ?,Last_Name = ?';
}

//delete Storekeeper
exports.deleteStorekeeper = ()=>{
    return 'DELETE FROM storekeeper WHERE User_ID =?'
}

//update Storekeeper
exports.updateStorekeeper = ()=>{
    return 'UPDATE storekeeper SET First_Name = ?,Last_Name = ? WHERE User_ID =(SELECT User_ID from user WHERE Username = ?)'
}
exports.getStorekeepers=()=>{
    return `SELECT * FROM storekeeper`
}