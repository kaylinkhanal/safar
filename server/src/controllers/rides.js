const Rides = require("../models/rides");
const mongoose = require("mongoose");



const getRides = async (req, res) => {
  try {
    const data = await Rides.find({status: req.query.status})
    if(data) res.json({rideList: data})
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getRides
};
