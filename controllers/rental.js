const Rental = require("../models/rental");
const User = require("../models/user");

// importing validation
const validateRentalsInput = require("../validation/rental"); 


exports.get_single_rental_by_id = (req, res) => {
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
}

exports.getRental_OR_getRentalsByQueryCity = (req, res) => {

    const city = req.query.city;
    const query = city ? {
        city: city.toLowerCase()
    } : {};

    Rental.find(query)
        .select('-bookings')
        .exec((err, foundRentals) => {
            if (err) {
                return res.status(404).send({
                    errors: [{
                        title: "Rental Error!"
                    }, {
                        detail: "Something went wrong for searching rental by city!"
                    }]
                })
            }
            if (city && foundRentals.length === 0) {
                return res.status(404).send({
                    errors: [{
                        title: "no rentals Found!"
                    }, {
                        detail: `There are no rentals for the city ${city}`
                    }]
                })
            }

            return res.json(foundRentals);

        })


}



exports.createRental = (req, res) => {
    // bringing the validations : error , isValid
    const {
        errors,
        isValid
    } = validateRentalsInput(req.body);

    // let image = req.body.image;

    // if (!image) {
    //     errors.imgError = "img shoud be send buddy";
    // }

    // if input is not valid then send and error response
    if (!isValid) {
        return res.status(400).json(errors);
    }

    
    const {
        city,
        street,
        title,
        category,
        image,
        shared,
        bedrooms,
        description,
        dailyRate
    } = req.body;

    const user = req.user.id;
    const rental = new Rental({
        city,
        street,
        title,
        category,
        image,
        shared,
        bedrooms,
        description,
        dailyRate
    });

    rental.user = user;

    Rental.create(rental, (err, newRental) => {
        if (err) {
            return res.status(404).send({
                errors: [{
                    title: "Rental Error!"
                }, {
                    detail: "Something went wrong for searching rental by city!"
                }]
            })
        }

        User.update({
            _id: user
        }, {
            $push: {
                rentals: newRental
            }
        }, () => {});

        return res.json(newRental);
    })
};