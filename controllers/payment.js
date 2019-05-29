const Payment = require("../models/payment");
const mongooseError = require('../helpers/mongoose')

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

            console.log("payments",payment); 
            return res.json(payment); 
        })
}