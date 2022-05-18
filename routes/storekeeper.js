const express = require("express")
const router = express.Router()
const {registerAssistant,updateAssistant,deleteAssistant} = require("../controllers/storekeeperController.js")
const {storekeeperAuth} =require("../middleware/auth/auth.js")

router.route("/register").post(storekeeperAuth,registerAssistant)
router.route("/update").put(storekeeperAuth,updateAssistant)
router.route("/delete").delete(storekeeperAuth,deleteAssistant)


module.exports = router