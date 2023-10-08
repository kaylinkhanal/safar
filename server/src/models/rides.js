const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  estimatedPrice: { type: Number },
  finalPrice: { type: Number },
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
  pickUpForRider: Object,
  destForRider: Object,
  stopForRider: Object,
  priceChangeCount: Number,
  currentInputPos: Object,
  currentDestinationPos: Object,
  stopPosition: Object,
  phoneNumber: String,
});

const Rides = mongoose.model("Rides", ridesSchema);
module.exports = Rides;
