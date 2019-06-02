import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import "../../styles/rental/_rentalSearchInput.scss";

class RentalSeachInput extends Component {
    constructor() {
        super();
        this.searchInput = React.createRef();
    }

    handleSearch = () => {
        const { history } = this.props;
        const city = this.searchInput.current.value;

        city ? history.push(`/rentals/${city}/homes`) : history.push('/rentals');
    }

    handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            this.handleSearch(); 
        }
    }
    render() {
        return (
            <div class="rental__search">
                <div class="form__field">
                    <input
                        onKeyPress={this.handleKeyPress}
                        ref={this.searchInput}
                        type="search"
                        name="search"
                        placeholder="Search Rental by cities.."
                        class="form__input" />
                    <input
                        onClick={this.handleSearch}
                        type="submit"
                        value="Search"
                        class="button" />
                </div>
            </div>
        )
    }
}

export default withRouter(RentalSeachInput); 