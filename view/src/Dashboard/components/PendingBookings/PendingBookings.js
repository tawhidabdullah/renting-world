import React, { Component } from "react";
import Spinner from "../../../components/commonFeilds/Spinner";
import Error from "../../../pages/Error";
import {
  getPendingPayments,
  acceptPayment,
  declinePayment
} from "../../../actions/paymentAction";
import PendingCard from "./PendingCard";

import "../../../styles/sass/components/Dashboard/_pendingBookings.scss";
class PendingBookings extends Component {
  state = {
    pendingPayments: []
  };
  componentDidMount() {
    this.getPendingPayments();
  }

  getPendingPayments = () => {
    getPendingPayments()
      .then(pendingPayments => {
        return this.setState({ pendingPayments });
      })
      .catch(err => console.error(err));
  };

  renderPayments = payments => {
    return payments.map((payment, index) => {
      return (
        <PendingCard
          booking={payment.booking}
          payment={payment}
          key={index}
          acceptBtn={this.renderAcceptPaymentButton}
          declineBtn={this.renderDeclinePaymentButton}
        />
      );
    });
  };

  executeAcceptPayment = payment => {
    acceptPayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  };

  executeDeclinePayment = payment => {
    declinePayment(payment)
      .then(status => {
        this.getPendingPayments();
      })
      .catch(err => console.error(err));
  };

  renderAcceptPaymentButton = payment => {
    return (
      <>
        <li class="option">
          <span class="number">
            <i
              onClick={() => this.executeAcceptPayment(payment)}
              className="fa fa-check"
            />
          </span>
          <span class="time-frame">Accept Payment</span>
        </li>
      </>
    );
  };

  renderDeclinePaymentButton = payment => {
    return (
      <li class="option">
        <span class="number">
          <i
            onClick={() => this.executeDeclinePayment(payment)}
            className="fa fa-times"
          >
            {" "}
          </i>
        </span>
        <span class="time-frame">Decline</span>
      </li>
    );
  };

  render() {
    const { pendingPayments } = this.state;
    return (
      <>
        <div class="create-rental-heading">
          <p class="page-subtitle">payments and bookings</p>
          <h2 class="page-title">Pending payments</h2>
        </div>
        <div class="containerPending">
        <Error/> 
          {/* {pendingPayments.length === 0 ? : this.renderPayments(pendingPayments)} */}
        </div>
      </>
    );
  }
}

export default PendingBookings;
