import axios from "axios";

export const createBooking = (booking) => {
    return axios.post('/api/bookings', booking)
        .then(res => res.data)
        .catch(({
            response
        }) => Promise.reject(response.data.errors));
};