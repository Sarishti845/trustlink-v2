import { API_BASE_URL } from '../config';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// function ProviderProfilePage() {
//   const { id } = useParams(); // Gets the 'id' from the URL (e.g., /providers/:id)
//   const [provider, setProvider] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProvider = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/providers/${id}`);
//         setProvider(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching provider details:', error);
//         setLoading(false);
//       }
//     };

//     fetchProvider();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!provider) {
//     return <div>Provider not found.</div>;
//   }

//   return (
//     <div style={{ padding: '50px' }}>
//       {/* We will build the full UI from your screenshots here next */}
//       <h1>Profile Page for: {provider.user.name}</h1>
//       <p>Service: {provider.serviceCategory}</p>
//     </div>
//   );
// }

// export default ProviderProfilePage;
import ReviewSection from '../components/ReviewSection';

import { FaCheckCircle, FaCommentDots, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProviderProfilePage.css';

// import { FaCheckCircle } from 'react-icons/fa'; // Import checkmark icon

function ProviderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('About');
  const [ratingSummary, setRatingSummary] = useState({ avgRating: 0, totalReviews: 0 });


  // useEffect(() => {
  //   const fetchProvider = async () => {
  //     try {
  //       const { data } = await axios.get(`${API_BASE_URL}/api/providers/${id}`);
  //       setProvider(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching provider details:', error);
  //       setLoading(false);
  //     }
  //   };
  //   fetchProvider();
  // }, [id]);
  useEffect(() => {
  const fetchProvider = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/providers/${id}`);
      setProvider(data);
    } catch (error) {
      console.error('Error fetching provider details:', error);
    }
  };

  const fetchRatingSummary = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/reviews/${id}/summary`);
      setRatingSummary(data);
    } catch (error) {
      console.error("Error fetching rating summary:", error);
    }
  };

  fetchProvider();
  fetchRatingSummary();
  setLoading(false);
}, [id]);


  const handleBookNow = () => {
    navigate(`/book/${provider._id}`);
  };

  const refreshRatingSummary = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/reviews/${id}/summary`);
    setRatingSummary(data);
  } catch (error) {
    console.error("Error refreshing rating summary:", error);
  }
};


  if (loading) return <div>Loading...</div>;
  if (!provider) return <div>Provider not found.</div>;

  return (
    <div className="profile-page">
      {/* --- Profile Header --- */}
      <header className="profile-header">
        <img src={provider.image} alt={provider.user.name} className="profile-avatar" />
        <div className="profile-header-info">
          <h1>
            {provider.user.name}
            {provider.user.isVerified && <span className="verified-badge-profile">✔️ Verified</span>}
          </h1>
          {/* <p>⭐ 4.9 (127 reviews) • {provider.location} • {provider.experience} years exp.</p> */}
          <p>
  ⭐ {ratingSummary.avgRating || 0} ({ratingSummary.totalReviews || 0} reviews)
  • {provider.location} • {provider.experience} years exp.
</p>

        </div>
      </header>

      {/* --- Profile Body --- */}
      <div className="profile-body">
        {/* --- Main Content with Tabs --- */}
        <div className="profile-main-content">
          <div className="profile-tabs">
            <button className={`tab-btn ${activeTab === 'About' ? 'active' : ''}`} onClick={() => setActiveTab('About')}>About</button>
            <button className={`tab-btn ${activeTab === 'Services' ? 'active' : ''}`} onClick={() => setActiveTab('Services')}>Services</button>
            <button className={`tab-btn ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => setActiveTab('Reviews')}>Reviews</button>
            <button className={`tab-btn ${activeTab === 'Portfolio' ? 'active' : ''}`} onClick={() => setActiveTab('Portfolio')}>Portfolio</button>
          </div>
          <div className="tab-content">
            {activeTab === 'About' && (
              <div>
                <h3>About Me</h3>
                <p>{provider.bio}</p>
                <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '30px 0' }} />
                <div className="about-details-grid">
                  <div>
                    <h3>Verification & Credentials</h3>
                    <ul className="credentials-list">
                      {provider.credentials?.governmentIdVerified && <li><FaCheckCircle className="credential-icon" /> Government ID Verified</li>}
                      {provider.credentials?.backgroundCheckCompleted && <li><FaCheckCircle className="credential-icon" /> Background Check Completed</li>}
                      {provider.credentials?.licensedProfessional && <li><FaCheckCircle className="credential-icon" /> Licensed Professional</li>}
                      {provider.credentials?.liabilityInsurance && <li><FaCheckCircle className="credential-icon" /> Liability Insurance</li>}
                    </ul>
                  </div>
                  <div>
                    <h3>Service Details</h3>
                    <ul className="service-details-list">
                      <li><span>Hourly Rate:</span> <span>${provider.hourlyRate.toFixed(2)}</span></li>
                      <li><span>Experience:</span> <span>{provider.experience} years</span></li>
                   <li><span>Availability:</span> <span className="available-now">{provider.availability}</span></li>
                      <li><span>Service Area:</span> <span>{provider.serviceArea}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'Services' && (
              <div>
                <h3>Services Offered</h3>
                <div className="services-offered-grid">
                  {provider.servicesOffered?.map(service => (
                    <div key={service.name} className="service-offered-card">
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                      <div className="price">${service.price.toFixed(2)}/hr</div>
                      {service.tier && <span className={`tier-badge ${service.tier === 'Most Popular' ? 'tier-popular' : 'tier-premium'}`}>{service.tier}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* {activeTab === 'Reviews' && <div><h3>Reviews</h3><p>No reviews yet.</p></div>} */}
       {activeTab === 'Reviews' && (
  <ReviewSection
    providerId={provider._id}
    userId={provider.user._id}
    onReviewAdded={refreshRatingSummary}
  />
)}


            {activeTab === 'Portfolio' && <div><h3>Portfolio</h3><p>Portfolio coming soon.</p></div>}
          </div>
        </div>

        {/* --- Booking Card --- */}
      <aside className="profile-booking-card">
  <div className="booking-price">
    ${provider.hourlyRate.toFixed(2)}
    <span>per hour</span>
  </div>
  <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
  <button className="send-message-btn">
    <FaCommentDots /> Send Message
  </button>

  <div className="contact-icons">
    <div className="contact-icon-wrapper"><FaPhoneAlt /></div>
    <div className="contact-icon-wrapper"><FaEnvelope /></div>
    <div className="contact-icon-wrapper"><FaCalendarAlt /></div>
  </div>

  <div className="booking-additional-info">
    <div className="info-item">
      <span>Response Time</span>
      <span>Within 1 hour</span>
    </div>
    <div className="info-item">
      <span>Availability</span>
      <span className="available-now">Available Now</span>
    </div>
  </div>
</aside>
      </div>
    </div>
  );
}

export default ProviderProfilePage;