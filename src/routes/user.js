const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { ConnectionRequest } = require("../models/connectionRequest");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills about";
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  // get all the pending connection request for the logged in user

  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA); //can also pass an array

    res.json({ message: "data fetch successfully", data: connectionRequests });
  } catch (err) {
    res.status(400).send("Error " + err.message);
  }
});

userRouter.get("/user/requests/matches", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const matches = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = matches.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({ message: "Matches fetched", data: data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
module.exports = {
  userRouter,
};
