import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUserBookings, updateBooking } from "../../../actions/bookingAction";
import { getPendingPayments, acceptPayment, declinePayment } from "../../../actions/paymentAction";
import { BookingCard, PaymentCard } from "./BookingCard";
import ReviewModal from "../../review/ReviewModal";


import "../../../styles/booking/_manageBookings.scss";


class BookingManage extends Component {
    state = {
        pendingPayments: []
    }
    componentDidMount() {
        this.props.dispatch(fetchUserBookings());
        this.getPendingPayments();
    };

    getPendingPayments = () => {
        getPendingPayments().then((pendingPayments) => {
            return this.setState({ pendingPayments })
        }).catch(err => console.error(err));
    }

    handleReviewCreated = (review, upadatedBooking) => {
        const { dispatch } = this.props;
        const { data: bookings } = this.props.userBookings;
        const index = bookings.findIndex(booking => {
            return booking._id === upadatedBooking._id
        });
        upadatedBooking.review = review;
        bookings[index] = upadatedBooking;
        dispatch(updateBooking(bookings));
    };

    renderBookings(bookings) {
        return bookings.map((booking, index) => {
            return <BookingCard
                reviewModal={() => <ReviewModal
                    bookingId={booking._id}
                    hasReview={booking.review}
                    onReviewCreated={(review) => {
                        this.handleReviewCreated(review, booking);
                    }}
                />}
                booking={booking}
                key={index} />
        })
    };


    renderPayments = (payments) => {
        return payments.map((payment, index) => {
            return <PaymentCard
                booking={payment.booking}
                payment={payment}
                key={index}
                paymentBtns={this.renderPaymentButtons}
            />
        })
    };

    executeAcceptPayment = (payment) => {
        acceptPayment(payment)
            .then(status => {
                this.getPendingPayments(); 
            })
            .catch(err => console.error(err));
    }; 

    executeDeclinePayment = (payment) => {
        declinePayment(payment)
            .then(status => {
                this.getPendingPayments(); 
            })
            .catch(err => console.error(err));
    }



    renderPaymentButtons = (payment) => {
        return (
            <div>
                <button
                    onClick={() => this.executeAcceptPayment(payment)}
                    className='btn btn-success'>
                    Accept
                </button> {" "}
                <button
                    onClick={() => this.executeDeclinePayment(payment)}
                    className='btn btn-danger'
                >Decline
                </button>
            </div>
        )
    }

    render() {
        const { data: bookings, isFetching } = this.props.userBookings;
        const { pendingPayments } = this.state;
        return (
            <div style={{ paddingTop: "70px" }}>
                <section id='userBookings'>
                    <h1 className='page-title'>My Bookings</h1>
                    <div className='row'>
                        {this.renderBookings(bookings)}
                    </div>
                    {!isFetching && bookings.length === 0 ? (
                        <div class='alert alert-warning'>
                            You have no bookings created go to rentals
                             section and book your place today.
                            <Link
                                style={{ 'margin-left': '10px' }}
                                class='btn btn-secondary'
                                to='/rentals'>Available Rental</Link>
                        </div>
                    ) : ""}
                </section>

                <section id='userBookings'>
                    <h1 className='page-title'>Pending Bookings</h1>
                    <div className='row'>
                        {this.renderPayments(pendingPayments)}
                    </div>
                    {!isFetching && pendingPayments.length === 0 ? (
                        <div class='alert alert-warning'>
                            You no pending bookings currently
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