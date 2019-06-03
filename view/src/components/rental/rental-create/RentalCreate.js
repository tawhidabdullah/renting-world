import React, { Component } from 'react';
import "../../../styles/rental/_rentalCreateFormStyle.scss";
import { createRental } from "../../../actions/rentalAction";
import { Redirect } from "react-router-dom";
import Upload from "../../FileUpload/test";


class RentalCreate extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            city: "",
            dailyRate: null,
            bedrooms: "",
            description: "",
            category: "",
            image: '',
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
    onFileChange = value => {
        console.log('imgValue',value); 
        this.setState({
         image: value
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
                                        type="number"
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
                                     <Upload 
                                     onChange={this.onFileChange}
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
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}
export default RentalCreate; 
