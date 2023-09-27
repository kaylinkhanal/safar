// const Vehicle = require("../models/user");
const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/VehicleFare");

router.get("/vehicletype", VehicleController.getVehicleInfo);
router.post("/vehicletype", VehicleController.registerVehicleInfo);

module.exports = router;
