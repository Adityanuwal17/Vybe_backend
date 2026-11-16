const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  // read the toke from the request cookies
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Please login." });
    }
    const decodedObj = jwt.verify(token, "Vybe@9009");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
  // validate the token
  // find the user
};

module.exports = {
  userAuth,
};
