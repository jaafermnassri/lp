const express = require('express');
const connectDB = require("./Config/connectDB");
const userRoutes = require("./routes/userRoutes");

const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');


const app = express();
const port =5020;



connectDB();
// app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(express.json());
app.use(cors());


app.use("/api/users", userRoutes);
// app.use("/api/pieces",pieceRoutes);
// app.use("/api/bookings",bookingRoutes);




app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});