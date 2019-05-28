import React from 'react'; 
import StarRatings from "react-star-ratings";
import { pritifyDate } from "../../../helpers/index";
const Review = ({review}) => {
    return (
        <div key={review._id} className="card review-card">
        <div className="card-body">
            <div className="row">
                <div className="col-md-2 user-image">
                    <img src={review.user.avatar}
                        className="img img-rounded img-fluid" />
                    <p className="text-secondary text-center">
                        {pritifyDate(review.createdAt)}
                    </p>
                </div>
                <div className="col-md-10">
                    <div>
                        <a><strong>{review.user.name}</strong></a>
                        <div className="review-section">
                            <StarRatings
                                rating={review.rating}
                                starRatedColor="orange"
                                starHoverColor="orange"
                                starDimension="25px"
                                starSpacing="2px"
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <p>{review.text}</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Review; 
