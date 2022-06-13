exports.findManagerByUserName = (username)=>{
    return `SELECT * FROM staff_member WHERE User_ID = (select User_ID from user where Username = "${username}")`
}
exports.findManagerByUserId = (username)=>{
    return `SELECT * FROM staff_member WHERE User_ID ="${username}"`
}

//insert manager
exports.insertManager = (userId,fName,lName,managerRole)=>{
    return `INSERT INTO staff_member SET User_ID = (select User_ID from user where User_ID = "${userId}"), First_Name = "${fName}",Last_Name = "${lName}",Role = "${managerRole}"`;
}

//delete manager
exports.deleteManager = (username)=>{
    return `DELETE FROM staff_member WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}

//update manager
exports.updateManagerSQL = (fName,lName,role,username)=>{
    return `UPDATE staff_member SET First_Name = "${fName}",Last_Name = "${lName}",role="${role}" WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}