const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  estimatedPrice: {type:Number, required: true},
  password: String,
  selectedVehicle: mongoose.Schema.Types.ObjectId,
  stopInputAddress: String,
  status: {
    type: String,
    enum: ["pending", "cancelled", "rideAccepted"],
    default: "pending",
  },
  destinationInputAddress: String, 
  pickInputAddress: String,
  priceChangeCount: Number,
  currentInputPos: Object,
  currentDestinationPos: Object,
  phoneNumber: String
});

const Rides = mongoose.model("Rides", ridesSchema);
module.exports = Rides;
