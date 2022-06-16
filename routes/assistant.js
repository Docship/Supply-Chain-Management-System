const express = require("express")
const router = express.Router()
const { postMarkOrderDelvery,markOrderDelvery} = require("../controllers/assistantController")
const { assistantAuth } = require("../middleware/auth/auth")

router.route("/setDelivered").get(assistantAuth,postMarkOrderDelvery)
router.route("/setDelivered").post(assistantAuth,markOrderDelvery)

module.exports = router