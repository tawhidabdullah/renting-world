import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserBookings } from "../../../actions/bookingAction";
import "../../../styles/booking/_manageBookings.scss";
import { toUpperCase, pritiyDate } from "../../../helpers";

class BookingManage extends Component {
    componentWillMount() {
        this.props.dispatch(fetchUserBookings());
    }
    render() {
        const { data: bookings, isFetching } = this.props.userBookings;
        return (
            <div style={{ paddingTop: "70px" }}>
                <section id='userBookings'>
                    <h1 className='page-title'>My Bookings</h1>
                    <div className='row'>
                        {bookings.map((booking, index) => {
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
                                                {pritiyDate(booking.startAt)} - {pritiyDate(booking.endAt)}  | {booking.days} days
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
                                            Created {pritiyDate(booking.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {!isFetching && bookings.length === 0 ? (
                        <div class='alert alert-warning'>
                            You have no bookings created go to rentals section and book your place today.
                            <Link
                                style={{ 'margin-left': '10px' }}
                                class='btn btn-secondary'
                                to='/rentals'>Available Rental</Link>
                        </div>
                    ) : ""}
                </section>

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        userBookings: state.userBookings
    }
}


export default connect(mapStateToProps)(BookingManage); 