import React from 'react';
import DateRangePicker from "react-bootstrap-daterangepicker";
import { getRangeDates } from "../../helpers";
import * as moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import BookingModal from "./BookingModal";
import { createBooking } from "../../actions/bookingAction";
import { ToastContainer, toast } from "react-toastify";

import "../../styles/booking/_booking.scss";


class Booking extends React.Component {

    constructor() {
        super();
        this.bookOutDates = [];
        this.dateRef = React.createRef();
        this.state = {
            proposedBooking: {
                startAt: "",
                endAt: "",
                guests: "",
            },

            modal: {
                open: false
            },
            errors: []
        }


    }

    componentWillMount() {
        this.getBookedOutDates();
    };


    getBookedOutDates() {
        const { bookings } = this.props.rental;

        if (bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                // GET RENGE HERE 
                const dateRange = getRangeDates(booking.startAt, booking.endAt, 'Y/MM/DD')
                this.bookOutDates.push(...dateRange);
            });
        }
    };


    checkInValidDate = (date) => {
        return this.bookOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
    };

    handleDateApply = (event, picker) => {
        const startAt = picker.startDate.format("Y/MM/DD");
        const endAt = picker.endDate.format("Y/MM/DD");

        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                startAt,
                endAt
            }
        });

        this.dateRef.current.value = startAt + ' to ' + endAt;
    }

    selectGuests = (event) => {
        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                guests: parseInt(event.target.value)
            }
        })
    };

    confirmBookingProposedData = () => {
        const { startAt, endAt } = this.state.proposedBooking;
        let days = getRangeDates(startAt, endAt).length - 1;
        const { rental } = this.props;

        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                days,
                totalPrice: days * rental.dailyRate,
                rental
            },
            modal: {
                open: true
            }
        })
    };

    cancelBookingProposedModal = () => {
        this.setState({
            modal: {
                open: false
            }
        })
    };

    addNewBookedOutDates = (booking) => {
        const dateRange = getRangeDates(booking.startAt, booking.endAt);
        this.bookOutDates.push(dateRange);
    };

    resetFormData = () => {
        this.dateRef.current.value = "";

        this.setState({
            proposedBooking: { guests: "" }
        });
    }

    reserveRental = () => {
        createBooking(this.state.proposedBooking)
            .then(booking => {
                this.addNewBookedOutDates(booking);
                this.cancelBookingProposedModal();
                this.resetFormData();
                toast.success("Booking has been successfully created! Enjoy.")
            }, (errors) => {
                this.setState({ errors })
            })
            ;

    };



    render() {
        const { dailyRate } = this.props.rental;
        const { guests, startAt, endAt } = this.state.proposedBooking;
        const { auth: { isAuthenticate } } = this.props;

        return (
            <div className='booking'>
                <ToastContainer />
                <h3 className='booking-price'>${dailyRate}
                    <span className='booking-per-night'>per night</span>
                </h3>
                <hr></hr>
                {!isAuthenticate &&
                    <Link to={{ pathname: '/login' }}
                        className='btn btn-bwm btn-confirm btn-block'>
                        Login to book place
                     </Link>}
                {isAuthenticate && (
                    <>
                        <div className='form-group'>
                            <label htmlFor='dates'>Dates</label>
                            <DateRangePicker
                                onApply={this.handleDateApply}
                                isInvalidDate={this.checkInValidDate}
                                opens='left'
                                containerStyles={{ display: "block" }}
                            >
                                <input ref={this.dateRef} id="dates" type='text' className='form-control'></input>
                            </DateRangePicker>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='guests'>Guests</label>
                            <input onChange={this.selectGuests}
                                value={guests}
                                type='number'
                                className='form-control'
                                id='guests'
                                aria-describedby='guests'
                                placeholder=''></input>
                        </div>
                        <button
                            disabled={!guests || !startAt || !endAt}
                            onClick={this.confirmBookingProposedData}
                            className='btn btn-bwm btn-confirm btn-block'
                        >
                            Reserve place now
            </button>
                    </>
                )}
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
            </p>
                <BookingModal
                    errors={this.state.errors}
                    confirmModal={this.reserveRental}
                    booking={this.state.proposedBooking}
                    open={this.state.modal.open}
                    closeModal={this.cancelBookingProposedModal}
                    rentalPrice={dailyRate}
                />
            </div>
        )
    }
};


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps)(Booking); 