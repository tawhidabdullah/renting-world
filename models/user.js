const mongoose = require("mongoose");
const { Schema } = mongoose;

// creat user schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  date: {
    type: Date, 
    default: Date.now
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  bookings: [{type: Schema.Types.ObjectId, ref: 'bookings'}],
  rentals: [{type: Schema.Types.ObjectId, ref: 'rentals'}]
});

// with user schema , load the user model for User collection
const User = mongoose.model("users", userSchema);
module.exports = User;
