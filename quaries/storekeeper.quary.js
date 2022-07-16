exports.findStorekeeperByUserId = ()=>{
    return 'SELECT * FROM storekeeper WHERE User_ID=?'
}
exports.findStorekeeperByUsername = ()=>{
    return 'SELECT * FROM storekeeper WHERE User_ID = ?'
}

//insert Storekeeper
exports.insertStorekeeper = ()=>{
    return 'INSERT INTO storekeeper SET User_ID = ?, First_Name = ?,Last_Name = ? City=?'
}

//delete Storekeeper
exports.deleteStorekeeper = ()=>{
    return 'DELETE FROM storekeeper WHERE User_ID =?'
}

//update Storekeeper
exports.updateStorekeeper = ()=>{
    return 'UPDATE storekeeper SET First_Name = ?,Last_Name = ?,City=? WHERE User_ID =?'
}
exports.getStorekeepers=()=>{
    return `SELECT storekeeper.*,user.Username from storekeeper INNER JOIN user on user.User_ID=storekeeper.User_ID`
}
// SELECT storekeeper.*,user.Username from storekeeper INNER JOIN user on user.User_ID=storekeeper.User_ID where user.Is_Exist=1