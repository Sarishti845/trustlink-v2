// import React from 'react';
// import './JoinProvider.css';
// import { FaCheckCircle } from 'react-icons/fa';

// function JoinProvider() {
//   return (
//     <section className="join-section">
//       <div className="join-container">
//         <div className="join-content">
//           <h2>Join as a Service Provider</h2>
//           <p>
//             Grow your business with TrustLink. Connect with customers who value
//             quality work and transparent pricing.
//           </p>
//           <ul className="benefits-list">
//             <li><FaCheckCircle className="check-icon" /> Keep 90% of your earnings - lowest commission.</li>
//             <li><FaCheckCircle className="check-icon" /> Get verified customers who respect your time.</li>
//             <li><FaCheckCircle className="check-icon" /> Set your own prices and availability.</li>
//             <li><FaCheckCircle className="check-icon" /> Professional profile with verification badges.</li>
//           </ul>
//           <div className="join-buttons">
//             <button className="apply-btn">Apply to Join</button>
//             <button className="learn-more-btn">Learn More</button>
//           </div>
//         </div>
//         <div className="join-image-container">
//           <img src="https://images.pexels.com/photos/7217988/pexels-photo-7217988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Service provider helping a customer" />
//         </div>
//       </div>
//     </section>
//   );
// }

// export default JoinProvider;





import React from 'react';
import './JoinProvider.css';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ✅ Add this import

function JoinProvider() {
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <section className="join-section">
      <div className="join-container">
        <div className="join-content">
          <h2>Join as a Service Provider</h2>
          <p>
            Grow your business with TrustLink. Connect with customers who value
            quality work and transparent pricing.
          </p>

          <ul className="benefits-list">
            <li>
              <FaCheckCircle className="check-icon" /> Keep 90% of your earnings – lowest commission.
            </li>
            <li>
              <FaCheckCircle className="check-icon" /> Get verified customers who respect your time.
            </li>
            <li>
              <FaCheckCircle className="check-icon" /> Set your own prices and availability.
            </li>
            <li>
              <FaCheckCircle className="check-icon" /> Professional profile with verification badges.
            </li>
          </ul>

          <div className="join-buttons">
            {/* ✅ Add navigate() inside onClick */}
            <button
              className="apply-btn"
              onClick={() => navigate('/join-provider')}
            >
              Apply to Join
            </button>
            {/* <button className="learn-more-btn">Learn More</button> */}

            <button
  className="learn-more-btn"
  onClick={() => navigate("/provider-info")}
>
  Learn More
</button>

          </div>
        </div>

        <div className="join-image-container">
          <img
            src="https://images.pexels.com/photos/7217988/pexels-photo-7217988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Service provider helping a customer"
          />
        </div>
      </div>
    </section>
  );
}

export default JoinProvider;
