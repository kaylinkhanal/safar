const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rider: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    estimatedPrice: { type: Number },
    finalPrice: { type: Number },
    password: String,
    status: {
      type: String,
      enum: ["pending", "cancelled", "rideAccepted"],
      default: "pending",
    },
    selectedVehicle: Object,
    pickUpForRider: Object,
    destForRider: Object,
    stopForRider: Object,
    priceChangeCount: Number,
    currentInputPos: Object,
    currentDestinationPos: Object,
    stopPosition: Object,
    pickInputAddress: Object,
    destinationInputAddress: Object,
    stopInputAddress: Object,
    phoneNumber: String,
  },
  {
    timestamps: true,
  }
);

const Rides = mongoose.model("Rides", ridesSchema);
module.exports = Rides;
