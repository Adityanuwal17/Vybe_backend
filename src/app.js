const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcyrpt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await bcyrpt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    } else {
      // create a JWT token
      const token = await jwt.sign({ _id: user._id }, "Vybe@9009", {
        expiresIn: "1d",
      });

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login Successfull!");
    }
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " sent a connection request ");
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
