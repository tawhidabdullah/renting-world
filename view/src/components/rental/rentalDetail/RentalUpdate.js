import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchRentalsById,
  verifiyRentalOwner
} from "../../../actions/rentalAction";
import { getReviews } from "../../../actions/reviewAction";
import RentalMap from "./RentalMap";
import Booking from "../../booking/Booking";
import Review from "./Review";
import RentalAssets from "./RentalAssets";
import UserGuard from "../../auth/UserGuard";
import { toUpperCase } from "../../../helpers/index";
import { updateRental, resetRentalErrorr } from "../../../actions/rentalAction";
import EditableInput from "../../commonFeilds/editable/EditableInput";
import EditableTextArea from "../../commonFeilds/editable/EditableTextArea";
import EditableSelect from "../../commonFeilds/editable/EditableSelect";
import EditableImage from "../../commonFeilds/editable/EditableImage";
import "../../../styles/rental/_rentalDetailInfo.scss";

// import css
import "../../../styles/rental/_rentalDetail.scss";

class RentalUpdate extends Component {
  state = {
    reviews: [],
    isFetching: false,
    isAllowed: true
  };
  updateRental = rentalData => {
    const {
      rental: { _id },
      dispatch
    } = this.props;

    const formData = new FormData();
       
    if(Object.keys(rentalData)[0] === 'image'){
      formData.append("image",rentalData.image); 
     return dispatch(updateRental(formData, _id));
    }
    dispatch(updateRental(rentalData, _id));
   
  };

  resetRentalErrors = () => {
    this.props.dispatch(resetRentalErrorr());
  };

  componentWillMount() {
    const rentalId = this.props.match.params.id;
    this.props.dispatch(fetchRentalsById(rentalId)).then(rental => {
      this.getBookingReviews(rental._id);
    });
  }

  componentDidMount() {
    this.verifyRentalOwner();
  }

  getBookingReviews = rentalId => {
    getReviews(rentalId).then(reviews => {
      this.setState({ reviews });
    });
  };

  verifyRentalOwner = () => {
    const rentalId = this.props.match.params.id;
    this.setState({ isFetching: true });
    return verifiyRentalOwner(rentalId).then(
      () => {
        this.setState({ isFetching: false, isAllowed: true });
      },
      () => {
        this.setState({ isFetching: false, isAllowed: false });
      }
    );
  };
  render() {
    const { rental, errors } = this.props;
    const { image, _id, city, street, category, user, bedrooms } = rental;
    const { reviews } = this.state;
    if (_id) {
      return (
        <UserGuard
          isAllowed={this.state.isAllowed}
          isFetching={this.state.isFetching}
        >
          <div className="container">
            <section id="rentalDetails">
              <div className="upper-section">
                <div className="row">
                  <div className="col-md-6">
                    <EditableImage
                      entity={this.props.rental}
                      entityField={"image"}
                      errors={errors}
                      updateEntity={this.updateRental}
                      resetErrors={this.resetRentalErrors}
                    />
                  </div>
                  <div className="col-md-6">
                    <RentalMap location={`${city}, ${street}`} />
                  </div>
                </div>
              </div>
              <div className="details-section">
                <div className="row">
                  <div className="col-md-8">
                    <div className="rental">
                      <label style={{ marginRight: "5px", fontWeight: "bold" }}>
                        Shared
                      </label>
                      <EditableSelect
                        options={["true", "false"]}
                        updateEntity={this.updateRental}
                        className={`rental-type ${category}`}
                        entity={this.props.rental}
                        entityField={"shared"}
                        containerStyle={{ display: "inline-block" }}
                        errors={errors}
                        resetErrors={this.resetRentalErrors}
                      />

                      <EditableSelect
                        options={["aparment", "house", "banglo", "condo"]}
                        updateEntity={this.updateRental}
                        className={`rental-type ${category}`}
                        entity={this.props.rental}
                        entityField={"category"}
                        errors={errors}
                        resetErrors={this.resetRentalErrors}
                      />

                      <div className="rental-owner">
                        <img src={user.avatar} alt="owner" />
                        <span>{user && user.name}</span>
                      </div>

                      <EditableInput
                        updateEntity={this.updateRental}
                        className={"rental-title"}
                        entity={this.props.rental}
                        entityField={"title"}
                        errors={errors}
                        resetErrors={this.resetRentalErrors}
                      />

                      <EditableInput
                        updateEntity={this.updateRental}
                        className={"rental-city"}
                        entity={this.props.rental}
                        entityField={"city"}
                        errors={errors}
                        resetErrors={this.resetRentalErrors}
                        formatPipe={[toUpperCase]}
                      />

                      <EditableInput
                        updateEntity={this.updateRental}
                        className={"rental-street"}
                        entity={this.props.rental}
                        entityField={"street"}
                        errors={errors}
                        resetErrors={this.resetRentalErrors}
                      />

                      <div className="rental-room-info">
                        <span>
                          <i className="fa fa-building" />
                          <EditableInput
                            updateEntity={this.updateRental}
                            className={"rental-bedrooms"}
                            entity={this.props.rental}
                            entityField={"bedrooms"}
                            containerStyle={{ display: "inline-block" }}
                            errors={errors}
                            resetErrors={this.resetRentalErrors}
                          />
                          bedrooms
                        </span>

                        <span>
                          <i className="fa fa-user" />
                          {bedrooms + 4} guests
                        </span>
                        <span>
                          <i className="fa fa-bed" /> {bedrooms + 2} beds
                        </span>
                      </div>
                      <EditableTextArea
                        rows={6}
                        cols={50}
                        updateEntity={this.updateRental}
                        className={"rental-description"}
                        entity={this.props.rental}
                        entityField={"description"}
                        containerStyle={{ display: "inline-block" }}
                        errors={errors}
                        resetErrors={this.resetRentalErrors}
                      />
                      <hr />
                      <RentalAssets />
                    </div>
                  </div>
                  <div className="col-md-4">
                    {" "}
                    <Booking rental={rental} />
                  </div>
                </div>
              </div>
              {reviews && reviews.length > 0 && (
                <div className="row">
                  <div className="col-md-8">
                    <section style={{ marginBottom: "40px" }}>
                      <h2>Reviews</h2>
                      {reviews.map((review, index) => {
                        return <Review review={review} key={index} />;
                      })}
                    </section>
                  </div>
                </div>
              )}
            </section>
          </div>
        </UserGuard>
      );
    } else return <h1>loading...</h1>;
  }
}
const mapStateToProps = state => {
  return {
    rental: state.rental.data,
    errors: state.rental.errors
  };
};

export default connect(mapStateToProps)(RentalUpdate);
