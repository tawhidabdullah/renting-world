import React, { Component } from 'react'; 
import { connect } from "react-redux";
import { fetchRentals } from "../../../actions/rentalAction";
import RentalList from "./RentalList";



// IMPORT CSS
import "../../../styles/rental/_rentalListing.scss";


class RentalListing extends Component {

    componentWillMount(){
        this.props.dispatch(fetchRentals()); 
    }
    render() {
        return (

        <div className='container' style={{
            paddingTop: "80px"
        }}>
        <section id='rentalListing'>
            <h1 className='page-title'>All The Rentals</h1>
           <RentalList rentals={this.props.rentals} />
        </section>
        </div>
        )
    }
}; 

const mapStateToProps = (state) => {
    return {
        rentals: state.rentals.data
    }
}; 


export default connect(mapStateToProps)(RentalListing); 