const express = require("express");
const passport = require("passport");
const router = express.Router();
const Rental = require("../../models/rental");


// import rental controllers 
const rentalControllers = require("../../controllers/rental");


// @route GET /api/rentals/manage
// @decription get all the rentals of logged in user it self 
// @access Private
router.get('/manage', passport.authenticate("jwt", {
    session: false
}), rentalControllers.manageRentals);



// @route POST /api/rentals/:id
// @decription getting a single rental by id 
// @access Public
router.get('/:id', rentalControllers.get_single_rental_by_id);


// @route GET /api/rentals
// @decription get all the rentals if we have query-city or get all the rentals 
// @access Public
router.get('/', rentalControllers.getRental_OR_getRentalsByQueryCity);





// @route POST /api/rentals
// @decription Create rentals  
// @access Private
router.post('/', passport.authenticate("jwt", {
        session: false
    }),
    rentalControllers.createRental);



// @route DELETE /api/rentals
// @decription DELETE rental  
// @access Private
router.delete('/', passport.authenticate("jwt", {
    session: false
}), rentalControllers.deleteRental);




module.exports = router;