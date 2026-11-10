const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Agent",
    lastName: "Smith",
    emailId: "smith@matrix.com",
    password: "smith123",
  };
  // create an new instance of user model
  const user = new User(userObj);

  try {
    await user.save();
    res.send("User Added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
