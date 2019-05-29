import axios from "axios";


export const getPendingPayments = () => {
    return axios.get(`/api/payments`)
    .then(res => res.data)
    .catch(({
        response
    }) => Promise.reject(response.data.errors));
}; 


export const acceptPayment = (payment) => { 
    return axios.post(`/api/payments/accept`, payment)
    .then(res => res.data)
    .catch(({
        response
    }) => Promise.reject(response.data.errors));
}; 



export const declinePayment = (payment) => {
    return axios.post(`/api/payments/decline`, payment)
    .then(res => res.data)
    .catch(({
        response
    }) => Promise.reject(response.data.errors));
}; 

