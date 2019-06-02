import React, { Component } from "react";
import "../../../styles/sass/components/Dashboard/_bookingsContent.scss";
import "../../../styles/sass/components/_searchInput.scss";

class BookingsContent extends Component {
  state = {
    editProduct: false,
    title: "",
    desc: "",
    category: "",
    price: "",
    productImage: "",
    searchInput: ""
  };

  onMaterialButtonclick = () => {

  };

  componentWillMount() {

  }

  onProductEdit(id, product) {
    this.setState({
      title: product.title,
      desc: product.desc,
      category: product.category,
      price: product.price,
      productImage: product.productImage,
      editProduct: true
    });
  }

  onProductDelete = id => {
    this.props.deleteProductAction(id);
  };

  componentWillUpdate() {
    // this.props.getProductAction();
  }

  onSearchInputChange = e => {
    this.setState({
      searchInput: e.target.value.substr(0, 20)
    });
  };

  render() {
    return (
      <div>
        <div className="containerx">
          <div className="header-wrapper">
            <div className="title">Here is your All the bookings that your made !</div>
            <div className="note">
              Total: <span className="focus">250 </span>bookings{" "}
              <span className="focus">Since</span> on Saturday, June 5.
            </div>
            <div class="product-wrap searchwrap">
              <div class="search">
                <input
                  type="text"
                  class="searchTerm searchTerm__red"
                  placeholder="Search Bookings by name..."
                />
                <button type="submit" class="searchButton searchButton__red">
                  <i class="fa fa-search" />
                </button>
              </div>
            </div>
            <span
              className="material-button"
              onClick={this.onMaterialButtonclick}
            >
              <i className="fa fa-plus" />
            </span>
          </div>
          <div className="content-wrapper">
            <div className="table-wrapper">
              <div class="listing-card">
                <div class="card-wrapper">
                  <div class="right-column">
                    <div class="heart-rating">
                      <span class="__heart"></span>
                      <span class="__percentage">19,134$</span>
                    </div>
                    <button class="action-button">Cancel booking</button>
                  </div>
                  <div class="poster">
                    <img src="https://in.bmscdn.com/events/Large/ET00041450.jpg"></img>
                  </div>
                  <div class="movie-info">
                    <span class="title">Rental Title</span>
                    <span class="language">category</span>
                    <ul class="genre">
                      <li>Jun 12th 19 -  </li>
                      <li>Jun 14th 19</li>
                      <li>| 2 days</li>
                    </ul>
                    {/* <ul class="tags">
                      <li>3D</li>
                      <li>2D</li>
                    </ul> */}
                  </div>
                </div>

              </div>
              <div class="listing-card">
                <div class="card-wrapper">
                  <div class="right-column">
                    <div class="heart-rating">
                      <span class="__heart"></span>
                      <span class="__percentage">19,134$</span>
                    </div>
                    <button class="action-button">Cancel Booking</button>
                  </div>
                  <div class="poster">
                    <img src="https://in.bmscdn.com/events/Large/ET00041450.jpg"></img>
                  </div>
                  <div class="movie-info">
                    <span class="title">Rental Title</span>
                    <span class="language">category</span>
                    <ul class="genre">
                      <li>Jun 12th 19 -  </li>
                      <li>Jun 14th 19</li>
                      <li>| 2 days</li>
                    </ul>
                    {/* <ul class="tags">
                      <li>3D</li>
                      <li>2D</li>
                    </ul> */}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}



export default BookingsContent;
