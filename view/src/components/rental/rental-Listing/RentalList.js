import React, { Component } from 'react'; 
import RentalCard from "./RentalCard";



// IMPORT CSS
import "../../../styles/rental/_rentalListing.scss";


class RentalList extends Component {

    rentalMapList = () => {
      return this.props.rentals.map((rental,index) => {
            return <RentalCard  key={index} rental={rental} />; 
        }); 
    }; 

    render() {
        return (
            <div className='row'>
                {this.rentalMapList()}
            </div>
        )
    }
}; 

export default RentalList; 