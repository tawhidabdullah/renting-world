import React, { Component } from 'react'; 
import { Elements } from "react-stripe-elements";
import CheckOutForm from "./CheckOutForm";

class Payment extends Component {
    render() {

        return (
            <Elements>
                <CheckOutForm {...this.props} />
            </Elements>
        )
    }
}; 

export default Payment; 