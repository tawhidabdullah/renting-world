import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  toUpperCase,
  pritifyDate,
  isDateExpired
} from "../../../helpers/index";

export default class BookingsCard extends Component {
  render() {
    const { booking, reviewModal } = this.props;
    const isExpired = !isDateExpired(booking.endAt);

    return (
      <div class="listing-card">
        <div class="card-wrapper">
          <div class="right-column">
            <div class="heart-rating">
              <span class="__heart" />
              <span class="__percentage">{booking.totalPrice}$</span>
            </div>
            <button class="action-button">
              {booking.rental && (
                <Link style={{
                  color: 'white',
                  textDecoration: "none"
                }} to={`/rentals/${booking.rental._id}`}>Go to Rental</Link>
              )}
              {booking.rental ? "" : "Deleted Rental"}
            </button>
            {reviewModal && isExpired && !!!booking.review && reviewModal()}
          </div>
          <div class="poster">
            <img src={booking.rental ? booking.rental.image : ""} />
          </div>
          <div class="movie-info">
            {booking.rental && (
              <>
                <span class="title">
                  {booking.rental ? booking.rental.title : "Deleted Rental"}
                </span>
                <span class="language">{booking.rental.category}</span>
              </>
            )}

            <ul class="genre">
              <li> Created at {pritifyDate(booking.createdAt)}</li>
            </ul>
            <ul class="tags">
              <li>
                {" "}
                {pritifyDate(booking.startAt)}&nbsp; &rarr; &nbsp;{pritifyDate(booking.endAt)}{" "}
              </li>
              <li>{booking.days} days</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
