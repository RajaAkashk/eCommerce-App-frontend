import React from "react";

const StarRating = ({ rating }) => {
  return (
    <div aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, ind) => (
        <span key={ind}>
          <i
            className={
              rating >= ind + 1
                ? 'fas fa-star'
                : rating >= ind + 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
            style={{ color: 'gold', marginRight: '2px',fontSize: '1.3rem' }}
            aria-hidden="true"
          ></i>
        </span>
      ))}
    </div>
  );
};

export default StarRating;

