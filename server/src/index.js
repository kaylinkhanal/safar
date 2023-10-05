const express = require("express");
const app = express();
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const server = createServer(app);
const io = new Server(server,  {
  cors: {
    origin: "*",
  }
});
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const connect = require("./db/connect");
const UserRoute = require("./routes/user");
const VehicleRoute = require("./routes/vehicle");
const Rides = require("./models/rides")
connect();
io.on('connection', (socket) => {

  socket.on('rides', (rides)=>{
    io.emit("rides", rides);
  })

});
const port = process.env.PORT || 3005;

app.use(UserRoute);
app.use(VehicleRoute);

server.listen(port, () => {
  console.log(`Server is running on localhost ${port}`);
});
