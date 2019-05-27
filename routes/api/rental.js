const express = require("express");
const router = express.Router();
const Rental = require("../../models/rental")


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


router.get('/', (req, res) => {

    const city = req.query.city;

    if (city) {
        Rental.find({
                city: city.toLowerCase()
            })
            .select('-bookings')
            .exec((err, filteredRentals) => {
                if (err) {
                    return res.status(404).send({
                        errors: [{
                            title: "Rental Error!"
                        }, {
                            detail: "Something went wrong for searching rental by city!"
                        }]
                    })
                }
                if (filteredRentals.length === 0) {
                    return res.status(404).send({
                        errors: [{
                            title: "no rentals Found!"
                        }, {
                            detail: `There are no rentals for the city ${city}`
                        }]
                    })
                }

                return res.json(filteredRentals); 


            })


        return res.json({
            city
        });
    } else {

        Rental.find({})
            .select('-bookings')
            .exec((err, rentals) => {
                return res.json(rentals);
            })
    }

});





module.exports = router;