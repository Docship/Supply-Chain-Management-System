const express = require("express")
const router = express.Router()
const {registerStorekeeper,updateStorekeeper,deleteStorekeeper,
    addTrain,updateTrain,deleteTrain,
    postDeliveryComponents,deliveryComponents,deleteDeliveryComponent,
    postAddTrainOrderDelivery,addTrainOrderDelivery,
addOrder,postAddOrder,postStorekeepers,postTrains,
postAllDeliveryComponents,postTrainOrderDeliveries,postOrders,trainOrderAssign1,trainOrderAssign2,trainOrderAssign3} = require("../controllers/managerController.js")
const {managerAuth} =require("../middleware/auth/auth.js")
const { route } = require("./login.js")

router.route("/register").post(managerAuth,registerStorekeeper)
router.route("/update").post(managerAuth,updateStorekeeper)
router.route("/delete").post(managerAuth,deleteStorekeeper)
router.route("/storekeepers").get(managerAuth,postStorekeepers)

router.route("/registerTrain").post(managerAuth,addTrain)
router.route("/updateTrain").post(managerAuth,updateTrain)
router.route("/deleteTrain").delete(managerAuth,deleteTrain)
router.route('/trains').get(managerAuth,postTrains)

router.route("/addDeliveryComponents").get(managerAuth,postDeliveryComponents)
router.route("/addDeliveryComponents").post(managerAuth,deliveryComponents)
router.route("/deleteDeliveryComponents").delete(managerAuth,deleteDeliveryComponent)
router.route("/deliveryComponents").get(managerAuth,postAllDeliveryComponents)

router.route("/addTrainOrderDelivery").get(managerAuth,postAddTrainOrderDelivery)
router.route("/addTrainOrderDelivery").post(managerAuth,addTrainOrderDelivery)
router.route("/trainOrderDeliveries").get(managerAuth,postTrainOrderDeliveries)

router.route("/addOrder").get(managerAuth,postAddOrder)
router.route("/addOrder").post(managerAuth,addOrder)
router.route("/orders").get(managerAuth,postOrders)

router.route("/trainDeliveryAssign1").get(managerAuth,trainOrderAssign1)
router.route("/trainDeliveryAssign2").post(managerAuth,trainOrderAssign2)
router.route("/trainDeliveryAssign3").post(managerAuth,trainOrderAssign3)

module.exports = router