const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middleware/isAuth");
const { deleteUser, UpdateUser, getUser, current,getAllUsers, Login, Register } = require("../controllers/Users");

//register
router.post("/register",Register);
//login
router.post("/login", Login);

//get current user
router.get("/current", isAuth(),current);

//get all users
router.get("/", getAllUsers);

//delete user
router.delete("/:idDelete", isAuth(), deleteUser);

// UPDATE USER
router.put("/:idUpdate", isAuth(), UpdateUser);
module.exports = router;

//get one user details
router.get("/:id",getUser);
module.exports = router;
