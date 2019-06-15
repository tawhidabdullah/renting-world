import React, { Component } from "react";
import { connect } from "react-redux";

class UserProfile extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <>
        <div class="create-rental-heading">
          <p class="page-subtitle">overview</p>
          <h2 class="page-title">User Profile</h2>
        </div>
        <div class="userProfileContainer">
          <div class="userProfileContainer__info">
            <div className="userInfoWrapper">
              <div id="user-profile">
                <img id="user-profile-img" src={user.avatar} alt="user photo" />

                <div id="user-info">
                  <h1 id="user-name">{user.name}</h1>
                  {/* <span id="user-company">Lead Programmer</span> */}
                  <br />
                </div>
              </div>
              <div className="userDetail">
                {/* <h6 className="userDetail__title">Bio</h6>
                <p className="userDetail__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam adipisci fugiat libero repudiandae ut reprehenderit
                  eligendi illo dolorem,s.
                </p> */}
              </div>
            </div>
          </div>
          <div class="userProfileContainer__detail">
            <div className="userProfileContainer__detail-heading">
              <h2>Account Details</h2>
            </div>
            <div className="userProfileContainer__detail-form">
              <form action="#" id="js-form">
                <div class="name">
                  <input type="text" name="name" placeholder="name" />
                  <input type="email" name="email" placeholder="email" />
                  <input type="tel" name="mobile" placeholder="Mobile number" />
                  <input type="text" name="address" placeholder="Address" />
                </div>
                <div class="message">
                  <textarea
                    cols="40"
                    rows="8"
                    name="textarea"
                    id="textarea"
                    placeholder="Write Your bio here.."
                  />
                </div>
                <button type="button" className="btn-profile-update">
                  Update account
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProp = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProp)(UserProfile);
