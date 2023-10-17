const express = require("express");
const router = express.Router();
const RidesController = require("../controllers/rides");
router.get("/rides", RidesController.getRides);

module.exports = router;
