const mongoose = require("mongoose");
const { Schema } = mongoose;

// creat user schema
const rentalSchema = new Schema({
    title: { type: String, required: true, max: [128, 'Too long, max is 128 characters']},
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true, min: [4, 'Too short, min is 4 characters']},
    category: { type: String, required: true, lowercase: true },
    image: { type: String },
    bedrooms: Number,
    shared: Boolean,
    description: { type: String, required: true },
    dailyRate: Number,
    createdAt: { type: Date, default: Date.now },
    bookings: [{type: Schema.Types.ObjectId, ref: 'bookings'}],
    user: {type: Schema.Types.ObjectId , ref: 'users'}
});

// with rental schema , load the rental model for rental collection
const Rental = mongoose.model("rentals", rentalSchema);
module.exports = Rental;
