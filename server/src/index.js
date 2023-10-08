const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require("cors");
const Rides = require("./models/rides");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

require("dotenv").config();
app.use(express.json());
app.use(cors());
const connect = require("./db/connect");
const UserRoute = require("./routes/user");
const VehicleRoute = require("./routes/vehicle");

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("rides", async (rides) => {
    await Rides.create(rides);
    const data = await Rides.find({ status: "pending" });
    io.emit("rides", data);
  });
});
connect();

const port = process.env.PORT || 3005;

app.use(UserRoute);
app.use(VehicleRoute);

server.listen(port, () => {
  console.log(`Server is running on localhost ${port}`);
});

// server.listen(port, () => {
//   console.log("1erver running at localhost ");
// });
