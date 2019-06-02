const mongoose = require("mongoose");
const { Schema } = mongoose;

// creat payment schema
const paymentSchema = new Schema({
   fromUser: {type: Schema.Types.ObjectId, ref: 'users'},
   fromStripeCustomerId: String,
   toUser: {type: Schema.Types.ObjectId, ref: 'users'},
   booking: {type: Schema.Types.ObjectId, ref: 'bookings'},
   amount: Number,
   tokenId: String,
   charge: Schema.Types.Mixed,
   status: {type: String, default: "pending"}
});

// with payment schema , load the payment model for payment collection
const Payment = mongoose.model("payments", paymentSchema);
module.exports = Payment;


// fromUser => user who made booking , and this user will pay for the booking
// toUser => owner of the rental on which booking was created - this user will take money

