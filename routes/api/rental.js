const express = require("express");
const router = express.Router();
const Rental = require("../../models/rental")


router.get('/', (req, res) => {

    Rental.find({})
        .select('-bookings')
        .exec((err, rentals) => {
            res.json(rentals);
        })
});

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;

    Rental.findById(rentalId)
        .populate("user", 'name -_id')
        .populate("bookings", "startAt endAt -_id")
        .exec((err, rental) => {
            if (err) {
                res.status(404).send({
                    errors: [{
                        title: "Rental Error!"
                    }, {
                        detail: "Could not found Rental!"
                    }]
                })
            }
            return res.json(rental);
        })
});



module.exports = router;