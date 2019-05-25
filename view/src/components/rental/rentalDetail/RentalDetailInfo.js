import React from 'react'; 
import RentalAssets from "./RentalAssets";
import { rentalType,toUpperCase } from "../../../helpers";

const RentalDetailInfo = ({rental}) => {
    const {title,city,category,image,shared,description,bedrooms} = rental; 
    return (
        <div className='rental'>
            <h2 className={`rental-type ${category}`}>{rentalType(shared)} {category}</h2>
            <h1 className='rental-title'>{title}</h1>
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

export default RentalDetailInfo; 
