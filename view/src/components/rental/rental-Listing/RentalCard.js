import React from 'react'; 
import "../../../styles/rental/_rentalCard.scss"; 
import { Link } from "react-router-dom";
import { rentalType } from "../../../helpers/index";

const RentalCar = ({rental}) => {
  const {title,city,category,dailyRate,image,shared,_id} = rental; 
    return (
        <div className='col-md-3 col-xs-6'>
          <Link className='rental-detail-link' to={`/rentals/${_id}`}>
              <div className='card bwm-card'>
                <img className='card-img-top' src={image} alt=''></img>
                <div className='card-block'>
                  <h6 className={`card-subtitle ${category}`}>
                     {rentalType(shared)} {category} &#183; {city} 
                  </h6>
                  <h4 className='card-title'>{title}</h4>
                  <p className='card-text'>${dailyRate} per Night &#183; Free Cancelation</p>
                 
                </div>
              </div>
          </Link>
      </div>
    )
}

export default RentalCar; 
