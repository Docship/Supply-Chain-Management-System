const dbConnection = require("../db.js")
const userQuary = require("../quaries/user.quary.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecrete = '231e07bf113b22fabaca321b96e015aea7e853d91de217d264891f54a3fbce2f2831ea'

const uniqid = require('uniqid');
const res = require("express/lib/response")
var validator = require('validator');

exports.createUserAccount = async (req, res, username, password, role) => {
    if (!(validator.isEmail(username))) {
        res.status(400).json({
            message: "wrong username format "
        })
        return -1
    }
    const userSql = userQuary.findUser(username)
    const userId = uniqid()

    dbConnection.findExecution(userSql).then((results) => {
        //console.log("hhhhhhhhhh")
        //console.log(results)
        if (results.length != 0) {
            res.status(400).json({
                message: "Username already exists"
            })
            return -1
        } else {
            if (password.length < 6) {
                res.status(400).json({
                    message: "Password less than 6 characters"
                })
                return -1
            }
            try {
                bcrypt.hash(password, 10).then((hash) => {
                    const sql = userQuary.insertUser(userId, username, hash)
                    dbConnection.insertExecution(sql).then((result) => {

                        const maxAge = 3 * 60 * 60;
                        const token = jwt.sign({
                                id: userId,
                                username,
                                role: role
                            },
                            jwtSecrete, {
                                expiresIn: maxAge,
                            }
                        );
                        res.cookie("jwt", token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000,
                        });
                        res.status(201)
                        return userId
                    }).catch(error => {
                        res.status(401).json({
                            message: "error occured"
                        })
                        return -1
                    })
                })
            } catch (error) {
                res.status(401).json({
                    message: "error occured"
                })
                return -1
            }
        }
    })
    return userId
}

exports.deleteUserAccount = async (username) => {
    const userSql = userQuary.findUser(username)
    try {
        const sql = userQuary.deleteUserAccount(username)
        //console.log(sql)
        let result =await dbConnection.updateDeleteExecution(sql)
        return result
    } catch (error) {
        //console.log(error)
        console.log("user account deletion failed")
        return -1
    }
}


exports.findUserAccount = async (username) => {
    const sql = userQuary.findUser(username)
    let result = dbConnection.findExecution(sql)
    //console.log(result)
    if (result.length != 0) {
        console.log(result)
        return true
    } else {
        res.status(400).json({
            message: "Username not exists"
        })
        return false
    }
}