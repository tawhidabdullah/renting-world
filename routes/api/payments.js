const express = require("express");

const passport = require("passport");

//IMPORT USUERS CONSTROLLERS
const PaymentsControllers = require("../../controllers/payment");

// initializing router middleware
const router = express.Router();



// @route GET /api/payments
// @decription get all the pending payments 
// @access Private
router.get('/', passport.authenticate("jwt", {
  session: false
}), PaymentsControllers.getPendingPayments);


// @route POST /api/payments/accept
// @decription accept the pending payment 
// @access Private
router.post('/accept', passport.authenticate("jwt", {
  session: false
}), PaymentsControllers.confirmPayment);


// @route POST /api/payments/decline 
// @decription decline the pending payment 
// @access Private
router.post('/decline', passport.authenticate("jwt", {
  session: false
}), PaymentsControllers.declinePayment);



module.exports = router;