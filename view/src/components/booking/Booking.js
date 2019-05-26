import React from 'react';
import DateRangePicker from "react-bootstrap-daterangepicker";
import { getRangeDates } from "../../helpers";

import "../../styles/booking/_booking.scss"; 

class Booking extends React.Component {

    constructor(){
        super(); 

        this.bookOutDates = []; 
    }

    componentWillMount(){
        this.getBookedOutDates(); 
    }; 


    getBookedOutDates(){
        const {bookings} = this.props.rental; 

        if(bookings && bookings.length > 0 ){
            bookings.forEach(booking => {
                // GET RENGE HERE 
                const dateRange = getRangeDates(booking.startAt, booking.endAt,  'YY/MM/DD')
                this.bookOutDates.push(...dateRange); 
            });
        }
    }; 

    

  render() {
      const {dailyRate} = this.props.rental; 

    return (
      <div className='booking'>
            <h3 className='booking-price'>${dailyRate}<span className='booking-per-night'>per night</span></h3>
            <hr></hr>
            <div className='form-group'>
            <label htmlFor='dates'>Dates</label>
            <DateRangePicker opens='left' containerStyles={{display: "block"}} >
                <input  id="dates" type='text' className='form-control'></input>
            </DateRangePicker>
            </div> 
            <div className='form-group'>
            <label htmlFor='guests'>Guests</label>
            <input type='number' className='form-control' id='guests' aria-describedby='emailHelp' placeholder=''></input>
            </div>
            <button className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
            <hr></hr>
            <p className='booking-note-title'>People are interested into this house</p>
            <p className='booking-note-text'>
            More than 500 people checked this rental in last month.
            </p>
      </div>
    )
  }
}


export default Booking; 