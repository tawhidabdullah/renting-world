import React, { Component } from "react";
import { createRental } from "../../../actions/rentalAction";
import { Redirect } from "react-router-dom";
import Upload from "../../../components/FileUpload/test";

class AddNewRental extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      city: "",
      dailyRate: null,
      bedrooms: "",
      description: "",
      category: "Add new Rental",
      image: "",
      shared: false,
      errors: [],
      redirect: false
    };

    this.rentalCategory = ["apartment", "house", "condo"];
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  onFileChange = value => {
    console.log("imgValue", value);
    this.setState({
      image: value
    });
  };

  onChange = e => {
    if (e.target.checked) {
      this.setState({
        shared: true
      });
    } else {
      this.setState({
        shared: false
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", this.state.title);
    formData.append("image", this.state.image);
    formData.append("city", this.state.city);
    formData.append("category", this.state.category);
    formData.append("description", this.state.description);
    formData.append("street", this.state.street);
    formData.append("shared", this.state.shared);
    formData.append("dailyRate", this.state.dailyRate);
    formData.append("bedrooms", this.state.bedrooms);

    createRental(formData).then(
      rental => {
        this.setState({
          redirect: true
        });
      },
      errors => {
        this.setState({
          errors
        });
      }
    );
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: "/rentals" }} />;
    }
    const {
      title,
      city,
      street,
      dailyRate,
      bedrooms,
      description,
      category
    } = this.state;
    let submitDisableValue = false;
    if (
      !title ||
      !city ||
      !street ||
      !dailyRate ||
      !bedrooms ||
      !description
    ) {
      submitDisableValue = true;
    }

    return (
      <>
        <div class="create-rental-heading">
          <p class="page-subtitle">Rental posts</p>
          <h2 class="page-title">Add New Rental</h2>
        </div>
        <div class="detail">
          <div class="detail__description">
            <form action="#" id="js-form" onSubmit={this.onSubmit}>
              <div class="name">
                <input
                  onChange={this.onInputChange}
                  value={this.state.title}
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <input
                  onChange={this.onInputChange}
                  value={this.state.city}
                  type="text"
                  name="city"
                  placeholder="City"
                />
                <input
                  onChange={this.onInputChange}
                  value={this.state.street}
                  type="text"
                  name="street"
                  placeholder="street"
                />
                <input
                  onChange={this.onInputChange}
                  value={this.state.dailRrate}
                  type="number"
                  name="dailyRate"
                  placeholder="Daily rate"
                />
                <input
                  onChange={this.onInputChange}
                  value={this.state.bedrooms}
                  type="number"
                  name="bedrooms"
                  placeholder="Bedrooms"
                  style={{ marginTop: "1em" }}
                />
              </div>
           
              <div class="message">
                <textarea
                  onChange={this.onInputChange}
                  value={this.state.description}
                  cols="40"
                  rows="8"
                  name="description"
                  id="textarea"
                  placeholder="Write your description here..."
                />
              </div>
              <Upload onChange={this.onFileChange} />
              <button
                type="button"
                className="btn-profile-update"
                style={{
                  marginRight: "25px"
                }}
              >
                Save to Draft
              </button>
              <button
                disabled={submitDisableValue}
                className="btn-profile-update"
                onClick={()=> console.log('get a life')}
              >
                Publish Rental
              </button>
            </form>
          </div>
          <div class="detail__user-reviews">
            <div class="containerOfCheckBox clearfix">
              <div class="half-col">
                <header>
                  <h6>Category</h6>
                </header>
                <form>
                  <ul>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span class="lbl padding-8">Aparment</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span class="lbl padding-8">House</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span class="lbl padding-8">Cottege</span>
                      </label>
                    </li>
                    <li>
                      <label>
                        <input type="checkbox" />
                        <span class="lbl padding-8">Hotel</span>
                      </label>
                    </li>
                  </ul>
                  <div class="addcategory">
                    <input
                      type="text"
                      name="addCategory"
                      placeholder="add category"
                    />
                    <span className="addcategory__icon">
                      <i className="fa fa-plus" />
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AddNewRental;
