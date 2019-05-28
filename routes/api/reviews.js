const express = require("express");

const passport = require("passport");

//IMPORT USUERS CONSTROLLERS
const reviewControllers = require("../../controllers/review");

// initializing router middleware
const router = express.Router();


// @route POST /api/reviews
// @decription create review
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  reviewControllers.createReview
);



module.exports = router;