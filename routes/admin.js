const express = require("express")
const router = express.Router()
const { createAdminAccount,registerManager,updateManager,deleteManager } = require("../controllers/adminController")
const { adminAuth } = require("../middleware/auth/auth")

router.route("/register").post(adminAuth,registerManager)
router.route("/update").put(adminAuth,updateManager)
router.route("/delete").delete(adminAuth,deleteManager)

// router.route('/makeAcc').get(createAdminAccount)


module.exports = router