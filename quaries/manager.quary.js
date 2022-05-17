exports.findManager = (username)=>{
    return `SELECT * FROM staff_member WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}

//insert manager
exports.insertManager = (userId,name,managerRole)=>{
    return `INSERT INTO staff_member SET User_ID = (select User_ID from user where User_ID = "${userId}"), Name = "${name}",Role = "${managerRole}"`;
}

//delete manager
exports.deleteManager = (username)=>{
    return `DELETE FROM staff_member WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}

//update manager
exports.updateManagerSQL = (name,role,username)=>{
    return `UPDATE staff_member SET name = "${name}",role="${role}" WHERE User_ID =(SELECT User_ID from user WHERE Username = "${username}")`
}