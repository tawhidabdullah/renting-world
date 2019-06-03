import React, { Component } from "react";
import RentalCard from "./RentalCard";
import { deleteRental } from "../../../actions/rentalAction";
import { toast } from "react-toastify";
import { getUserRentals } from "../../../actions/rentalAction";
import Spinner from "../../../components/commonFeilds/Spinner";
import Error from "../../../pages/Error";

import "../../../styles/sass/components/_searchInput.scss";
import "../../../styles/sass/components/Dashboard/_RentalsContent.scss";

class RentalContent extends Component {
  state = {
    userRentals: [],
    errors: [],
    isFetching: true
  };
  componentWillMount() {
    getUserRentals().then(
      userRentals => {
        this.setState({ ...this.state, userRentals, isFetching: false });
      },
      errors => {
        this.setState({ ...this.state, errors, isFetching: false });
      }
    );
  }

  renderManageCard = rentals => {
    return rentals.map((rental, index) => {
      return (
        <RentalCard
          rentalIndex={index}
          key={index}
          rental={rental}
          deleteRental={this.deleteRentalById}
        />
      );
    });
  };

  deleteRentalById = (rentalId, rentalIndex) => {
    deleteRental(rentalId).then(
      () => {
        this.deleteRentalFromList(rentalIndex);
      },
      errors => {
        // Toast.errors(errors[0].detail);
        toast.error(errors[0].detail);
      }
    );
  };

  deleteRentalFromList = rentalIndex => {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);

    this.setState({
      userRentals
    });
  };

  render() {
    const { userRentals, isFetching } = this.state;
    return (
      <div className="bookingsContent">
        <div class="create-rental-heading">
          <p class="page-subtitle">Rentals</p>
          <h2 class="page-title">Manage Rentals</h2>
        </div>
        <div className="booking-list">
          <div class="product-wrap searchwrap">
            <div class="search">
              <input
                type="text"
                class="searchTerm searchTerm__red"
                placeholder="Search Rentals by name..."
              />
              <button type="submit" class="searchButton searchButton__red">
                <i class="fa fa-search" />
              </button>
            </div>
          </div>
          <div className="rental_card-list">
            {isFetching ? <Spinner /> : ""}
            {userRentals.length === 0 && !isFetching ? (
              <Error title="No Rental Found!" />
            ) : (
              this.renderManageCard(userRentals)
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default RentalContent;
