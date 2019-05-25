import React, { Component } from 'react'; 
import { connect } from "react-redux";
import { fetchRentalsById } from "../../../actions/rentalAction";
import RentalDetailInfo from "./RentalDetailInfo";
import { MapWithAMarker } from "../../../components/map/GoogleMap";


// import css
import "../../../styles/rental/_rentalDetail.scss"; 


class RentalDetail extends Component {
    componentWillMount(){
        const rentalId = this.props.match.params.id;
        this.props.dispatch(fetchRentalsById(rentalId)); 
    }
    render() {
        const rental = this.props.rental; 
        const {image,_id} = rental;
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
                         <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzoIBnGmTZPsKLJ-1RBVk3gKO6gS6BHLU&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `360px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            />
                         </div>
                         </div>
                     </div>
 
                     <div className='details-section'>
                         <div className='row'>
                         <div className='col-md-8'>
                             <RentalDetailInfo rental = {this.props.rental} />
                         </div>
                         <div className='col-md-4'> BOOKING</div>
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




