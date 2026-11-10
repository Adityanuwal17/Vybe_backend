const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://adityanuwal19_db_user:BjElVuroTd4hzXMd@matrix.ax4lhak.mongodb.net/Vybe"
  );
};

module.exports = { connectDB };
