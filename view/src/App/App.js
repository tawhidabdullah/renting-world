import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthorizationToken from "../utilities/setAuthorizationToken";
import { StripeProvider } from "react-stripe-elements";
import { ToastContainer } from "react-toastify";

// IMPORT REDUX STORE
import store from "../store";
import { setCurrentUser } from "../actions/authAction";

// AUTH COMPONENTS
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

// import private route
import PrivateRoute from "../components/commonFeilds/privateRoute";

// import Navbar from "./components/Navbar";
import Toolbar from "../components/Toolbar/Toolbar";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import BackDrop from "../components/BackDrop/BackDrop";

// IMPORT PAGES
// import Home from "./pages/Home";
import Rental from "../pages/rental/Rental";
// import RentalSeachListing from "../pages/rental/RentalSeachListing";
// import Error from "./pages/Error";

import RentalDetail from "../components/rental/rentalDetail/RentalDetail";
import RentalSeachListing from "../components/rental/rental-Listing/RentalSeachListing";
import RentalCreate from "../components/rental/rental-create/RentalCreate";

// import Rental Manage and booking manage 
import RentalManage from "../components/rental/rental-manage/RentalManage";
import BookingManage from "../components/booking/booking-manage/BookingManage";



// CHECK FOR TOKEN
if (localStorage.jwttoken) {
  // set auth token to header Authorization
  setAuthorizationToken(localStorage.jwttoken);
  // decode token and get user info and expression
  const decoded = jwt_decode(localStorage.jwttoken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded)); // fired the action and set the user into state

  /////////// MAKE LOGOUT THE USER BASED on expired  tIme
}

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen
      };
    });
  };

  backdropClickHandler = () => {
    this.setState({
      sideDrawerOpen: false
    });
  };

  render() {
    let sideDrawerAndBackDrop = "";

    if (this.state.sideDrawerOpen) {
      sideDrawerAndBackDrop = (
        <>
          <SideDrawer show={this.state.sideDrawerOpen} />
          <BackDrop click={this.backdropClickHandler} />
        </>
      );
    }

    return (
      <StripeProvider apiKey='pk_test_LWCI4vSjDVkoxeXT8RmMyC2h'>
          <Provider store={store}>
            <div style={{ height: "100%" }}>
            <ToastContainer/>
              {/* <Navbar /> */}
              <Toolbar drawerClickHandler={this.drawerToggleHandler} />
              {sideDrawerAndBackDrop}
              <main>
                <Switch>
                  {/* <Route exact path="/" component={Home} /> */}
                  <Route exact path="/" render={() => <Redirect to='/rentals' />} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/rentals" component={Rental} />
                  <Route exact path="/rentals/:city/homes" component={RentalSeachListing} />
                  <PrivateRoute exact path="/rentals/manage" component={RentalManage} />
                  <PrivateRoute exact path="/rentals/new" component={RentalCreate} />
                  <Route exact path="/rentals/:id" component={RentalDetail} />
                
                  {/* <Route component={Error} /> */}
                </Switch>
                <Switch>
                
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/bookings/manage" component={BookingManage} />
                </Switch>
              </main>
            </div>
          </Provider>
      </StripeProvider>
    );
  }
}

export default App;
