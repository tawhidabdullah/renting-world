import React, { Component } from 'react';
import { injectStripe, CardElement } from "react-stripe-elements";
import { cardElementStylesForStripeCard } from "../../utilities/index";

import  "../../styles/payment/_paymentConfirmbutton.scss";


class CheckOutForm extends Component {

    state = {
        error: undefined
    }


    handleSubmit = (e) => {
        e.preventDefault(); 
        const {stripe, setPaymentToken} = this.props;
        if(stripe){
            stripe.createToken()
                .then(payload => {
                    if(payload.error){
                        setPaymentToken(undefined);
                      return  this.setState({
                            error: payload.error.message
                        })
                    }

                    setPaymentToken(payload.token.id);
                }); 
        }
        else{
            console.error("Stripe.js hasn't loaded yet!")
        }
    }; 
    render() {
        const {error} = this.state; 
      return (
            <form onSubmit={this.handleSubmit}  className='checkoutForm'>
                <CardElement {...cardElementStylesForStripeCard()} />
                <p>You will be not charged yet.</p>
                {error && <div className='alert
                 alert-danger
                 '  style={{
                    fontSize: "13px", 
                    padding: "8px", 
                    marginTop: "5px",
                    marginBottom: "5px"
                 }}>{error} </div>}
                <button id='paymentConfirmbutton'>Confirm Payment</button>
            </form>
        )
    }
}
export default injectStripe(CheckOutForm); 