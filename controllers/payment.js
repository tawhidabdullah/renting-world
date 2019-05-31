const Payment = require("../models/payment");
const Booking = require("../models/booking");
const Rental = require("../models/rental")
const mongooseError = require('../helpers/mongoose'); 
const User = require("../models/user")

// IMPORT KEYS 
const config = require('../config/keys');
const stripe = require('stripe')(config.stripeSk);


exports.getPendingPayments = (req, res) => { 

    const user = req.user.id;
    // find a payment by logged in user ===>> of toUser
    Payment.where({
            toUser: user
        })
        .populate({
            path: 'booking',
            populate: {
                path: 'rental'
            }
        })
        .populate('fromUser')
        .exec((err, payment) => {
            if (err) {
                return res.status(422).send({
                    errors: mongooseError.normalizeMongooseError(err.errors)
                })
            }
            return res.json(payment);
        })
};



exports.confirmPayment = (req, res) => { 

    const payment = req.body;
    const user = req.user.id;

    Payment.findById(payment._id) 
        .populate("toUser") 
        .populate("booking")
        .exec(async (err, payment) => {
            if (err) {
                return res.status(422).send({
                      errors: mongooseError.normalizeMongooseError(err.errors)
                  })
              }; 

            if (payment.status === 'pending' && user === payment.toUser.id) {
                const { booking } = payment;
            
                const charge = await stripe.charges.create({
                    amount: booking.totalPrice,
                    currency: "usd",
                    customer: payment.fromStripeCustomerId
                });
 
                if (charge){
                    Booking.update({_id:booking._id },{status: "active"}, ()=>{})
                    Payment.charge = charge; 
                    payment.status = "paid"; 

                    payment.save((err) => {
                        if (err) {
                            return res.status(422).send({
                                  errors: mongooseError.normalizeMongooseError(err.errors)
                              })
                          }; 

                        User.update(
                            {_id: payment.toUser},
                             {$inc: {revenue: payment.amount}},
                             (err)=>{
                                if (err) {
                                    return res.status(422).send({
                                          errors: mongooseError.normalizeMongooseError(err.errors)
                                      })
                                  }; 

                               return res.json({status: "paid process accomplish"})
                             }
                        )

                    }); 
                }
                else{
                    return res.status(404).send({
                        errors: [{
                            title: "Invalid User and Invalid payment",
                            detail: "cannot accept this payment!"
                        }]
                    });
                }
            }
            else{

            }
        })
}; 



exports.declinePayment = (req,res) => {
    const payment = req.body; 
    const {booking} = payment; 

    Booking.deleteOne({id: booking._id}, (err, deletedBooking) => {
        if (err) {
          return res.status(422).send({
                errors: mongooseError.normalizeMongooseError(err.errors)
            })
        }; 

        Payment.update({_id: payment._id},{status: "decline"}, ()=>{});
        Rental.update({_id: booking.rental}, {$pull: {bookings: booking._id}}, ()=>{}); 

        return res.json({status:"deleted"})
    })
} 