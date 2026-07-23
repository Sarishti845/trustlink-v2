import { API_BASE_URL } from '../config';

// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FeaturedProfessionals.css';

// function FeaturedProfessionals() {
//   const [providers, setProviders] = useState([]);

//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/providers`);
//         setProviders(data);
//       } catch (error) {
//         console.error('Could not fetch providers:', error);
//       }
//     };
//     fetchProviders();
//   }, []);

//   return (
//     <div className="page-container">
//       <h1>Featured Verified Professionals</h1>
//       <p>Top-rated service providers in your area</p>
//       <div className="professionals-list">
//         {providers.map(prof => (
//           <div key={prof._id} className="professional-card">
//             <div className="card-image-container">
//               {/* We'll add a real image field to the database later */}
//              <img src={prof.image} alt={prof.user.name} className="card-image" />
//               {/* Check for verification on the populated user object */}
//               {prof.user.isVerified && <span className="verified-badge">✔️ Verified</span>}
//             </div>
//             <div className="card-content">
//               <div className="card-header">
//                 <span className="service-name">{prof.serviceCategory}</span>
//                 {/* We'll add real rating data later */}
//                 <span className="rating">⭐ 4.9 (127 reviews)</span>
//               </div>

//               {/* Get the name from the populated user object */}
//               <h2 className="professional-name">{prof.user.name}</h2>
//               <p className="details">{prof.location} • {prof.experience} years exp.</p>
//               <div className="card-footer">
//                 <span className="price">${prof.hourlyRate.toFixed(2)}/hour</span>
//                 <Link to={`/providers/${prof._id}`} className="view-profile-btn">View Profile</Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeaturedProfessionals;



// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FeaturedProfessionals.css';

// function FeaturedProfessionals() {
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         // 1️⃣ Fetch all providers
//         const { data } = await axios.get(`${API_BASE_URL}/api/providers`);

//         // 2️⃣ For each provider, get its review summary (avg + total)
//         const withRatings = await Promise.all(
//           data.map(async (provider) => {
//             try {
//               const summaryRes = await axios.get(
//                 `${API_BASE_URL}/api/reviews/${provider._id}/summary`
//               );
//               return { ...provider, ratingSummary: summaryRes.data };
//             } catch (err) {
//               // if provider has no reviews yet
//               return {
//                 ...provider,
//                 ratingSummary: { avgRating: 0, totalReviews: 0 },
//               };
//             }
//           })
//         );

//         setProviders(withRatings);
//       } catch (error) {
//         console.error('Could not fetch providers:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProviders();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="page-container">
//       <h1>Featured Verified Professionals</h1>
//       <p>Top-rated service providers in your area</p>

//       <div className="professionals-list">
//         {providers.map((prof) => (
//           <div key={prof._id} className="professional-card">
//             <div className="card-image-container">
//               {/* <img src={prof.image} alt={prof.user.name} className="card-image" /> */}
//               <img
//   src={prof.image}
//   alt={prof.user?.name || "Service Provider"}
//   className="card-image"
// />
//               {prof.user.isVerified && (
//                 <span className="verified-badge">✔️ Verified</span>
//               )}
//             </div>

//             <div className="card-content">
//               <div className="card-header">
//                 <span className="service-name">{prof.serviceCategory}</span>

//                 {/* ✅ Real-time rating fetched from backend */}
//                <span className="rating">
//   ⭐ {Number(prof.ratingSummary?.avgRating || 0).toFixed(1)} (
//   {prof.ratingSummary?.totalReviews || 0} reviews)
// </span>

//               </div>
// {/* 
//               <h2 className="professional-name">{prof.user.name}</h2> */}
//               <h2 className="professional-name">{prof.user?.name || "Guest Provider"}</h2>
//               <p className="details">
//                 {prof.location} • {prof.experience} years exp.
//               </p>

//               <div className="card-footer">
//                 <span className="price">${prof.hourlyRate.toFixed(2)}/hour</span>
//                 <Link to={`/providers/${prof._id}`} className="view-profile-btn">
//                   View Profile
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeaturedProfessionals;






import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeaturedProfessionals.css';

function FeaturedProfessionals() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/providers`);

        const withRatings = await Promise.all(
          data.map(async (provider) => {
            try {
              const summaryRes = await axios.get(
                `${API_BASE_URL}/api/reviews/${provider._id}/summary`
              );
              return { ...provider, ratingSummary: summaryRes.data };
            } catch {
              return {
                ...provider,
                ratingSummary: { avgRating: 0, totalReviews: 0 },
              };
            }
          })
        );

        setProviders(withRatings);
      } catch (error) {
        console.error('Could not fetch providers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  // ✅ prevent blank screen if nothing to show
  if (!providers || providers.length === 0)
    return <p style={{ textAlign: "center" }}>No providers found.</p>;

  return (
    <div className="page-container">
      <h1>Featured Verified Professionals</h1>
      <p>Top-rated service providers in your area</p>

      <div className="professionals-list">
        {providers.map((prof) => (
          <div key={prof._id} className="professional-card">
            <div className="card-image-container">
              <img
                src={prof.image || "https://via.placeholder.com/150"}
                alt={prof.user?.name || "Service Provider"}
                className="card-image"
              />
              {prof.user?.isVerified && (
                <span className="verified-badge">✔️ Verified</span>
              )}
            </div>

            <div className="card-content">
              <div className="card-header">
                <span className="service-name">{prof.serviceCategory}</span>
                <span className="rating">
                  ⭐ {Number(prof.ratingSummary?.avgRating || 0).toFixed(1)} (
                  {prof.ratingSummary?.totalReviews || 0} reviews)
                </span>
              </div>

              <h2 className="professional-name">
                {prof.user?.name || "Guest Provider"}
              </h2>
              <p className="details">
                {prof.location} • {prof.experience} years exp.
              </p>

              <div className="card-footer">
                <span className="price">
                  ${prof.hourlyRate?.toFixed(2) || "0.00"}/hour
                </span>
                <Link to={`/providers/${prof._id}`} className="view-profile-btn">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedProfessionals;
