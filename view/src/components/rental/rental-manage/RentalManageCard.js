import React from 'react';
import { Link } from "react-router-dom";
import { toUpperCase, pritifyDate } from '../../../helpers';
import RentalManageModal from "./RentalManageModal";

class RentalManageCard extends React.Component {
    state = {
        wantDelete: false
    };

    showDeleteMenu = () => {
        this.setState({
            wantDelete: true
        })
    }

    closeDeleteMenu = () => {
        this.setState({
            wantDelete: false
        })
    }

    render() {
        const { rental, rentalIndex, deleteRental } = this.props;
        return (
            <div className='col-md-4'>
                <div className='card text-center'>
                    <div className='card-block'>
                        <h4 className='card-title'>{rental.title} - {toUpperCase(rental.city)}</h4>
                        <Link to={`/rentals/${rental._id}`}
                            className='btn btn-secondary mr-3'
                        >
                            Go to Rental
                        </Link>
                        {rental.bookings && rental.bookings.length > 0 ? (
                            <RentalManageModal bookings={rental.bookings} />
                        ) : ""

                        }
                    </div>
                    <div className='card-footer text-muted'>
                        Created at {pritifyDate(rental.createdAt)}
                        {!this.state.wantDelete &&
                            <>
                                <button
                                    onClick={this.showDeleteMenu}
                                    className='btn btn-danger' style={{
                                        marginLeft: "10px"
                                    }}>Delete
                            </button>

                                <Link
                                    to={{ pathname: `/rentals/${rental._id}/edit`, state: { isUpdate: true } }}
                                    className='btn btn-warning' style={{
                                        marginLeft: "10px"
                                    }}>edit</Link>
                            </>
                        }


                        {this.state.wantDelete && (
                            <div style={{ marginTop: "10px" }}>
                                Do you confirm ?
                                <button
                                    onClick={() => { deleteRental(rental._id, rentalIndex) }}
                                    style={{
                                        marginLeft: "10px"
                                    }}
                                    className='btn btn-danger' >
                                    Yes
                                     </button>
                                <button
                                    style={{
                                        marginLeft: "10px"
                                    }}
                                    onClick={this.closeDeleteMenu}
                                    className='btn btn-success'> no</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default RentalManageCard; 
