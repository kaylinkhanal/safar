const Vehicle = require("../models/user");
const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/vehicle");

router.post("/vehicles", VehicleController.addVehicleInfo);

router.get("/vehicles/:id", VehicleController.getVehicleInfo);

router.delete("/vehicles/:id", VehicleController.deleteVehicleInfo);

router.put("/vehicles/:id", VehicleController.updateVehicleInfo);

router.get("/vehicles", VehicleController.getVehicles);

module.exports = router;
