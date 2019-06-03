import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchUserBookings,
  updateBooking
} from "../../../actions/bookingAction";
import ReviewModal from "../../../components/review/ReviewModal";
import BookingsCard from "./BookingsCard";

// IMPORT SCSS
import "../../../styles/sass/components/Dashboard/_bookingsContent.scss";
import "../../../styles/sass/components/_searchInput.scss";

class BookingsContent extends Component {
  state = {
    pendingPayments: []
  };
  componentDidMount() {
    this.props.dispatch(fetchUserBookings());
  }

  onMaterialButtonclick = () => {
    this.props.history.push('/rentals')
  }


  handleReviewCreated = (review, upadatedBooking) => {
    const { dispatch } = this.props;
    const { data: bookings } = this.props.userBookings;
    const index = bookings.findIndex(booking => {
      return booking._id === upadatedBooking._id;
    });
    upadatedBooking.review = review;
    bookings[index] = upadatedBooking;
    dispatch(updateBooking(bookings));
  };

  renderBookings(bookings) {
    return bookings.map((booking, index) => {
      return (
        <BookingsCard
          reviewModal={() => (
            <ReviewModal
              bookingId={booking._id}
              hasReview={booking.review}
              onReviewCreated={review => {
                this.handleReviewCreated(review, booking);
              }}
            />
          )}
          booking={booking}
          key={index}
        />
      );
    });
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;

    return (
      <div>
        <div className="containerx">
          <div className="header-wrapper">
            <div className="title">
              Here is your All the bookings that your made !
            </div>
            <div className="note">
              Total: <span className="focus">250 </span>bookings{" "}
              <span className="focus">Since</span> on Saturday, June 5.
            </div>
            <div class="product-wrap searchwrap">
              <div class="search">
                <input
                  type="text"
                  class="searchTerm searchTerm__red"
                  placeholder="Search Bookings by name..."
                />
                <button type="submit" class="searchButton searchButton__red">
                  <i class="fa fa-search" />
                </button>
              </div>
            </div>
            <span
              className="material-button"
              onClick={this.onMaterialButtonclick}
            >
              <i className="fa fa-plus" />
            </span>
          </div>
          <div className="content-wrapper">
            <div className="table-wrapper">{this.renderBookings(bookings)}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userBookings: state.userBookings
  };
};

export default connect(mapStateToProps)(withRouter(BookingsContent));
