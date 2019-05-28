import axios from "axios";
import {
    FETCH_USER_BOOKINGS_FAIL,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_INIT,
    UPDATE_BOOKING_REVIEWS
} from "./types";


const fetchUserBookingsInit = () => {
    return {
        type: FETCH_USER_BOOKINGS_INIT
    }
}

const fetchUserBookingsSuccess = (userBookings) => {
    return {
        type: FETCH_USER_BOOKINGS_SUCCESS,
        userBookings
    }
}
const fetchUserBookingsFail = (errors) => {
    return {
        type: FETCH_USER_BOOKINGS_FAIL,
        errors
    }
}



export const createBooking = (booking) => {
    return axios.post('/api/bookings', booking)
        .then(res => res.data)
        .catch(({
            response
        }) => Promise.reject(response.data.errors));
};


export const fetchUserBookings = () => dispatch => {
    dispatch(fetchUserBookingsInit());
    axios.get('/api/bookings/manage')
        .then(bookings => bookings.data)
        .then((bookings) => {
            return dispatch(fetchUserBookingsSuccess(bookings));
        })
        .catch(({
            response
        }) => {
            return dispatch(fetchUserBookingsFail(response.data.errors));
        })
};

export const  updateBooking = (bookings) => {
    return {
        type: UPDATE_BOOKING_REVIEWS,
        bookings
    }
}