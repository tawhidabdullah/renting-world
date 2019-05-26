const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");


// import booking validation
const validateBooking = require('../validation/booking');

// @route POST /api/bookings
// @decription create booking
// @access Private
exports.createBooking = (req, res) => {
    console.log
    const {
        startAt,
        endAt,
        totalPrice,
        guests,
        days,
        rental
    } = req.body;
    const user = req.user.id;

    console.log("endAt",endAt);

    const booking = new Booking({
        startAt,
        endAt,
        totalPrice,
        guests,
        days,
        rental
    });

    console.log('beforerental' ,rental); 


    Rental.findById(rental._id)
        .populate('user')
        .populate('bookings')
        .exec((err, rental) => {
            if (err) {
                return res.status(422).send({
                    errors: "something went wrong from controller/bookings"
                })
            }

            // if (rental.user._id === user) {
            //     return res.status(422).send({
            //         errors: [{
            //             title: "Invalid User",
            //             detail: "cannot create bookings on your own rentals!"
            //         }]
            //     });
            // }

            // console.log(rental);
            if (validateBooking(booking, rental)) {
                booking.user = user;
                booking.rental = rental;
                rental.bookings.push(booking);
                booking.save((err) => {
                    if (err) {
                        console.log(err); 
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