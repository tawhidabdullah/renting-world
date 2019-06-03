import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toUpperCase, pritifyDate } from "../../../helpers/index";
import RentalManageModal from "../../../components/rental/rental-manage/RentalManageModal";

export default class RentalCard extends Component {
  state = {
    wantDelete: false
  };

  showDeleteMenu = () => {
    this.setState({
      wantDelete: true
    });
  };

  closeDeleteMenu = () => {
    this.setState({
      wantDelete: false
    });
  };

  render() {
    const { rental, rentalIndex, deleteRental } = this.props;
    return (
      <div class="card_rentals">
        <div class="card-thumb">
          <img src={`/${rental.image}`} alt="" />
        </div>
        <div class="card-content">
          <div>
            <span class="card-date">
              {" "}
              Created at {pritifyDate(rental.createdAt)}
            </span>
            <h2 className="card__title">
              {rental.title} - {toUpperCase(rental.city)}
            </h2>
            <p className="card__description">{rental.description}</p>
            <br />
            <Link
              to={`/rentals/${rental._id}`}
              className="card-btn card-btn__default"
            >
              Go to Rental
            </Link>
            {rental.bookings && rental.bookings.length > 0 ? (
              <RentalManageModal bookings={rental.bookings} />
            ) : (
              ""
            )}
            <Link
              to={{
                pathname: `/rentals/${rental._id}/edit`,
                state: { isUpdate: true }
              }}
              class="card-btn card-btn__edit"
            >
              Edit
            </Link>

            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                deleteRental(rental._id, rentalIndex);
              }}
              className="card-btn card-btn__delete"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}
