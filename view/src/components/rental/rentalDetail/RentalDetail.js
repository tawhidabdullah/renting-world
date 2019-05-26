import React, { Component } from 'react'; 
import { connect } from "react-redux";
import { fetchRentalsById } from "../../../actions/rentalAction";
import RentalDetailInfo from "./RentalDetailInfo";
import RentalMap from "./RentalMap";
import Booking from "../../booking/Booking";


// import css
import "../../../styles/rental/_rentalDetail.scss"; 


class RentalDetail extends Component {
    componentWillMount(){
        const rentalId = this.props.match.params.id;
        this.props.dispatch(fetchRentalsById(rentalId)); 
    }
    render() {
        const rental = this.props.rental; 
        const {image,_id,city,street} = rental;
        if(_id){
            return (
             <div className='container'>
                    <section id='rentalDetails'>
                     <div className='upper-section'>
                         <div className='row'>
                         <div className='col-md-6'>
                             <img src={image} alt=''></img>
                         </div>
                         <div className='col-md-6'>
                         <RentalMap location={`${city}, ${street}`} />
                         </div>
                         </div>
                     </div>
                        
                     <div className='details-section'>
                         <div className='row'>
                         <div className='col-md-8'>
                             <RentalDetailInfo rental = {this.props.rental} />
                         </div>
                         <div className='col-md-4'> <Booking rental={rental} /></div>
                         </div>
                     </div>
                 </section>
             </div>
         )
    }

    else  return <h1>loading...</h1>   
};
}; 
const mapStateToProps = (state) => {
    return {
        rental: state.rental.data
    }
}; 


export default connect(mapStateToProps)(RentalDetail); 




