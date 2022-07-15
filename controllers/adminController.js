const adminQuary = require("../quaries/admin.quary.js");
const managerQuary = require("../quaries/manager.quary.js");
const userController = require("./userController.js");
const dbConnection = require("../db.js");
// import { setTimeout } from 'timers/promises';
const admin = "ADMIN";
const manager = "MANAGER";

exports.createAdminAccount = async (req, res, next) => {
    const details = {
        username: "admin55@g.com",
        password: "123456",
        name: "bimsara",
    };
    userController.createUser(req, res, details, "ADMIN");
};

exports.registerManager = async (req, res, next) => {
    const {
        username,
        password,
        fName,
        lName,
        managerRole
    } = req.body;

    if (!username || !password || !fName || !lName || !managerRole) {
        res.status(400).json({
            message: "username,password,first name,last name or manager role not present",
        });
        return;
    }
    const details = {
        username: username,
        password: password,
        fName: fName,
        lName: lName,
        managerRole: managerRole,
    };
    userController
        .createUser(req, res, details, "MANAGER")
        .then(console.log("Finished execution of create manager Function"));
};

exports.updateManager = async (req, res, next) => {
    const {
        fName,
        lName,
        role,
        username
    } = req.body;

    if (!fName || !lName || !role || !username) {
        res.status(400).json({
            message: "name or role or username not present",
        });
        return;
    }
    const managerFindSql = managerQuary.findManagerByUserName();
    const result = await dbConnection.findExecution(managerFindSql, [username]);
    if (result.status != 200) {
        res.status(result.status).json({
            message: "error",
        });
        return;
    } else if (result.result.length == 0) {
        res.status(400).json({
            message: "Username not exists",
        });
        return;
    }
    const sql = managerQuary.updateManagerSQL();

    const fResult = await dbConnection.updateDeleteExecution(sql, [
        fName,
        lName,
        role,
        username,
    ]);
    if (fResult.status != 200) {
        res.status(200).json({
            message: fResult.message
        });
        return;
    }
    res.status(result.status).json({
        message: fResult.message
    });
};

exports.deleteManager = async (req, res, next) => {
    const {
        userId
    } = req.body;
    if (!userId) {
        res.status(400).json({
            message: "username not present",
        });
        return
    }
    userController.deleteUserAccount(req,res,userId,"MANAGER")
    .then(console.log("Finished execution of delete manager Function"));
}

exports.postManagers = async (req,res,next)=>{
    const sql = managerQuary.getManagers()

    const managers = await dbConnection.findExecution(sql)
    if (managers.status != 200) {
        res.status(orders.status).json({
            message: orders.message
        })
        return
    }
    res.status(200).json({
        message: "success",
        result: managers
    })
}