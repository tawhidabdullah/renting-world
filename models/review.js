const mongoose = require("mongoose");
const { Schema } = mongoose;

const ALLOWED_RATINGS = [1,2,3,4,5]; 

// creat review schema
const reviewSchema = new Schema({
    rating: Number,
    text: String,
    createdAt: {type: Date,default: Date.now},
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    rental: {type: Schema.Types.ObjectId, ref: "rentals"}
});

// with review schema , load the review model for review collection
const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;

reviewSchema.pre('save',(next) => {
    if(ALLOWED_RATINGS.indexOf(this.rating) >= 0 ){
        next(); 
    }
    else{
        const err = new Error({rating: "Invalid Rating"});
        err.errors = {}; 
        err.errors.rating = {message: "Invalid Rating, this Rating is not allowed"} 
        next(err); 
    }
})