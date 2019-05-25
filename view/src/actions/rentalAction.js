import axios from "axios";
import {
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_BY_ID_SUCCESS
} from "./types";




export const fetchRentals = () => dispatch => {
  axios.get('/api/rentals')
    .then(rentals => rentals.data)
    .then((rentals) => {
      dispatch(fetchRentalsSuccess(rentals));
    })
}



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