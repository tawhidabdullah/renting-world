import React from 'react';
import Modal from "react-responsive-modal";
import StarRatings from "react-star-ratings";
import { createReview } from "../../actions/reviewAction";


class ReviewModal extends React.Component {
    state = {
        open: false,
        text: "",
        rating: 3
    };

    closeModal = () => {
        this.setState({
            open: false
        })
    }

    closeModal = () => {
        this.setState({
            open: false
        })
    }
    openModal = () => {
        this.setState({
            open: true
        })
    }

    publishReview = () => {
        const { rating, text } = this.state;
        const bookingId = this.props.bookingId; 

        createReview({ rating, text }, bookingId.toString()).then((review)=>{
            this.closeModal();
            this.props.onReviewCreated(review); 
        })
    };

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    changeRating = (newRating, name) => {
        this.setState({
            rating: newRating
        })
    }


    render() {
        const { open, text, rating } = this.state;
        return (
            <>
                <button
                    onClick={this.openModal}
                    className='btn btn-outline-primary ml-3'>
                    Review
                </button>
                <Modal open={open} onClose={this.closeModal}
                    little
                    classNames={{ modal: 'booking-modal' }}>
                    <h4 className='modal-title title'>
                        Write a Review
                     </h4>
                    <div className='modal-body'>

                        <textarea
                            style={{ marginBottom: "10px" }}
                            onChange={this.handleTextChange}
                            value={text}
                            className="form-control"
                            placeholder={`Write your experience here with this rental`}
                            rows={3}
                            cols={50}
                        >
                        </textarea>
                        <StarRatings
                            rating={rating}
                            starRatedColor="orange"
                            starHoverColor='orange'
                            starDimension='35px'
                            starSpacing='2px'
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        />

                    </div>
                    <div className='modal-footer'>
                        <button
                            disabled={!text && !rating}
                            onClick={this.publishReview}
                            type='button'
                            className='btn btn-primary'>Confirm</button>
                        <button
                            type='button'
                            onClick={this.closeModal}
                            className='btn btn-danger'>
                            Cancel
                    </button>
                    </div>
                </Modal>
            </>

        )
    }
}

export default ReviewModal; 
