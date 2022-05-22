const express = require("express")
const router = express.Router()
const {registerStorekeeper,updateStorekeeper,deleteStorekeeper,
    addTrain,updateTrain,deleteTrain,
    postDeliveryComponents,deliveryComponents,
    postAddTrainOrderDelivery,addTrainOrderDelivery} = require("../controllers/managerController.js")
const {managerAuth} =require("../middleware/auth/auth.js")

router.route("/register").post(managerAuth,registerStorekeeper)
router.route("/update").put(managerAuth,updateStorekeeper)
router.route("/delete").delete(managerAuth,deleteStorekeeper)

router.route("/registerTrain").post(managerAuth,addTrain)
router.route("/updateTrain").put(managerAuth,updateTrain)
router.route("/deleteTrain").delete(managerAuth,deleteTrain)

router.route("/addDeliveryComponents").get(managerAuth,postDeliveryComponents)
router.route("/addDeliveryComponents").post(managerAuth,deliveryComponents)

router.route("/addTrainOrderDelivery").get(managerAuth,postAddTrainOrderDelivery)
router.route("/addTrainOrderDelivery").post(managerAuth,addTrainOrderDelivery)

module.exports = router