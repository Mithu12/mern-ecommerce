import React from 'react';

const Rating = ({rating, reviewCount, color}) => {
    let stars = [1, 2, 3, 4, 5]
    return (
        <div className="rating">
            {stars.map((star, index) => {
                    return (
                        <span key={index}>
                            <i style={{color}} className={
                                (rating - star) >= 0 ? 'fas fa-star' :
                                    (rating - (star - .5)) >= 0 ? 'fas fa-star-half-alt' : 'far fa-star'
                            }/>
                        </span>
                    )
                }
            )}
            <span> {reviewCount} reviews</span>
        </div>
    )
};

Rating.defaultProps = {
    color: '#f8e825'
}

export default Rating;