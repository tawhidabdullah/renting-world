import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import logo from "../../images/book-icon.png";
import RentalSeachInput from "../rental/RentalSeachInput";

// import CSS
import "../../styles/header/_toolBar.scss";

class Toolbar extends Component {
  state = {
    dropdownToggle: false,
    fosttrapToggle: false
  };
  toggleDrodown = () => {
    const dt = this.state.dropdownToggle;
    this.setState({
      dropdownToggle: !dt
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(); // firing the action here
  };

  onnavFostrapclick = () => {
    const fosttrapToggle = this.state.fosttrapToggle;
    this.setState({
      fosttrapToggle: !fosttrapToggle
    });
  };
  render() {
    const { isAuthenticate, user } = this.props.auth;
    const logedInUserLinks = (
      <React.Fragment>
        <li>
          <Link to="/dashboard">
            {" "}
            <i className="fa fa-dashboard"> </i> Dashboard
          </Link>
        </li>

        <li>
          <a href="#">
            <div className="header__avatar" onClick={this.toggleDrodown}>
              <div className="user-account">
                <img
                  className="header__avatar-img"
                  src={user.avatar}
                  title="you must have a Gravatar connect to your email for displaying image"
                />
                <div
                  className={`dropdownx ${
                    this.state.dropdownToggle ? "dropdown--active" : "deactive"
                    }`}
                >
                  <div className="dropdown__list">
                    <a className="dropdown__list-item" >
                      <span className="dropdown__icon">
                        <i className="fa fa-user" />
                      </span>
                      <span className="dropdown__title">my profile</span>
                    </a>
                    <Link to='/rentals/new' className="dropdown__list-item" style={{textDecoration: "none"}}>
                      <span className="dropdown__icon">
                        <i className="fa fa-clipboard" />
                      </span>
                      <span className="dropdown__title">create rental</span>
                    </Link>
                    <Link to='/rentals/new' className="dropdown__list-item" style={{textDecoration: "none"}}>
                      <span className="dropdown__icon">
                        <i className="fa fa-clipboard" />
                      </span>
                      <span className="dropdown__title">manage rentals</span>
                    </Link>
                    <Link to='/rentals/new' className="dropdown__list-item" style={{textDecoration: "none"}}>
                      <span className="dropdown__icon">
                        <i className="fa fa-clipboard" />
                      </span>
                      <span className="dropdown__title">manage bookings</span>
                    </Link>
                    <a
                      className="dropdown__list-item"
                      onClick={this.onLogoutClick}
                    >
                      <span className="dropdown__icon">
                        <i className="fa fa-sign-out" />
                      </span>
                      <span className="dropdown__title">log out</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </li>
      </React.Fragment>
    );

    const newUserLinks = (
      <React.Fragment>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </React.Fragment>
    );

    return (
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar-toggle-button">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar__logo">
            <Link to="/">
              <img className="mainLogo" src={logo} alt="logo alt" />
            </Link>
          </div>
          <RentalSeachInput />
          <div className="spacer" />
          <div className="toolbar__navigation-items">
            <ul>
              <li>
                <a href="/">Books</a>
              </li>
              <li>
                <a href="/">Cars</a>
              </li>
              {isAuthenticate ? logedInUserLinks : newUserLinks}{" "}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Toolbar);
