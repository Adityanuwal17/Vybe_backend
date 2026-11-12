const express = require("express");
const { connectDB } = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcyrpt = require("bcrypt");

app.use(express.json());

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
      res.send("Login Successfull!");
    }
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});
// GET USER BY EMAIL
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

// delete a user from the data
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

// update a user from the data
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User Updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed: " + err.message);
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
