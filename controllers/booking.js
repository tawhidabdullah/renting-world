const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");

// import booking validation
const validateBooking = require('../validation/booking');

// @route POST /api/bookings
// @decription create booking
// @access Private
exports.createBooking = (req, res) => {
    const {
        startAt,
        endAt,
        totalPrice,
        guests,
        days,
        rental
    } = req.body;
    const user = req.user.id;

    const booking = new Booking({
        startAt,
        endAt,
        totalPrice,
        guests,
        days,
        rental
    });


    Rental.findById(rental._id)
        .populate('bookings')
        .populate('user')
        .exec((err, rental) => {
            if (err) {
                return res.status(422).send({
                    errors: "something went wrong from controller/bookings"
                })
            }

            if (rental.user.id === user) {
                return res.status(422).send({
                    errors: [{
                        title: "Invalid User",
                        detail: "cannot create bookings on your own rentals!"
                    }]
                });
            }

            if (validateBooking(booking, rental)) {
                booking.user = user;
                booking.rental = rental;
                rental.bookings.push(booking);
                booking.save((err) => {
                    if (err) {
                        return res.status(422).send({
                            errors: "something went wrong from controller/bookings"
                        })
                    }

                    rental.save();

                    // update user with bookings
                    User.update({
                        _id: user
                    }, {
                        $push: {
                            bookings: booking
                        }   
                    });


                    return res.json({
                        startAt: booking.startAt,
                        endAt: booking.endAt
                    });

                });


            } else {
                return res.status(422).send({
                    errors: [{
                        title: "Invalid Booking",
                        detail: "Choosen dates are already taken!"
                    }]
                });
            };

        });

};
