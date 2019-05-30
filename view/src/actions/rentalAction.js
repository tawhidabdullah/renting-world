import axios from "axios";
import {
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_BY_ID_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTALS_INIT,
  UPDATE_RENTAL_SUCCESS,
  UPDATE_RENTAL_FAIL
} from "./types";


// FETCH RENTAL AND RENTALS  //////////////////////////////////////////////////////


const fetchRentalsInit = () => {
  return {
    type: FETCH_RENTALS_INIT,
  };
};

const fetchRentalsFail = (errors) => {
  return {
    type: FETCH_RENTALS_FAIL,
    errors
  }
}


const fetchRentalsByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTALS_BY_ID_SUCCESS,
    rental
  }
}

const fetchRentalsSuccess = (rentals) => {

  return {
    type: FETCH_RENTALS_SUCCESS,
    rentals
  }

}



export const fetchRentals = (city) => dispatch => {
  dispatch(fetchRentalsInit())
  const url = city ? `/api/rentals?city=${city}` : "/api/rentals";
  axios.get(url)
    .then(rentals => rentals.data)
    .then((rentals) => {
      return dispatch(fetchRentalsSuccess(rentals));
    })
    .catch(({
      response
    }) => {
      return dispatch(fetchRentalsFail(response.data.errors));
    })
}



export const createRental = (newRental) => {
  return axios.post('/api/rentals', newRental)
    .then(res => res.data)
    .catch(({
      response
    }) => Promise.reject(response.data.errors));
};





export const fetchRentalsById = (id) => {
  return function (dispatch) {
    return axios.get(`/api/rentals/${id}`)
      .then(rental => rental.data)
      .then(rental => {
        dispatch(fetchRentalsByIdSuccess(rental));
        return rental;
      })
  }

};


// GET USER RENTALS RENTAL //////////////////////////////////////////////////////

export const getUserRentals = () => {
  return axios.get('/api/rentals/manage')
    .then(res => res.data)
    .catch(({
      response
    }) => Promise.reject(response.data.errors));
};

// DELETE RENTAL //////////////////////////////////////////////////////////////////

export const deleteRental = (rentalId) => {
  return axios.delete(`/api/rentals/${rentalId}`)
    .then(res => res.data)
    .catch(({
      response
    }) => Promise.reject(response.data.errors));
};


// UPDATE RENTAL //////////////////////////////////////////////////////////////////


const updateRentalSuccess = (updatedRental) => {
  return {
    type: UPDATE_RENTAL_SUCCESS,
    rental: updatedRental
  }
};

const updateRentalFail = (errors) => {
  return {
    type: UPDATE_RENTAL_FAIL,
    errors
  }
};


export const updateRental = (rentalData, id ) => dispatch => {
  console.log("rentalDAtaFromAction",rentalData); 
  return axios.patch(`/api/rentals/${id}`, rentalData)
    .then(res => res.data)
    .then(updatedRental => dispatch(updateRentalSuccess(updatedRental)))
    .catch(({
      response
    }) => {
      return dispatch(updateRentalFail(response.data.errors));
    })
}; 
