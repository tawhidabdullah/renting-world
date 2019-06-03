import React, { Component } from "react";
import { isDateExpired, pritifyDate } from "../../../helpers/index";

class PendingCard extends Component {
  render() {
    const { booking, payment, reviewModal, acceptBtn, declineBtn } = this.props;

    const isExpired = !isDateExpired(booking.endAt);
    return (
      <div class="card_pending">
        <div class="card_pending-top">
          <p class="card_pending-top-description">
            {payment.fromUser.name} wants to book rental for
            <span className="card_pending-top-bookedDate">
              {pritifyDate(booking.startAt)} - {pritifyDate(booking.endAt)} |{" "}
              {booking.days} days
            </span>
            cost <span className="card_pending-top-cost">{payment.amount}$</span>
            do you confirm payment ?
          </p>
        </div>
        <div class="options">
          <ul class="option-list">
         
          {payment.status === "pending" &&  acceptBtn && acceptBtn(payment)}
            <li class="option highlight-blue">
              <span class="pill">{payment.status}</span>
              <div class="userImage">
                <img src={payment.fromUser.image} />
              </div>

              {/* <span class="time-frame">months</span>
                        <span class="cost">$15/month</span>
                        <span class="savings">25% Savings</span> */}
            </li>
            {payment.status === "pending" &&  declineBtn && declineBtn(payment) }
          </ul>
        </div>
      </div>
    );
  }
}
export default PendingCard;
