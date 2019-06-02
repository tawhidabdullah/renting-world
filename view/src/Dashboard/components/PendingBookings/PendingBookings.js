import React, { Component } from 'react';
import "../../../styles/sass/components/Dashboard/_pendingBookings.scss";
export default class PendingBookings extends Component {
    render() {
        return (

            <div class="containerPending">
                <div class="card_pending">
                    <div class="card_pending-top">
                        <p class="card_pending-top-description">
                            Tawhid wants to book
                            rental for <span className='card_pending-top-bookedDate'>3/5/4 to 5/55/5</span>
                             cost <span className='card_pending-top-cost'>553$</span>
                            do you confirm payment ?
                        </p>
                    </div>
                    <div class="options">
                        <ul class="option-list">
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-check'></i>
                                </span>
                                <span class="time-frame">Accept Payment</span>
                            </li>
                            <li class="option highlight-blue">
                                <span class="pill">Pending</span>
                                <div class="userImage">
                                    <img src="https://in.bmscdn.com/events/Large/ET00041450.jpg"></img>
                                </div>

                                {/* <span class="time-frame">months</span>
                                <span class="cost">$15/month</span>
                                <span class="savings">25% Savings</span> */}
                            </li>
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-times'> </i>
                                </span>
                                <span class="time-frame">Decline</span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="card_pending">
                    <div class="card_pending-top">
                        <p class="card_pending-top-description">
                            Tawhid wants to book
                            rental for <span className='card_pending-top-bookedDate'>3/5/4 to 5/55/5</span>
                             cost <span className='card_pending-top-cost'>553$</span>
                            do you confirm payment ?
                        </p>
                    </div>
                    <div class="options">
                        <ul class="option-list">
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-check'></i>
                                </span>
                                <span class="time-frame">Accept Payment</span>
                            </li>
                            <li class="option highlight-blue">
                                <span class="pill">Pending</span>
                                <div class="userImage">
                                    <img src="https://in.bmscdn.com/events/Large/ET00041450.jpg"></img>
                                </div>

                                {/* <span class="time-frame">months</span>
                                <span class="cost">$15/month</span>
                                <span class="savings">25% Savings</span> */}
                            </li>
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-times'> </i>
                                </span>
                                <span class="time-frame">Decline</span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="card_pending">
                    <div class="card_pending-top">
                        <p class="card_pending-top-description">
                            Tawhid wants to book
                            rental for <span className='card_pending-top-bookedDate'>3/5/4 to 5/55/5</span>
                             cost <span className='card_pending-top-cost'>553$</span>
                            do you confirm payment ?
                        </p>
                    </div>
                    <div class="options">
                        <ul class="option-list">
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-check'></i>
                                </span>
                                <span class="time-frame">Accept Payment</span>
                            </li>
                            <li class="option highlight-blue">
                                <span class="pill">Pending</span>
                                <div class="userImage">
                                    <img src="https://in.bmscdn.com/events/Large/ET00041450.jpg"></img>
                                </div>

                                {/* <span class="time-frame">months</span>
                                <span class="cost">$15/month</span>
                                <span class="savings">25% Savings</span> */}
                            </li>
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-times'> </i>
                                </span>
                                <span class="time-frame">Decline</span>
                            </li>
                        </ul>
                    </div>

                </div>
                <div class="card_pending">
                    <div class="card_pending-top">
                        <p class="card_pending-top-description">
                            Tawhid wants to book
                            rental for <span className='card_pending-top-bookedDate'>3/5/4 to 5/55/5</span>
                             cost <span className='card_pending-top-cost'>553$</span>
                            do you confirm payment ?
                        </p>
                    </div>
                    <div class="options">
                        <ul class="option-list">
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-check'></i>
                                </span>
                                <span class="time-frame">Accept Payment</span>
                            </li>
                            <li class="option highlight-blue">
                                <span class="pill">Pending</span>
                                <div class="userImage">
                                    <img src="https://in.bmscdn.com/events/Large/ET00041450.jpg"></img>
                                </div>

                                {/* <span class="time-frame">months</span>
                                <span class="cost">$15/month</span>
                                <span class="savings">25% Savings</span> */}
                            </li>
                            <li class="option">
                                <span class="number">
                                    <i className='fa fa-times'> </i>
                                </span>
                                <span class="time-frame">Decline</span>
                            </li>
                        </ul>
                    </div>

                </div>

            </div>

        )
    }
}
