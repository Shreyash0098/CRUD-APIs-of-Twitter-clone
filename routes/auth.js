const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signup", authController.signup);

router.get("/users", authController.getUsers);

router.get("/user/:id", authController.getUserById);

router.delete("/user/delete/:id", authController.deleteUser);

router.put("/user/update/:id", authController.updateUser);

module.exports = router;
