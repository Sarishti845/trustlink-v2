import { API_BASE_URL } from '../config';










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './BrowseServicesPage.css';
// import '../components/FeaturedProfessionals.css';
// import { popularServices } from '../mockData';
// import { FaSearch, FaMapMarkerAlt, FaFilter } from 'react-icons/fa';

// function BrowseServicesPage() {
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [location, setLocation] = useState('');
//   const [sortBy, setSortBy] = useState('Highest Rated');
//   const [priceFilter, setPriceFilter] = useState('All Prices');

//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/providers`);
//         setProviders(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Could not fetch providers:', error);
//         setLoading(false);
//       }
//     };
//     fetchProviders();
//   }, []);

//   return (
//     <div className="browse-page">
//       {/* --- HEADER / HERO --- */}
//    <header className="browse-hero">
//   <h1>Browse All Services</h1>
//   <p>Find the perfect professional for your needs</p>

//   <div className="search-card">
//     <div className="input-group">
//       <label>What service do you need?</label>
//       <div className="input-with-icon">
//         <FaSearch className="input-icon" />
//         <input
//           type="text"
//           placeholder="Plumber, Electrician, Tutor..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//     </div>

//     <div className="input-group">
//       <label>Location</label>
//       <div className="input-with-icon">
//         <FaMapMarkerAlt className="input-icon" />
//         <input
//           type="text"
//           placeholder="Enter your zip code or city"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//       </div>
//     </div>

//     <button className="find-btn-orange">Find Services</button>
//   </div>
// </header>


//       {/* --- SERVICE CATEGORIES --- */}
//       <section className="service-categories-section">
//         <div className="categories-header">
//           <h2>Service Categories</h2>
//         </div>
//         <div className="services-grid">
//           {popularServices.map((service, index) => (
//             <div key={index} className="service-card">
//               <div className="service-icon">{service.icon}</div>
//               <h3 className="service-name">{service.name}</h3>
//               <p className="service-providers">{service.providers} providers</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- FILTER BAR --- */}
//       <section className="filter-bar">
//         <input
//           className="filter-search"
//           type="text"
//           placeholder="Search providers..."
//         />
//         <div className="filter-dropdowns">
//           <select
//             value={sortBy}
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option>Highest Rated</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//             <option>Most Experienced</option>
//           </select>

//           <select
//             value={priceFilter}
//             onChange={(e) => setPriceFilter(e.target.value)}
//           >
//             <option>All Prices</option>
//             <option>$0 - $50</option>
//             <option>$50 - $100</option>
//             <option>$100+</option>
//           </select>

//           <button className="more-filters-btn">
//             <FaFilter /> More Filters
//           </button>
//         </div>
//       </section>

//       {/* --- AVAILABLE PROFESSIONALS --- */}
//       <section className="available-professionals">
//         <h2>Available Professionals ({providers.length})</h2>
//         {loading ? (
//           <div>Loading providers...</div>
//         ) : (
//           <div className="professionals-list">
//             {providers.map((prof) => (
//               <div key={prof._id} className="professional-card">
//                 <div className="card-image-container">
//                   <img
//                     src={prof.image}
//                     alt={prof.user.name}
//                     className="card-image"
//                   />
//                   {prof.user.isVerified && (
//                     <span className="verified-badge">✔️ Verified</span>
//                   )}
//                 </div>
//                 <div className="card-content">
//                   <div className="card-header">
//                     <span className="service-name">{prof.serviceCategory}</span>
//                     <span className="rating">⭐ 4.9 (mock)</span>
//                   </div>
//                   <h2 className="professional-name">{prof.user.name}</h2>
//                   <p className="details">
//                     {prof.location} • {prof.experience} years exp.
//                   </p>
//                   <div className="card-footer">
//                     <span className="price">
//                       ${prof.hourlyRate.toFixed(2)}/hour
//                     </span>
//                     <Link
//                       to={`/providers/${prof._id}`}
//                       className="view-profile-btn"
//                     >
//                       View Profile
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default BrowseServicesPage;









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./BrowseServicesPage.css";
// import "../components/FeaturedProfessionals.css";
// import { popularServices } from "../mockData";
// import { FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

// function BrowseServicesPage() {
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [location, setLocation] = useState("");
//   const [sortBy, setSortBy] = useState("Highest Rated");
//   const [priceFilter, setPriceFilter] = useState("All Prices");

//   useEffect(() => {
//     const fetchProviders = async () => {
//       try {
//         // 1️⃣ Fetch all providers
//         const { data } = await axios.get(`${API_BASE_URL}/api/providers`);

//         // 2️⃣ For each provider, fetch its rating summary
//         const withRatings = await Promise.all(
//           data.map(async (provider) => {
//             try {
//               const summaryRes = await axios.get(
//                 `${API_BASE_URL}/api/reviews/${provider._id}/summary`
//               );
//               return { ...provider, ratingSummary: summaryRes.data };
//             } catch (err) {
//               // Fallback for providers without reviews
//               return {
//                 ...provider,
//                 ratingSummary: { avgRating: 0, totalReviews: 0 },
//               };
//             }
//           })
//         );

//         setProviders(withRatings);
//       } catch (error) {
//         console.error("Could not fetch providers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProviders();
//   }, []);

//   return (
//     <div className="browse-page">
//       {/* --- HEADER / HERO --- */}
//       <header className="browse-hero">
//         <h1>Browse All Services</h1>
//         <p>Find the perfect professional for your needs</p>

//         <div className="search-card">
//           <div className="input-group">
//             <label>What service do you need?</label>
//             <div className="input-with-icon">
//               <FaSearch className="input-icon" />
//               <input
//                 type="text"
//                 placeholder="Plumber, Electrician, Tutor..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="input-group">
//             <label>Location</label>
//             <div className="input-with-icon">
//               <FaMapMarkerAlt className="input-icon" />
//               <input
//                 type="text"
//                 placeholder="Enter your zip code or city"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//             </div>
//           </div>

//           <button className="find-btn-orange">Find Services</button>
//         </div>
//       </header>

//       {/* --- SERVICE CATEGORIES --- */}
//       <section className="service-categories-section">
//         <div className="categories-header">
//           <h2>Service Categories</h2>
//         </div>
//         <div className="services-grid">
//           {popularServices.map((service, index) => (
//             <div key={index} className="service-card">
//               <div className="service-icon">{service.icon}</div>
//               <h3 className="service-name">{service.name}</h3>
//               <p className="service-providers">
//                 {service.providers} providers
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* --- FILTER BAR --- */}
//       <section className="filter-bar">
//         <input
//           className="filter-search"
//           type="text"
//           placeholder="Search providers..."
//         />
//         <div className="filter-dropdowns">
//           <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//             <option>Highest Rated</option>
//             <option>Price: Low to High</option>
//             <option>Price: High to Low</option>
//             <option>Most Experienced</option>
//           </select>

//           <select
//             value={priceFilter}
//             onChange={(e) => setPriceFilter(e.target.value)}
//           >
//             <option>All Prices</option>
//             <option>$0 - $50</option>
//             <option>$50 - $100</option>
//             <option>$100+</option>
//           </select>

//           <button className="more-filters-btn">
//             <FaFilter /> More Filters
//           </button>
//         </div>
//       </section>

//       {/* --- AVAILABLE PROFESSIONALS --- */}
//       <section className="available-professionals">
//         <h2>Available Professionals ({providers.length})</h2>
//         {loading ? (
//           <div>Loading providers...</div>
//         ) : (
//           <div className="professionals-list">
//             {providers.map((prof) => (
//               <div key={prof._id} className="professional-card">
//                 <div className="card-image-container">
//                   <img
//                     src={prof.image}
//                     alt={prof.user.name}
//                     className="card-image"
//                   />
//                   {prof.user.isVerified && (
//                     <span className="verified-badge">✔️ Verified</span>
//                   )}
//                 </div>

//                 <div className="card-content">
//             <div className="card-header">
//   <span className="service-name">{prof.serviceCategory}</span>
//   <span className="rating">
//     ⭐ {Number(prof.ratingSummary?.avgRating || 0).toFixed(1)} (
//     {prof.ratingSummary?.totalReviews || 0} reviews)
//   </span>
// </div>



//                   <h2 className="professional-name">{prof.user.name}</h2>
//                   <p className="details">
//                     {prof.location} • {prof.experience} years exp.
//                   </p>

//                   <div className="card-footer">
//                     <span className="price">
//                       ${prof.hourlyRate.toFixed(2)}/hour
//                     </span>
//                     <Link
//                       to={`/providers/${prof._id}`}
//                       className="view-profile-btn"
//                     >
//                       View Profile
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// export default BrowseServicesPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./BrowseServicesPage.css";
import "../components/FeaturedProfessionals.css";
import { popularServices } from "../mockData";
import { FaSearch, FaMapMarkerAlt, FaFilter } from "react-icons/fa";

function BrowseServicesPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(''); // State for errors

  // State for header search
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  // State for filter bar controls
  const [providerSearchTerm, setProviderSearchTerm] = useState(''); // FIX: Define state here
  const [sortBy, setSortBy] = useState("Highest Rated");
  const [priceFilter, setPriceFilter] = useState("All Prices");
  
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); // Initialize navigate  

  // --- THIS IS THE UPDATED useEffect ---
  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      setError(''); // Clear previous errors
      try {
        // Construct query parameters object based on current state
        const params = {};
        if (providerSearchTerm) params.search = providerSearchTerm; 
        if (sortBy && sortBy !== 'Highest Rated') params.sort = sortBy; 
        if (priceFilter && priceFilter !== 'All Prices') params.price = priceFilter; 
        // TODO: Add location param from header search if needed for backend filtering

        // Fetch providers using the backend endpoint WITH the query parameters
        // Axios automatically converts the 'params' object into a query string
        const { data } = await axios.get(`${API_BASE_URL}/api/providers`, { params });

        // (Your rating summary logic)
        const withRatings = await Promise.all(
          data.map(async (provider) => {
            try {
              // TODO: You need to create this /summary endpoint on the backend
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
        console.error("Could not fetch providers:", error);
        setError('Failed to load providers. Please try again.'); // Set error message
      } finally {
        setLoading(false);
      }
    };
    
    // Use a timeout (debounce) to prevent API calls on every keystroke/selection
    const debounceFetch = setTimeout(() => {
        fetchProviders();
    }, 500); // Wait 500ms after user stops interacting

    // Cleanup function to clear the timeout if dependencies change before timeout finishes
    return () => clearTimeout(debounceFetch);

  }, [providerSearchTerm, sortBy, priceFilter]); // *** IMPORTANT: Dependencies trigger re-fetch ***
  // --- END OF UPDATED useEffect ---

  // FIX: Define the handleFindServices function
  const handleFindServices = () => {
    // This function will set the filters for the list below
    setProviderSearchTerm(search);
    // We can also pass location, but backend needs to support it
    console.log('Searching for:', search, 'in', location);
  };

  return (
    <div className="browse-page">
      {/* --- HEADER / HERO --- */}
      <header className="browse-hero">
        <h1>Browse All Services</h1>
        <p>Find the perfect professional for your needs</p>

        <div className="search-card">
          <div className="input-group">
            <label>What service do you need?</label>
            <div className="input-with-icon">
              <FaSearch className="input-icon" />
              <input
                type="text"
                placeholder="Plumber, Electrician, Tutor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Location</label>
            <div className="input-with-icon">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                placeholder="Enter your zip code or city"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* FIX: Connect button to the function */}
          <button className="find-btn-orange" onClick={handleFindServices}>Find Services</button>
        </div>
      </header>

      {/* --- SERVICE CATEGORIES --- */}
      <section className="service-categories-section">
        <div className="categories-header">
          <h2>Service Categories</h2>
        </div>
        <div className="services-grid">
          {popularServices.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-providers">
                {service.providers} providers
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FILTER BAR --- */}
      <section className="filter-bar">
        {/* FIX: Connect input to state */}
        <input
          className="filter-search"
          type="text"
          placeholder="Search providers..."
          value={providerSearchTerm}
          onChange={(e) => setProviderSearchTerm(e.target.value)}
        />
        <div className="filter-dropdowns">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="Highest Rated">Highest Rated</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="mostExperienced">Most Experienced</option>
          </select>

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="All Prices">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100+">$100+</option>
          </select>

          <button className="more-filters-btn">
            <FaFilter /> More Filters
          </button>
        </div>
      </section>

      {/* --- AVAILABLE PROFESSIONALS --- */}
      <section className="available-professionals">
        <h2>Available Professionals ({providers.length})</h2>
        {loading ? (
          <div>Loading providers...</div>
        ) : (
          <div className="professionals-list">
            {/* FIX: Check for providers.length > 0 */}
            {providers.length > 0 ? (
              providers.map((prof) => (
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
                      <Link
                        to={`/providers/${prof._id}`}
                        className="view-profile-btn"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", width: '100%' }}>No providers found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default BrowseServicesPage;