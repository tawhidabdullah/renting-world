import React, { Component } from 'react';
import  "../../styles/sass/main.scss";
import AddNewRental from "../components/AddNewRental/AddNewRental";
import UserProfile from "../components/UserProfile/UserProfile";
import RentalsContent from "../components/RentalsContent/RentalsContent";
import BookingsContent from "../components/BookingsContent/BookingsContent";
import PendingBookings from "../components/PendingBookings/PendingBookings";
export default class Dashboard extends Component {
    state = {
        isAddNewRental: false,
        isUserProfile: true,
        isRentals: false,
        isBookings: false,
        isPendings: false
    };


    renderAddNewRental = () => {
        this.setState({
            isAddNewRental: true,
            isUserProfile: false,
            isRentals: false,
            isBookings: false,
            isPendings: false
        })
    };

    renderUserProfile = () => {
        this.setState({
            isAddNewRental: false,
            isUserProfile: true,
            isRentals: false,
            isBookings: false,
            isPendings: false
        })
    };

    renderRentals = () => {
        this.setState({
            isAddNewRental: false,
            isUserProfile: false,
            isRentals: true,
            isBookings: false,
            isPendings: false
        })
    };

    renderBookings = () => {
        this.setState({
            isAddNewRental: false,
            isUserProfile: false,
            isRentals: false,
            isBookings: true,
            isPendings: false
        });


    }

    renderPendingBookings = () => {
        this.setState({
            isAddNewRental: false,
            isUserProfile: false,
            isRentals: false,
            isBookings: false,
            isPendings: true
        });
    }


    render() {
        const { isAddNewRental, isUserProfile, isRentals, isBookings, isPendings } = this.state;
        return (
            <div class="container__of-dashboard">
                {/* <header class="header">
                    {/* <img src="img/logo.png" alt="dashboard logo image" class="logo" /> */}
                    {/* <form action="#" class="search">
                        <input type="text" class="search__input" placeholder="search yourself" />
                        <button class="search__button">

                        </button>
                    </form>
                    <nav class="user-nav"> */}
                        {/* <div class="user-nav__icon-box">
                     
                        <span class="user-nav__notifiction user-nav__notifiction--1">34</span>
                    </div>
                    <div class="user-nav__icon-box">
                        
                        <span class="user-nav__notifiction user-nav__notifiction--2">4</span>
                    </div>
                    <div class="user-nav__user">
                        <img src="img/logo.png" alt="this is a user photo" class="user-nav__user-photo" />
                        <span class="user-nav__user-name">Tawhid</span>
                    </div> */}
                    {/* </nav> */}
                {/* </header> */} */}
                <div class="content">
                    <nav class="sidebar">
                        <ul class="side-nav">
                            <li
                                class={isAddNewRental ?
                                    "side-nav__item side-nav__item--active" :
                                    " side-nav__item"}
                                onClick={this.renderAddNewRental}
                            >

                                <a href="#" class="side-nav__link">
                                    <i className='fa fa-edit' ></i>
                                    <span class="side-nav__text">Add New Rental</span>
                                </a>
                            </li>
                            <li class={isRentals ?
                                "side-nav__item side-nav__item--active" :
                                " side-nav__item"}
                                onClick={this.renderRentals}
                            >
                                <a href="#" class="side-nav__link">
                                    <i className='fa fa-retweet'></i>
                                    <span class="side-nav__text">Rentals</span>
                                </a>
                            </li>
                            <li class={isBookings ?
                                "side-nav__item side-nav__item--active" :
                                " side-nav__item"}
                                onClick={this.renderBookings}
                            >
                                <a href="#" class="side-nav__link">
                                    <i className='fa fa-ticket' ></i>
                                    <span class="side-nav__text">Bookings</span>
                                </a>
                            </li>
                            <li class={isBookings ?
                                "side-nav__item side-nav__item--active" :
                                " side-nav__item"}
                                onClick={this.renderPendingBookings}
                            >
                                <a href="#" class="side-nav__link">
                                    <i className='fa fa-random'></i>
                                    <span class="side-nav__text">Pendings</span>
                                </a>
                            </li>
                            <li
                                class={isUserProfile ?
                                    "side-nav__item side-nav__item--active" :
                                    " side-nav__item"}
                                onClick={this.renderUserProfile}>
                                <a href="#" class="side-nav__link">
                                    <i className='fa fa-user'></i>
                                    <span class="side-nav__text">User Profile</span>
                                </a>
                            </li>
                        </ul>

                        <div class="legal">
                            &copy; 2019 copyright , All right reserve by Tawhid Abdullah
                    </div>
                    </nav>
                    <main class="dashboard__main-content">
                        {isAddNewRental ? <AddNewRental /> : ""}
                        {isUserProfile ? <UserProfile /> : ""}
                        {isRentals ? <RentalsContent /> : ""}
                        {isBookings ? <BookingsContent /> : ""}
                        {isPendings ? <PendingBookings /> : ""}
                    </main>
                </div>
            </div>
        )
    }
}
