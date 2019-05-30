import React, { Component } from 'react';
import RentalAssets from "./RentalAssets";
import { updateRental } from "../../../actions/rentalAction";
import { rentalType, toUpperCase } from "../../../helpers";
import EditableInput from "../../commonFeilds/editable/EditableInput";
import "../../../styles/rental/_rentalDetailInfo.scss";



export default class RentalDetailUpdate extends Component {
    updateRental = (rentalData) => {
        const {rental : {_id}, dispatch} = this.props; 
        dispatch(updateRental(rentalData,_id)); 
    }
    render() {
        const { city, category, shared, description, bedrooms, user } = this.props.rental;
        return (
            <div className='rental'>
                <h1>update Component</h1>
                <h2 className={`rental-type ${category}`}>
                    {rentalType(shared)} {category}
                </h2>
                <div className='rental-owner'>
                    <img
                        src={user.avatar}
                        alt='owner' />
                    <span>{user && user.name}</span>
                </div>

                <EditableInput
                    updateEntity={this.updateRental}
                    className={'rental-title'}
                    entity={this.props.rental}
                    entityField={'title'} />
                <h2 className='rental-city'>{toUpperCase(city)}</h2>
                <div className='rental-room-info'>
                    <span><i className='fa fa-building'></i>{bedrooms} bedrooms</span>
                    <span><i className='fa fa-user'></i> {bedrooms + 4} guests</span>
                    <span><i className='fa fa-bed'></i> {bedrooms + 2} beds</span>
                </div>
                <p className='rental-description'>
                    {description}
                </p>
                <hr></hr>
                <RentalAssets />
            </div>
        )
    }
}; 
