import React, { Component } from 'react';
import "../../../styles/sass/components/_searchInput.scss"; 
import "../../../styles/sass/components/Dashboard/_RentalsContent.scss";

class RentalContent extends Component {
    render() {
        return (
            <div className='bookingsContent'>
                <div class="create-rental-heading">
                    <p class="page-subtitle">Bookings</p>
                    <h2 class="page-title">Manage Rentals</h2>
                </div>
                <div className='booking-list'>
                    <div class="product-wrap searchwrap">
                        <div class="search">
                            <input
                                type="text"
                                class="searchTerm searchTerm__red"
                                placeholder="Search Rentals by name..."
                            />
                            <button type="submit" class="searchButton searchButton__red">
                                <i class="fa fa-search" />
                            </button>
                        </div>
                    </div>
                    <div class="card_rentals">
                        <div class="card-thumb">
                            <img src='https://images.unsplash.com/photo-1558623869-0507000fa875?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='' />
                        </div>
                        <div class="card-content">
                            <div>
                                <span class="card-date">31 March 2019</span>
                                <h2 className='card__title'>Bookings Name</h2>
                                <p className='card__description'>
                                    Lorem ipsum dolor sit, Vel repudiandae eos provident fugit aliquid atque architecto fugiat a nesciunt aut, ipsa sed tenetur sint eligendi veniam iusto autem numquam? Distinctio!
                           </p>
                                <br />
                                <a href="#" class="card-btn card-btn__default">Go to Rental</a>
                                <a href="#" class="card-btn card-btn__delete" >Delete</a>
                                <a href="#" class="card-btn card-btn__edit" >Edit</a>
                            </div>
                        </div>
                    </div>
           
                </div>
            </div>
        )
    }
}

export default RentalContent; 