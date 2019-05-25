import React, { Component } from 'react'; 
import { connect } from "react-redux";
import RentalCard from "./RentalCard";
import { fetchRentals } from "../../actions/rentalAction";



// IMPORT CSS
import "../../styles/rental/_rentalListing.scss";


class RentalList extends Component {
    state = {
       
    }; 

    rentalMapList = () => {
      return this.props.rentals.map((rental,index) => {
            return <RentalCard  key={index} rental={rental} />; 
        }); 
    }; 

    componentWillMount(){
        this.props.dispatch(fetchRentals()); 
    }
    render() {
        return (

        <div className='container' style={{
            paddingTop: "80px"
        }}>
        <section id='rentalListing'>
            <h1 className='page-title'>Your Home All Around the World</h1>
            <div className='row'>
                {this.rentalMapList()}
            </div>
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


export default connect(mapStateToProps)(RentalList); 