import React from "react";
// import ReactStars from 'react-rating-stars-component';

// const StarRating = ({ rating }) => {
//   return (
//     <ReactStars
//     count={5} // Total stars
//     value={rating}
//     size={30} // Star size
//     activeColor="#FFD700" // Color of filled stars
//     edit={false} // Make it read-only
//   />
//   );
// };

// export default StarRating;

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

