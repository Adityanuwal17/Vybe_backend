const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello from the test  server");
});

app.use("/", (req, res) => {
  res.send("Hello from home server");
});

app.listen(3000, () => {
  console.log("server is successfully listening on port 3000...");
});
