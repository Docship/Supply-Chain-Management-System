const Manager = require("../models/Users/manager.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtSecrete = '231e07bf113b22fabaca321b96e015aea7e853d91de217d264891f54a3fbce2f2831ea'

exports.createAdminAccount = async (req,res,next)=>{
    
    const username='admin'
    const password='123456'
    
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password less than 6 characters"
        })
    }
    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            await Admin.create({
                    username,
                    password: hash,
                }).then((user) => {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign({
                            id: user._id,
                            username,
                            role: user.role
                        },
                        jwtSecrete, {
                            expiresIn: maxAge,
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    });
                    res.status(201).json({
                        message: "User successfully created",
                        user: user._id,
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        message: "User not successful created",
                        error: error.message,
                    })
                })
        })
    } catch (err) {
        res.status(401).json({
            message: "User not successful created",
            error: error.mesage,
        })
    }
}

exports.loginAdmin = async (req, res, next) => {
    const {
        username,
        password
    } = req.body
    // Check if username and password is provided
    if (!username || !password) {
        return res.status(400).json({
            message: "Username or Password not present",
        })
    }
    try {
        const user = await Admin.findOne({
            username
        })
        if (!user) {
            res.status(401).json({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            bcrypt.compare(password, user.password).then((result) => {
                if (result) {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign({
                            id: user._id,
                            username,
                            role: user.role
                        },
                        jwtSecrete, {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                        message: "User successfully Logged in",
                        user: user._id,
                    });
                } else {
                    res.status(400).json({
                        message: "Login not succesful"
                    });
                }
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "An error occurred",
            error: error.message,
        });
    }
}

exports.registerManager = async (req, res, next) => {
    const {
        username,
        password
    } = req.body
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password less than 6 characters"
        })
    }
    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            await Manager.create({
                    username,
                    password: hash,
                }).then((user) => {
                    const maxAge = 3 * 60 * 60;
                    const token = jwt.sign({
                            id: user._id,
                            username,
                            role: user.role
                        },
                        jwtSecrete, {
                            expiresIn: maxAge,
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    });
                    res.status(201).json({
                        message: "User successfully created",
                        user: user._id,
                    });
                })
                .catch((error) => {
                    res.status(400).json({
                        message: "User not successful created",
                        error: error.message,
                    })
                })
        })
    } catch (err) {
        res.status(401).json({
            message: "User not successful created",
            error: error.mesage,
        })
    }
}



exports.updateManager = async (req, res, next) => {
    const {
        role,
        id
    } = req.body
    // Verifying if role and id is presnt
    if (role && id) {
        // Verifying if the value of role is admin
        if (role === "admin") {
            await Manager.findById(id)
                .then((user) => {
                    // Third - Verifies the user is not an admin
                    if (user.role !== "admin") {
                        user.role = role;
                        user.save((err) => {
                            //Monogodb error checker
                            if (err) {
                                res
                                    .status("400")
                                    .json({
                                        message: "An error occurred",
                                        error: err.message
                                    });
                                process.exit(1);
                            }
                            res.status("201").json({
                                message: "Update successful",
                                user
                            });
                        });
                    } else {
                        res.status(400).json({
                            message: "User is already an Admin"
                        });
                    }
                })
                .catch((error) => {
                    res
                        .status(400)
                        .json({
                            message: "An error occurred",
                            error: error.message
                        });
                });
        } else {
            res.status(400).json({
                message: "Role is not admin",
            })
        }
    } else {
        res.status(400).json({
            message: "Role or Id not present"
        })
    }
}

exports.deleteManager = async (req, res, next) => {
    const {
        id
    } = req.body
    await Manager.findById(id)
        .then(user => user.remove())
        .then(user =>
            res.status(201).json({
                message: "User successfully deleted",
                user
            })
        )
        .catch(error =>
            res
            .status(400)
            .json({
                message: "An error occurred",
                error: error.message
            })
        )
}