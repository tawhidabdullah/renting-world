import React, { Component } from 'react';
import { getUserRentals } from "../../../actions/rentalAction";


class RentalManage extends Component {
    state = {
        userRentals: [],
        errors: []
    }
    componentWillMount() {
        getUserRentals().then(
            (userRentals) => { this.setState({ userRentals }) },
            (errors) => { this.setState({ errors }) }
        );
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}
export default RentalManage; 