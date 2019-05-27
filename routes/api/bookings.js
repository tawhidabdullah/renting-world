const express = require("express");

const passport = require("passport");

//IMPORT USUERS CONSTROLLERS
const bookingsControllers = require("../../controllers/booking");

// initializing router middleware
const router = express.Router();


// @route POST /api/bookings
// @decription create booking
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  bookingsControllers.createBooking
);


// @route GET /api/bookings/manage
// @decription get all the bookings of logged in user it self 
// @access Private
router.get('/manage', passport.authenticate("jwt", {
  session: false
}), bookingsControllers.manageBooking);



module.exports = router;