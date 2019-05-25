import React, { Component } from 'react'; 
import { connect } from "react-redux";
import { fetchRentalsById } from "../../actions/rentalAction";


class RentalDetail extends Component {
    componentWillMount(){
        const rentalId = this.props.match.params.id;
        this.props.dispatch(fetchRentalsById(rentalId)); 
    }



    render() {
        const rental = this.props.rental;
        return (
            <div style={{
                paddingTop: "300px"
            }}>
                my name is rental detail, what's your name ? 
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        rental: state.rental.data
    }
}; 


export default connect(mapStateToProps)(RentalDetail); 




