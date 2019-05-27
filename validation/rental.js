const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateLoginInput(data) { // export validateRegister function 
    let errors = {};


    data.city = !isEmpty(data.city) ? data.city : '';
    data.street = !isEmpty(data.street) ? data.street : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.dailyRate = !isEmpty(data.dailyRate) ? data.dailyRate : '';
    data.bedrooms = !isEmpty(data.bedrooms) ? data.bedrooms : '';


    if (validator.isEmpty(data.city)) {
        errors.city = 'City field is required';
    }


    if (validator.isEmpty(data.street)) {
        errors.street = 'Street field is required';
    }

    if (validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    if (
        !validator.isLength(data.description, {
            min: 2,
            max: 50
        })
    ) {
        errors.description = "Description must between 2 and 50 characters";
    }


    if (validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (
        !validator.isLength(data.title, {
            min: 2,
            max: 20
        })
    ) {
        errors.title = "title must between 2 and 20 characters";
    }


    if (validator.isEmpty(data.category)) {
        errors.category = 'Category field is required';
    }


    if (validator.isEmpty(data.dailyRate)) {
        errors.dailyRate = 'DailyRate field is required';
    }

    if (validator.isEmpty(data.bedrooms)) {
        errors.bedrooms = 'Bedrooms field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }


};