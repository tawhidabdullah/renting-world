import axios from "axios";

export const createReview = (reviewData, bookingId) => {
    return axios.post(`/api/reviews?bookingId=${bookingId}`, reviewData)
        .then(res => res.data)
        .catch(({
            response
        }) => Promise.reject(response.data.errors));
};



export const getReviews = (rentalId) => {
    return axios.get(`/api/reviews?rentalId=${rentalId}`)
    .then(res => res.data)
    .catch(({
        response
    }) => Promise.reject(response.data.errors));
}; 