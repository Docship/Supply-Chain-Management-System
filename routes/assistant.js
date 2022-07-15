const express = require("express")
const router = express.Router()
const { postMarkOrderDelvery,markOrderDelvery,postOrders} = require("../controllers/assistantController")
const { assistantAuth } = require("../middleware/auth/auth")

router.route("/setDelivered").get(assistantAuth,postMarkOrderDelvery)
router.route("/setDelivered").post(assistantAuth,markOrderDelvery)
router.route("/orders").get(assistantAuth,postOrders)
module.exports = router