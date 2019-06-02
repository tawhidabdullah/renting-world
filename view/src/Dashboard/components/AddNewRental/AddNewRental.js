import React, { Component } from 'react';


export default class AddNewRental extends Component {
    render() {
        return (
            <>
                <div class="create-rental-heading">
                    <p class="page-subtitle">Rental posts</p>
                    <h2 class="page-title">Add New Rental</h2>
                </div>
                <div class="detail">
                    <div class="detail__description">
                        <form action="#" id="js-form">
                            <div class="name">
                                <input type="fullwidth" name="name" placeholder="Title" />
                                <input type="halfwidth" name="city" placeholder="City" />
                                <input type="halfwidth" name="street" placeholder="street" />
                                <input type="number" name="dailRrate" placeholder="Daily rate" />
                                <input type="number" name="bedrooms" placeholder="Bedrooms" style={{ marginTop: "1em" }} />
                            </div>
                            <div class="message">
                                <textarea cols="40" rows="8" name="textarea" id="textarea"
                                    placeholder="Write your description here..."></textarea>
                            </div>
                            <button  type='button' className='btn-profile-update' style={{
                                marginRight: "25px"
                            }}>
                                Save to Draft
                            </button>
                            <button  type='button' className='btn-profile-update'>
                               
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
                                        <input type="text" name="addCategory" placeholder="add category" />
                                        <span className='addcategory__icon'>
                                            <i className='fa fa-plus'></i>
                                        </span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
