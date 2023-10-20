const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, uppercase: true, trim: true }, // String is shorthand for {type: String}
    lastName: { type: String, required: true, uppercase: true, trim: true }, // String is shorthand for {type: String}
    image: { type: String },
    createdOn: { type: Date, default: Date.now },
    age: Number,
    email: { type: String, required: true, lowerCase: true, trim: true },
    password: { type: String },
    role: {
    type: String,
    default: "student",
    enum: ["student","admin","parent","director"],
  },
});
module.exports = User = mongoose.model("user", userSchema);
