const express = require("express");
const router = express.Router();
const Rental = require("../../models/rental")


router.get('/', (req, res) => {
    Rental.find({}, (err, rentals) => {
        res.json(rentals);
    })
});

router.get('/:id', (req, res) => {
    const rentalId = req.params.id;
    Rental.findById(rentalId, (err, rental) => {
        if (err) {
            res.status(404).send({
                errors: [{
                    title: "Rental Error!"
                }, {
                    detail: "Could not found Rental!"
                }]
            })
        }
        res.json(rental);
    });
});



module.exports = router;