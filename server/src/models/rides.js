const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  userDetails: Object,
  estimatedPrice: { type: Number, required: true },
  phoneNumber: String,
  currentDestinationPos: Object,
  currentInputPos: Object,
  stopPosition: Object,
  status: {
    type: String,
    enum: ["pending", "cancelled", "rideAccepted"],
    default: "pending",
  },
});

const Rides = mongoose.model("Rides", ridesSchema);
module.exports = Rides;
