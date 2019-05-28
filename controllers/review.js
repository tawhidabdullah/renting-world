const User = require("../models/user");
const Rental = require("../models/rental");
const Booking = require("../models/booking");
const Review = require("../models/review");
const moment = require("moment");


// normalize mongoose error 
const errorHelpers = require("../helpers/mongoose");





exports.getReviews = (req, res) => {
    const {
        rentalId
    } = req.query;

    Review.find({
            'rental': rentalId
        })
        .populate("user")
        .exec((err, reviews) => {
            if (err) {
                return res.status(422).send({
                    errors: errorHelpers.normalizeMongooseError(err.errors)
                })
            }

            return res.json(reviews); 
        });
}


exports.createReview = (req, res) => {
    const reviewData = req.body;
    const {
        bookingId
    } = req.query;
    const user = req.user.id;

    Booking.findById(bookingId)
        .populate({
            path: "rental",
            populate: {
                path: "user"
            }
        })
        .populate("review")
        .populate("user")
        .exec(async (err, booking) => {
            if (err) {
                return res.status(404).send({
                    errors: [{
                        title: "Review Error!"
                    }, {
                        detail: "Something went wrong form getting booking and polupating it's properties!"
                    }]
                })
            }

            const {
                rental
            } = booking;
            if (rental.user.id.toString() === user) {
                return res.status(404).send({
                    errors: [{
                        title: "Invalid User!"
                    }, {
                        detail: "Cannot review on your own place!"
                    }]
                })
            }

            const bookingUserId = booking.user._id.toString();
            if (bookingUserId !== user) {
                return res.status(404).send({
                    errors: [{
                        title: "Invalid User!"
                    }, {
                        detail: "Cannot Write review on someone else booking!"
                    }]
                })
            };

            const timeNow = moment();
            const endAt = moment(booking.endAt);

            if (!endAt.isBefore(timeNow)) {
                return res.status(404).send({
                    errors: [{
                        title: "Invalid Date!"
                    }, {
                        detail: "You can place review only after finishing bookings!"
                    }]
                })
            }

            if (booking.review) {
                return res.status(404).send({
                    errors: [{
                        title: "Booking Reivew Error!"
                    }, {
                        detail: "Only one rive per booking is allowed!"
                    }]
                })
            };


            const review = new Review(reviewData);
            review.user = user;
            review.rental = rental;
            booking.review = review;

            try {
                await booking.save();
                const savedReview = await review.save();

                return res.json(savedReview);

            } catch (err) {
                return res.status(404).send({
                    errors: errorHelpers.normalizeMongooseError(err.errors)
                })
            }
        })
}