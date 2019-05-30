import {
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTALS_INIT,
    FETCH_RENTALS_FAIL,
    UPDATE_RENTAL_SUCCESS,
    UPDATE_RENTAL_FAIL,
    RESET_RENTAL_ERRORS
} from "../actions/types";


const initialState = {
    rentals: {
        data: [],
        errors: []
    },
    rental: {
        data: {},
        errors: []
    } 
}

export const rentalReducer = (state = initialState.rentals, action) => {
    switch (action.type) {
        case FETCH_RENTALS_SUCCESS:
            return {
                ...state, data: action.rentals
            };
        case FETCH_RENTALS_INIT:
            return {
                ...state, data: [], errors: []
            };
        case FETCH_RENTALS_FAIL:
            return {
                ...state, data: [], errors: action.errors
            }
            default:
                return state;
    };
};

export const selectedRentalReducer = (state = initialState.rental, action) => {
    switch (action.type) {
        case FETCH_RENTAL_BY_ID_SUCCESS:
            return {
                ...state, data: action.rental
            };
        case UPDATE_RENTAL_SUCCESS:
            return {
                ...state, data: action.rental
            };
        case UPDATE_RENTAL_FAIL:
            return {
                ...state, errors: action.errors
            };
        case RESET_RENTAL_ERRORS:
            return {
                ...state, errors: []
            };
        default:
            return state;
    };
};