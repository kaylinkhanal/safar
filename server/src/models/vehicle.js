const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    required: true,
  },
  pricePerKm: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  iconUrl: { type: String, required: true },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
