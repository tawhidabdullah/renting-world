import {
  combineReducers
} from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import {
  rentalReducer,
  selectedRentalReducer
} from "./rentalReducer";
import userBookingsReducer from "./bookingReducer";


export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  rentals: rentalReducer,
  rental: selectedRentalReducer,
  userBookings: userBookingsReducer

});