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
    pendingPayments: [],
    isFetching: true
  };
  componentDidMount() {
    this.getPendingPayments();
  }

  getPendingPayments = () => {
    getPendingPayments()
      .then(pendingPayments => {
        console.log("fromPendingBookings:", pendingPayments);

        if (pendingPayments) {
          const theRealPendinPayments = pendingPayments.filter(payment => {
            return payment.status === "pending";
          });
          return this.setState({
            ...this.state,
            isFetching: false,
            pendingPayments: theRealPendinPayments
          });
        }
      })
      .catch(err => {
        this.setState({
          ...this.state,
          isFetching: false
        });
        console.error(err);
      });
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
    const { pendingPayments, isFetching } = this.state;

    return (
      <>
        <div class="create-rental-heading">
          <p class="page-subtitle">payments and bookings</p>
          <h2 class="page-title">Pending payments</h2>
        </div>
        <div class="containerPending">
          {isFetching ? <Spinner /> : ""}

          {!isFetching && pendingPayments.length === 0 ? (
            <Error title="No Pending Payments Bookings Found" />
          ) : (
            this.renderPayments(pendingPayments)
          )}
        </div>
      </>
    );
  }
}

export default PendingBookings;
