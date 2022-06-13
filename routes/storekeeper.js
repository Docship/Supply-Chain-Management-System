const express = require("express")
const router = express.Router()
const {registerAssistant,updateAssistant,deleteAssistant,
    addDriver,updateDriver,deleteDriver,
    addTruck,updateTruck,deleteTruck,
    addRoute,updateRoute,deleteRoute,
    postDeliveryComponents,addDeliveryComponents,
    postAddTruckOrderDelivery,addTruckOrderDelivery} = require("../controllers/storekeeperController.js")
const {storekeeperAuth} =require("../middleware/auth/auth.js")

router.route("/registerA").post(storekeeperAuth,registerAssistant)
router.route("/updateA").put(storekeeperAuth,updateAssistant)
router.route("/deleteA").delete(storekeeperAuth,deleteAssistant)

router.route("/registerDriver").post(storekeeperAuth,addDriver)
router.route("/updateDriver").put(storekeeperAuth,updateDriver)
router.route("/deleteDriver").delete(storekeeperAuth,deleteDriver)

router.route("/registerTruck").post(storekeeperAuth,addTruck)
router.route("/updateTruck").put(storekeeperAuth,updateTruck)
router.route("/deleteTruck").delete(storekeeperAuth,deleteTruck)

router.route("/registerRoute").post(storekeeperAuth,addRoute)
router.route("/updateRoute").put(storekeeperAuth,updateRoute)
router.route("/deleteRoute").delete(storekeeperAuth,deleteRoute)

// router.route("/createDelivery").post(storekeeperAuth,createDelivery)
router.route("/addDeliveryComponents").get(storekeeperAuth,postDeliveryComponents)
router.route("/addDeliveryComponents").post(storekeeperAuth,addDeliveryComponents)

router.route("/addTruckOrderDelivery").get(storekeeperAuth,postAddTruckOrderDelivery)
router.route("/addTruckOrderDelivery").post(storekeeperAuth,addTruckOrderDelivery)


module.exports = router