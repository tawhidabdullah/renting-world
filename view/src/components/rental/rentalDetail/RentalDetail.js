import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchRentalsById } from "../../../actions/rentalAction";
import { getReviews } from "../../../actions/reviewAction";
import RentalDetailInfo from "./RentalDetailInfo";
import RentalDetailUpdate from "./RentalDetailUpdate";
import RentalMap from "./RentalMap";
import Booking from "../../booking/Booking";
import Review from "./Review";



// import css
import "../../../styles/rental/_rentalDetail.scss";


class RentalDetail extends Component {
    state = {
        reviews: []
    }
    componentWillMount() {
        const rentalId = this.props.match.params.id;
        this.props.dispatch(fetchRentalsById(rentalId))
            .then(rental => {
                this.getBookingReviews(rental._id);
            });

    }

    renderRentalDetail = (rental) => {
        const {isUpdate} = this.props.location.state || false; 
      
        return isUpdate ? <RentalDetailUpdate
            rental={rental}
            dispatch={this.props.dispatch} /> :
            <RentalDetailInfo rental={rental} />;
    }


    getBookingReviews = (rentalId) => {
        getReviews(rentalId).then((reviews) => {
            this.setState({ reviews })
        });
    }
    render() {
        const rental = this.props.rental;
        const { image, _id, city, street } = rental;
        const { reviews } = this.state;
        if (_id) {
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
                                    {this.renderRentalDetail(rental)}
                                </div>
                                <div className='col-md-4'> <Booking rental={rental} /></div>
                            </div>
                        </div>
                        {reviews && reviews.length > 0 && (
                            <div className="row">
                                <div className="col-md-8">
                                    <section style={{ marginBottom: '40px' }}>
                                        <h2>Reviews</h2>
                                        {reviews.map((review, index) => {
                                            return <Review
                                                review={review}
                                                key={index} />
                                        })}
                                    </section>
                                </div>
                            </div>
                        )}

                    </section>
                </div>
            )
        }

        else return <h1>loading...</h1>
    };
};
const mapStateToProps = (state) => {
    return {
        rental: state.rental.data
    }
};


export default connect(mapStateToProps)(RentalDetail);




