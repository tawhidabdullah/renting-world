import React, { Component } from 'react';
import RentalCard from "./RentalCard";
import { deleteRental } from "../../../actions/rentalAction";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getUserRentals } from "../../../actions/rentalAction";
import RentalManageCard from "./RentalManageCard";
import "../../../styles/sass/components/_searchInput.scss"; 
import "../../../styles/sass/components/Dashboard/_RentalsContent.scss";

class RentalContent extends Component {
    state = {
        userRentals: [],
        errors: [],
        isFetching: false
    }
    componentWillMount() {
        getUserRentals().then(
            (userRentals) => { this.setState({ ...this.state, userRentals, isFetching: false }) },
            (errors) => { this.setState({ ...this.state, errors, isFetching: false }) }
        );
    }

    renderManageCard = (rentals) => {
        return rentals.map((rental, index) => {
            return <RentalManageCard
                rentalIndex={index}
                key={index}
                rental={rental}
                deleteRental={this.deleteRentalById}
            />
        })
    }

    deleteRentalById = (rentalId, rentalIndex) => {
        deleteRental(rentalId).then(() => {
            this.deleteRentalFromList(rentalIndex);
        }, (errors) => {
            // Toast.errors(errors[0].detail); 
            toast.error(errors[0].detail);

        })
    };


    deleteRentalFromList = (rentalIndex) => {
        const userRentals = this.state.userRentals.slice();
        userRentals.splice(rentalIndex, 1);

        this.setState({
            userRentals
        })
    }


    render() {
        return (
            <div className='bookingsContent'>
                <div class="create-rental-heading">
                    <p class="page-subtitle">Bookings</p>
                    <h2 class="page-title">Manage Rentals</h2>
                </div>
                <div className='booking-list'>
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
                 
                </div>
            </div>
        )
    }
}

export default RentalContent; 