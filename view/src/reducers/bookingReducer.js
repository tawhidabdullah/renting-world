import {
    FETCH_USER_BOOKINGS_INIT,
    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL
} from "../actions/types";


const INIT_STATE = {
    data: [],
    errors: [],
    isFetching: false
};


const userBookingsReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_BOOKINGS_INIT:
            return {
                ...state, data: [], errors: [], isFetching: true
            }

            case FETCH_USER_BOOKINGS_SUCCESS:
                return {
                    ...state, data: action.userBookings, errors: [], isFetching: false
                }

                case FETCH_USER_BOOKINGS_FAIL:
                    return {
                        ...state, errors: action.errors, data: [], isFetching: false
                    }

                    default:
                        return state;
    }
};

export default userBookingsReducer;