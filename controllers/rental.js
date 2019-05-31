const Rental = require("../models/rental");
const User = require("../models/user");

// importing validation
const validateRentalsInput = require("../validation/rental");
const validateupdateRentalInput = require("../validation/updateRental");

// importing mongoose error  
const mongooseError = require("../helpers/mongoose")   


exports.get_single_rental_by_id = (req, res) => {
    const rentalId = req.params.id; 

    Rental.findById(rentalId)
        .populate("user", 'name -_id avatar')
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
};


exports.get_single_rental_by_id_verify_user = (req, res) => {
    const user = req.user.id;

    Rental.findById(req.params.id)
        .populate('user')
        .exec((err, rental) => {
            if (err) {
                return res.status(422).send({
                    errors: mongooseError.normalizeMongooseError(err.errors)
                })
            };

            if (rental.user._id.toString() !== user) {
                res.status(404).send({
                    errors: [{
                        title: "Invalid User!"
                    }, {
                        detail: "You are not the owner of this rental!"
                    }]
                })
            };

            return res.json({ status: 'verified' })
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

    let image = req.file;

    if (!image) {
        errors.imgError = "img shoud be send buddy";
    }

    // if input is not valid then send and error response
    if (!isValid) {
        return res.status(400).json(errors);
    }

   
    let imgUrl = image.path;

    const {
        city,
        street,
        title,
        category,
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
        image: imgUrl,
        shared,
        bedrooms,
        description,
        dailyRate: parseInt(dailyRate)
    });

    rental.user = user;

    rental.save((err, newRental) => {
        if (err) {
            console.log(err);
            return res.status(404).send({
                errors: [{
                    title: "Rental Error!"
                }, {
                    detail: "Something went wrong while saving the rental!"
                }]
            })
        }

        User.update({
            _id: user
        }, {
                $push: {
                    rentals: newRental
                }
            }, () => { });

        return res.json(newRental);
    })
};


exports.deleteRental = (req, res) => {
    const user = req.user.id;
    Rental.findById(req.params.id)
        .populate("user", '_id')
        .populate({
            path: "bookings",
            select: "startAt",
            match: {
                startAt: {
                    $gt: new Date()
                }
            }
        })
        .exec((err, rental) => {
            if (err) {
                return res.status(422).send({
                    errors: "something went wrong from controller/rental"
                })
            }

            if (rental.user._id.toString() !== user) {
                return res.status(404).send({
                    errors: [{
                        title: "Invalid User",
                        detail: "You are not rental owner!"
                    }]
                });
            }

            if (rental.bookings.length > 0) {
                return res.status(404).send({
                    errors: [{
                        title: "Active Bookings!",
                        detail: "Cannot Delete rental with active bookings!"
                    }]
                });
            }

            rental.remove((err) => {
                if (err) {
                    return res.status(422).send({
                        errors: "something went wrong from controller/rental after removing rental!"
                    })
                }
            });

            return res.json({
                'status': "rental deleted"
            })


        })
};

exports.manageRentals = (req, res) => {
    const user = req.user.id;

    Rental.where({
        user
    })
        .populate('bookings')
        .exec((err, rentals) => {
            if (err) {
                return res.status(422).send({
                    errors: "something went wrong from controller/rental manging rentals!"
                })
            }
            return res.json(rentals);
        });
};


exports.updateRental = (req, res) => {
   
   
    const rentalBody = Object.assign({},req.body); 

    let image = req.file;

    const {
        errors,
        isValid
    } = validateupdateRentalInput(rentalBody);

    
    if (!image) {
        errors.imgError = "img shoud be send buddy";
    }

    // if input is not valid then send and error response
    if (!isValid) {
        return res.status(400).json(errors);
    }


    let rentalData  = req.body;

    let imgUrl = image.path;

    if(imgUrl){
        rentalData = {
            image: imgUrl
        }; 
    }; 


    const user = req.user.id;
    const rentalId = req.params.id;

    Rental.findById(rentalId)
        .populate("user")
        .exec((err, rental) => {
            if (err) {
                return res.status(422).send({
                    errors: mongooseError.normalizeMongooseError(err.errors)
                }); 
            };
            if (rental.user.id !== user) {
                return res.status(404).send({
                    errors: [{
                        title: "Invalid User",
                        detail: "You are not rental owner!"
                    }]
                });
            };

            rental.set(rentalData);

            rental.save((err => {
                if (err) {
                    return res.status(422).send({
                        errors: mongooseError.normalizeMongooseError(err.errors)
                    })
                };
            }));

            res.status(200).send(rental);
        })
};

