import axios from "axios";


export const getPendingPayments = () => {
    return axios.get(`/api/payments`)
    .then(res => res.data)
    .catch(({
        response
    }) => Promise.reject(response.data.errors));
}; 