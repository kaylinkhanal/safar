const mongoose = require("mongoose");

const VehicleTypeSchema = new mongoose.Schema({
  vehicleType: String,
  vehicleFare: String,
});

const Vehicle = mongoose.model("Vehicle", VehicleTypeSchema);
module.exports = Vehicle;
