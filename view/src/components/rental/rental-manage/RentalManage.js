import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { getUserRentals } from "../../../actions/rentalAction";
import RentalManageCard from "./RentalManageCard";
import "../../../styles/rental/_rentalManage.scss";
import { deleteRental } from "../../../actions/rentalAction";
import { ToastContainer, toast } from "react-toastify";

class RentalManage extends Component {
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
        const { userRentals, isFetching } = this.state;
        return (
            <section id='userRentals'>
                <ToastContainer />
                <h1 className='page-title'>My Rentals</h1>
                <div className='row'>
                    {this.renderManageCard(userRentals)}
                </div>
                {isFetching && userRentals.length === 0 ? (
                    <div className='alert alert-warning'>
                        You dont have any rentals currenty created.
                         If you want advertised your property
                        please follow this link.
                        <Link
                            style={{ 'marginLeft': '10px' }}
                            className='btn btn-secondary'
                            to='/rentals/new'>
                            Register Rental
                        </Link>
                    </div>
                ) : ""}
            </section>
        )
    }
}
export default RentalManage; 