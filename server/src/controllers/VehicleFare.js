const Vehicle = require("../models/vehicleType");

const getVehicleInfo = async (req, res) => {
  //   const data = await Vehicle.findById(req.params.id);
  //   if (data) {
  //     return res.json({ data });
  //   }
  res.json("hello");
};
const registerVehicleInfo = async (req, res) => {
  debugger;
  const data = await Vehicle.create(req.body);
  if (data) {
    res.json({ msg: "User registered successfully" });
  }
};

module.exports = { getVehicleInfo, registerVehicleInfo };
