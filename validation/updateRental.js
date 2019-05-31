const validator = require('validator');
const isEmpty = require('./isempty');

module.exports = function validateupdateRentalInput(data) { // export validateRegister function 
    let errors = [];
    
    
    const value = Object.keys(data)[0];  
   
    data.city = !isEmpty(data.city) ? data.city : '';
    data.street = !isEmpty(data.street) ? data.street : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.title = !isEmpty(data.title) ? data.title : '';
    data.category = !isEmpty(data.category) ? data.category : '';
    data.dailyRate = !isEmpty(data.dailyRate) ? data.dailyRate : '';
    data.bedrooms = !isEmpty(data.bedrooms) ? data.bedrooms : '';

    // if(value === 'image' && isEmpty(data.image)){
    //     data.image = !isEmpty(data.image) ? data.image : '';
    //     errors.push({title: "image", detail: 'image field is requied!'})
    //     return {
    //         errors,
    //         isValid: isEmpty(errors)
    //     }
    // }
 
    if (value === 'city' && validator.isEmpty(data.city)) {
        errors.push({title: "city", detail: 'City field is required'})
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    if (value === 'street' && validator.isEmpty(data.street)) {
        errors.push({title: "street", detail: 'Street field is required'})
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    if (value === 'description' && validator.isEmpty(data.description)) {
        errors.push({title: "description", detail: 'Description field is required'})
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    if (value === 'title' && validator.isEmpty(data.title)) {
        errors.push({title: "title", detail: 'Title field is required'})
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }


    if (value === 'dailyRate' && validator.isEmpty(data.dailyRate)) {
        errors.push({title: "dailyRate", detail: 'DailyRate field is required'})
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    if ( value === 'category' && validator.isEmpty(data.category)) {
        errors.push({title: "category", detail: 'Category field is required'})
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    if (value === 'bedrooms' && validator.isEmpty(data.bedrooms)) {
        errors.push({title: "bedrooms", detail: 'Bedrooms field is required'})
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }


    return {
        errors,
        isValid: isEmpty(errors)
      };


};