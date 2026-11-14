const express = require("express");
const authRouter = express.Router();
const bcyrpt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  // Validation of data
  try {
    validateSignUpData(req);
    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcyrpt.hash(password, 10);

    // create an new instance of user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("Login Successfull!");
    }
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

module.exports = { authRouter };
