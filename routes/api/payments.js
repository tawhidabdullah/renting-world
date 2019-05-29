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



module.exports = router;