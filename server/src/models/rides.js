const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  estimatedPrice: {type:Number, required: true},
  password: String,
  status: {
    type: String,
    enum: ["pending", "cancelled", "rideAccepted"],
    default: "pending",
  },
  selectedVehicle: mongoose.Schema.Types.ObjectId,
  stopInputAddress: String,
  destinationInputAddress: String, 
  pickInputAddress: String,
  priceChangeCount: Number,
  currentInputPos: Object,
  currentDestinationPos: Object,
  phoneNumber: String,
  finalPrice: Number
});

const Rides = mongoose.model("Rides", ridesSchema);
module.exports = Rides;
