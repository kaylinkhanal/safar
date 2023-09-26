const User = require("../models/user");
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatar/");
  },
  filename: function (req, file, cb) {
    const imageName = Math.floor(Math.random() * 1000000) + file.originalname;

    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });
router.post("/register", UserController.registerNewUser);

router.post("/login", UserController.loginUser);

router.post(
  "/users-image/:id",
  upload.single("avatar"),
  UserController.uploadImage
);
router.get("/users-image/:id", UserController.getUserImage);

router.get("/users/:id", UserController.getUserById);

router.put("/account/:id", UserController.updateUserDetailsById);

module.exports = router;
