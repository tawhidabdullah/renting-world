import axios from "axios";
import {
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_BY_ID_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTALS_INIT,
  GET_ERRORS
} from "./types";


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
    axios.get(`/api/rentals/${id}`)
      .then(rental => rental.data)
      .then(rental => {
        dispatch(fetchRentalsByIdSuccess(rental));
      })
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