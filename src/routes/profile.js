const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user; // attached in userAuth middleware
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, your profile was updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const isPasswordValid = await user.validatePassword(
      req.body.currentPassword
    );
    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    }
    const { newPassword } = req.body;
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("please enter a strong password");
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    user.password = newPasswordHash;

    user.save();
    res.send("password updated successfully!");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = { profileRouter };
