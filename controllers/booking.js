const Booking = require("../models/booking");
const Rental = require("../models/rental");
const User = require("../models/user");
const Payment = require("../models/payment");


// IMPORT KEYS
const config = require('../config/keys');
const stripe = require('stripe')(config.stripeSk); 
// console.log(stripe.charges.create); 


// import booking validation
const validateBooking = require('../validation/booking');

const CUSTOMER_SHARE = 0.9; 

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
        rental,
        paymentToken
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
        .populate('user')
        .populate('bookings')
        .exec( async (err, rental) => {
            if (err) {
                return res.status(422).send({
                    errors: "something went wrong from controller/bookings"
                })
            }

            if (rental.user._id.toString() === user) {
                return res.status(404).send({
                    errors: [{
                        title: "Invalid User",
                        detail: "cannot create bookings on your own rentals!"
                    }]
                });
            }

            // console.log(rental);
            if (validateBooking(booking, rental)) {
                booking.user = req.user;
                booking.rental = rental;
                const {payment,err} = await createPayment(booking, rental.user, paymentToken);
                if(payment){ // we cannot book a booking without payment 
                    booking.payment = payment; 
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

                }else {
                    return res.status(422).send({
                        errors: [{
                            title: "Invalid Payment",
                            detail: err
                        }]
                    });
                };
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



exports.manageBooking = (req, res) => {
    const user = req.user.id;

    Booking.where({
            user
        })
        .populate('rental')
        .populate('review')
        .exec((err, bookings) => {
            if (err) {
                return res.status(422).send({
                    errors: "something went wrong from controller/rental managing bookings!"
                })
            }
            return res.json(bookings);
        });
}; 




async function createPayment(booking,toUser,token){
   
    const {user} = booking; 

    const customer = await stripe.customers.create({
        source: token,
        email: user.email
    }); 
    if(customer){
        User.update({_id: user.id}, {$set: {stripeCustomerId: customer.id}}, ()=>{}); 
        const payment = new Payment({
            fromUser : user,
            toUser,
            fromStripeCustomerId: customer.id,
            booking,
            tokenId: token.id,
            amount: booking.totalPrice * 100 * CUSTOMER_SHARE
        });

        try{
            const savedPayment = await payment.save();
            return {payment: savedPayment}; 

        }
        catch(err){
            return {err: err.message}
        }
    }
    else{
        return {err: "Cannot process payment"}
    }
}; 