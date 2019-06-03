import React, { Component } from "react";

export default class RentalCard extends Component {
    state = {
        wantDelete: false
    };

    showDeleteMenu = () => {
        this.setState({
            wantDelete: true
        })
    }

    closeDeleteMenu = () => {
        this.setState({
            wantDelete: false
        })
    }



  render() {
    const { rental, rentalIndex, deleteRental } = this.props;
    return (
      <div class="card_rentals">
        <div class="card-thumb">
          <img
            src="https://images.unsplash.com/photo-1558623869-0507000fa875?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
            alt=""
          />
        </div>
        <div class="card-content">
          <div>
            <span class="card-date">31 March 2019</span>
            <h2 className="card__title">Bookings Name</h2>
            <p className="card__description">
              Lorem ipsum dolor sit, Vel repudiandae eos provident fugit aliquid
              atque architecto fugiat a nesciunt aut, ipsa sed tenetur sint
              eligendi veniam iusto autem numquam? Distinctio!
            </p>
            <br />
            <a href="#" class="card-btn card-btn__default">
              Go to Rental
            </a>
            <a href="#" class="card-btn card-btn__delete">
              Delete
            </a>
            <a href="#" class="card-btn card-btn__edit">
              Edit
            </a>
          </div>
        </div>
      </div>
    );
  }
}
