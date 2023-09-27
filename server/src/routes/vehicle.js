const Vehicle = require("../models/user");
const express = require("express");
const router = express.Router();
const VehicleController = require("../controllers/vehicle");

router.post("/addvehicleinfo", VehicleController.addVehicleInfo);

router.get("/getVehicleInfo/:id", VehicleController.getVehicleInfo);

router.delete("/deletevehicleinfo/:id", VehicleController.deleteVehicleInfo);

router.put("/updatevehicleinfo/:id", VehicleController.updateVehicleInfo);

router.get("/getVehicles", VehicleController.getVehicles);

module.exports = router;
