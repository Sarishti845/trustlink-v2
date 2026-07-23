



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReviewSection.css";
import { API_BASE_URL } from '../config';

function ReviewSection({ providerId, userId, onReviewAdded }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch all reviews for a provider
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/reviews/${providerId}`);
      setReviews(res.data.reviews || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (providerId) fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);

  // Submit a new review
  const handleSubmit = async () => {
    if (!rating) {
      alert("Please select a rating before submitting!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/api/reviews`, {
        userId,
        providerId,
        rating,
        comment,
      });

      setRating(0);
      setComment("");
      fetchReviews();

      // ✅ Call parent refresh for average rating update
      if (onReviewAdded) onReviewAdded();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="review-section">
      <h3>Customer Reviews</h3>

      <div className="add-review">
        <label>Rate your experience</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="0">Select Rating</option>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button onClick={handleSubmit}>Submit Review</button>
      </div>

      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <div key={i} className="review-card">
              <strong>{r.user?.name || "Anonymous"}</strong>{" "}
              <span className="stars">⭐ {r.rating}</span>
              <p>{r.comment}</p>
              <small>{new Date(r.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to write one!</p>
        )}
      </div>
    </div>
  );
}

export default ReviewSection;






// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ReviewSection.css";

// function ReviewSection({ providerId, onReviewAdded }) {
//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   // Fetch all reviews for a provider
//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/reviews/${providerId}`);
//       setReviews(res.data.reviews || []);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   useEffect(() => {
//     if (providerId) fetchReviews();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [providerId]);

//   // Submit a new review
//   const handleSubmit = async () => {
//     if (!rating) {
//       alert("Please select a rating before submitting!");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token"); // ✅ get JWT saved on login

//       if (!token) {
//         alert("Please log in to submit a review!");
//         return;
//       }

//       await axios.post(
//         `${API_BASE_URL}/api/reviews`,
//         {
//           providerId, // ✅ backend uses this + token to find user
//           rating,
//           comment,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ attach token here
//           },
//         }
//       );

//       alert("✅ Review submitted successfully!");
//       setRating(0);
//       setComment("");
//       fetchReviews();

//       // ✅ refresh parent rating summary
//       if (onReviewAdded) onReviewAdded();
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("❌ Failed to submit review. Please try again.");
//     }
//   };

//   return (
//     <div className="review-section">
//       <h3>Customer Reviews</h3>

//       <div className="add-review">
//         <label>Rate your experience</label>
//         <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
//           <option value="0">Select Rating</option>
//           {[1, 2, 3, 4, 5].map((r) => (
//             <option key={r} value={r}>
//               {r} ★
//             </option>
//           ))}
//         </select>

//         <textarea
//           placeholder="Write your feedback..."
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />

//         <button onClick={handleSubmit}>Submit Review</button>
//       </div>

//       <div className="reviews-list">
//         {reviews.length > 0 ? (
//           reviews.map((r, i) => (
//             <div key={i} className="review-card">
//               <strong>{r.user?.name || "Anonymous User"}</strong>{" "}
//               <span className="stars">⭐ {r.rating}</span>
//               <p>{r.comment}</p>
//               <small>{new Date(r.createdAt).toLocaleDateString()}</small>
//             </div>
//           ))
//         ) : (
//           <p>No reviews yet. Be the first to write one!</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ReviewSection;
