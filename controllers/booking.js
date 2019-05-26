const Booking = require("../models/booking");
const Rental = require("../models/rental");

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
                rental.bookings.push(booking);
                rental.save();
                booking.save();
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