const mongoose = require("mongoose");

require('dotenv').config({path:"./back/.env"});
async function connectDB() {

  try {
    await mongoose.connect("mongodb://localhost:27017/");
    console.log("Database successfully connected");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;