const express = require("express")
const router = express.Router()
const { createAdminAccount,registerManager,updateManager,deleteManager,postManagers } = require("../controllers/adminController")
const { adminAuth } = require("../middleware/auth/auth")

router.route("/register").post(adminAuth,registerManager)
router.route("/update").put(adminAuth,updateManager)
router.route("/delete").delete(adminAuth,deleteManager)
router.route('/getManagers').get(adminAuth,postManagers)
router.route('/makeAcc').get(adminAuth,createAdminAccount)

module.exports = router