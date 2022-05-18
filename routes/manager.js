const express = require("express")
const router = express.Router()
const {registerStorekeeper,updateStorekeeper,deleteStorekeeper} = require("../controllers/managerController.js")
const {managerAuth} =require("../middleware/auth/auth.js")

router.route("/register").post(managerAuth,registerStorekeeper)
router.route("/update").put(managerAuth,updateStorekeeper)
router.route("/delete").delete(managerAuth,deleteStorekeeper)


module.exports = router