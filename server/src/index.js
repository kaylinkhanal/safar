const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const connect = require("./db/connect");
const UserRoute = require("./routes/user");
const ProductRoute = require("./routes/product");
const VehicleRoute = require("./routes/vehicleFare");

connect();

const port = process.env.PORT || 3005;

app.use(UserRoute);
app.use(ProductRoute);
app.use(VehicleRoute);

app.listen(port, () => {
  console.log(`Server is running on localhost ${port}`);
});
