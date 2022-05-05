const express = require("express")
const router = express.Router()
const { createAdminAccount,registerManager,updateManager,deleteManager } = require("../controllers/adminController")
const { adminAuth } = require("../Auth/auth")

router.route("/register").post(registerManager)
router.route("/update").put(adminAuth,updateManager)
router.route("/delete").delete(adminAuth,deleteManager)
router.route('/makeAcc').get(createAdminAccount)


module.exports = router