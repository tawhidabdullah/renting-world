import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserBookings } from "../../../actions/bookingAction";
import BookingCard from "./BookingCard";
import "../../../styles/booking/_manageBookings.scss";


class BookingManage extends Component {
    componentWillMount() {
        this.props.dispatch(fetchUserBookings());
    }
    renderBookings(bookings){
        return  bookings.map((booking, index) => {
            return <BookingCard booking={booking} key={index} />
        })}
    
    render() {
        const { data: bookings, isFetching } = this.props.userBookings;
        return (
            <div style={{ paddingTop: "70px" }}>
                <section id='userBookings'>
                    <h1 className='page-title'>My Bookings</h1>
                    <div className='row'>
                      {this.renderBookings(bookings)}
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