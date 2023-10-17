const Vehicle = require("../models/vehicle");

const addVehicleInfo = async (req, res) => {
  const data = await Vehicle.create(req.body);
  if (data) {
    res.json({ msg: "Added Successfully" });
  }
};

const updateVehicleInfo = async (req, res) => {
  const data = await Vehicle.findByIdAndUpdate(req.params.id, req.body);
  if (data) {
    res.json({
      msg: "Vehicle details edited",
    });
  }
};

const deleteVehicleInfo = async (req, res) => {
  const data = await Vehicle.findByIdAndDelete(req.params.id, req.body);
  if (data) {
    res.json({
      msg: "Vehicle details deleted",
    });
  }
};

const getVehicleInfo = async (req, res) => {
  const data = await Vehicle.findById(req.params.id);
  if (data) {
    res.json({ vehicleDetails: data });
  }
};

const getVehicles = async (req, res) => {
  const vehicleList = await Vehicle.find()
  return res.json(vehicleList);
};


module.exports = {
  addVehicleInfo,
  updateVehicleInfo,
  deleteVehicleInfo,
  getVehicleInfo,
  getVehicles,
};
