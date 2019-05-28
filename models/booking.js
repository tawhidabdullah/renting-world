const mongoose = require("mongoose");
const { Schema } = mongoose;

// creat user schema
const bookingSchema = new Schema({
   startAt: {type:Date,required: "Starting date is required"},
   endAt: {type:Date,required: "Endting date is required"},
   totalPrice: Number,
   days: Number,
   guests: Number,
   createdAt: {type: Date, default: Date.now},
   user: {type: Schema.Types.ObjectId, ref: 'users'},
   rental: {type: Schema.Types.ObjectId, ref: 'rentals'},
   review: {type: Schema.Types.ObjectId, ref: "reviews"}
});

// with booking schema , load the booking model for booking collection
const Booking = mongoose.model("bookings", bookingSchema);
module.exports = Booking;
