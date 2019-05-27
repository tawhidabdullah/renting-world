import React, { Component } from 'react';
import "../../../styles/rental/_rentalCreateFormStyle.scss";
import { createRental } from "../../../actions/rentalAction";
import { Redirect } from "react-router-dom";


class RentalCreate extends Component {
    constructor() {
        super();
        this.state = {

            title: "",
            city: "",
            dailyRate: "",
            bedrooms: "",
            description: "",
            category: "",
            shared: false,
            errors: [],
            redirect: false

        };

        this.rentalCategory = ['apartment', 'house', 'condo'];
    }


    onInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });


    };
    onChange = (e) => {
        if(e.target.checked){
            this.setState({
                shared: true
            })
        }else{
            this.setState({
                shared: false
            })
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const formData = {};
        formData.title = this.state.title;
        formData.city = this.state.city;
        formData.dailyRate = this.state.dailyRate;
        formData.bedrooms = this.state.bedrooms;
        formData.street = this.state.street;
        formData.description = this.state.description;
        formData.category = this.state.category;
        formData.shared = this.state.shared;
        createRental(formData).then((rental)=>{
            this.setState({
                redirect: true
            })
        },(errors)=>{
            this.setState({
                errors
            })
        }); 


    };




    render() {
        if(this.state.redirect){
          return  <Redirect to={{pathname : "/rentals"}} />
        }
        const { title, city, street, dailyRate,
            bedrooms, description, category } = this.state;
        let submitDisableValue = false;
        if (!title || !city || !street || !dailyRate
            || !bedrooms || !description || !category ) {
            submitDisableValue = true;
        }
        return (
            <section id='newRental'  >
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <form id="js-form" onSubmit={this.onSubmit}>
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
                                        placeholder="City" />
                                    <input
                                        onChange={this.onInputChange}
                                        value={this.state.street}
                                        type="text"
                                        name="street"
                                        placeholder="Street"
                                        id="inputWith100"
                                    />
                                    <input
                                        onChange={this.onInputChange}
                                        value={this.state.dailyRate}
                                        type="text"
                                        name="dailyRate"
                                        placeholder="daily Rate"
                                        id="inputWith100"
                                    />
                                    <input
                                        onChange={this.onInputChange}
                                        value={this.state.bedrooms}
                                        type="number"
                                        name="bedrooms"
                                        placeholder="Bedrooms"
                                        id="inputWith100"
                                    />
                                </div>
                                <div class="dropdown">
                                    <label for="select-choice">Category</label>
                                    <select
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.onInputChange}
                                        id="select-choice">
                                        <option value="Choice 1">Choice 1</option>
                                        <option value="Choice 2">Choice 2</option>
                                        <option value="Choice 3">Choice 3</option>
                                    </select>
                                </div>
                                <div class="message">
                                    <label for="textarea">Description</label>
                                    <textarea cols="40"
                                        onChange={this.onInputChange}
                                        value={this.state.description}
                                        rows="8"
                                        name="description"
                                        id="textarea"></textarea>
                                </div>
                                <div class="check">
                                    <label for="checkbox">Shared </label>
                                    <input
                                        value={this.state.shared}
                                        type="checkbox"
                                        name="shared"
                                        onChange={this.onChange}
                                        id="checkbox" />
                                </div>
                                <div class="submit">
                                    <input  type="submit" value="Create Rental" disabled={submitDisableValue} />
                                </div>
                            </form>
                        </div>
                        <div className='col-md-6'>
                            <button className='btn btn-primary'> Back to Rentals</button>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}
export default RentalCreate; 
