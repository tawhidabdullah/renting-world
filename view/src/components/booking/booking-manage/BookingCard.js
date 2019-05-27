import React from 'react'; 
import { Link } from "react-router-dom";
import { toUpperCase, pritifyDate } from "../../../helpers";

const BookingCard = ({booking}) => {
    return (
        <div className='col-md-4'>
        <div className='card text-center'>
            <div className='card-header'>
                {booking.rental ? booking.rental.category : "Deleted Rental"}
            </div>
            <div className='card-block'>
                {booking.rental && (
                    <>
                        <h4 className='card-title'>
                            {booking.rental.title} - {toUpperCase(booking.rental.city)}
                        </h4>
                        <p className='card-text booking-desc'>
                            {booking.rental.discription}
                        </p>
                    </>
                )}

                <p className='card-text booking-days'>
                    {pritifyDate(booking.startAt)} - {pritifyDate(booking.endAt)}  | {booking.days} days
                </p>
                <p className='card-text booking-price'>
                    <span>Price: </span> <span className='booking-price-value'>{booking.totalPrice} $</span>
                </p>
                {booking.rental && (
                    <Link
                        to={`/rentals/${booking.rental._id}`}
                        className='btn btn-bwm'
                    >
                        Go to Rental
             </Link>)}
            </div>
            <div className='card-footer text-muted'>
                Created {pritifyDate(booking.createdAt)}
            </div>
        </div>
    </div>
    )
}

export default BookingCard; 
