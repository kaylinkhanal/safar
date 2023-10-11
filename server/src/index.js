const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const connect = require("./db/connect");
const UserRoute = require("./routes/user");
const VehicleRoute = require("./routes/vehicle");
const RidesRoute = require("./routes/rides");
const Rides = require("./models/rides");
connect();
io.on("connection", (socket) => {
  socket.on("rides", async (rides) => {
    await Rides.create(rides);
    const data = await Rides.find({ status: "pending" })
      .sort({ createdAt: -1 })
      .populate("user");
    io.emit("rides", data);
  });

  socket.on("acceptRide", async (rideInfo) => {
    await Rides.findByIdAndUpdate(rideInfo.rideId, {
      $set: { status: "rideAccepted", rider: rideInfo.riderId },
    });
    const data = await Rides.findById(rideInfo.rideId).populate("rider");
    io.emit("acceptRide", data);
  });


  socket.on("riderPosition",(riderPosition)=>{
    io.emit("riderPosition", riderPosition);
  })
});
const port = process.env.PORT || 3005;

app.use(UserRoute);
app.use(VehicleRoute);
app.use(RidesRoute);

server.listen(port, () => {
  console.log(`Server is running on localhost ${port}`);
});
