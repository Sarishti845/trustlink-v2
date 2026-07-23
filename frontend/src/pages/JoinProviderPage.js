import { API_BASE_URL } from '../config';
// import React, { useState } from "react";
// import axios from "axios";
// import "./JoinProviderPage.css";

// function JoinProviderPage() {
//   const [formData, setFormData] = useState({
//     serviceCategory: "",
//     experience: "",
//     hourlyRate: "",
//     location: "",
//     serviceArea: "",
//     bio: "",
//   });
//   const [idProof, setIdProof] = useState(null);
//   const [license, setLicense] = useState(null);
//   const [submitted, setSubmitted] = useState(false);


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//     data.append("idProof", idProof);
//     data.append("license", license);

//     try {
//       await axios.post(`${API_BASE_URL}/api/providers/verify`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//     //   alert("Application submitted successfully!");
//     setSubmitted(true);

//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="join-provider-form-page">
//       <h1>Become a Verified Service Provider</h1>
//       <form className="join-provider-form" onSubmit={handleSubmit}>
//         <label>Service Category</label>
//         {/* <input name="serviceCategory" onChange={handleChange} required /> */}
//         <select
//   name="serviceCategory"
//   value={formData.serviceCategory}
//   onChange={handleChange}
//   required
// >
//   <option value="">Select a category</option>
//   <option value="Plumbing">Plumbing</option>
//   <option value="Electrical">Electrical</option>
//   <option value="Cleaning">Cleaning</option>
//   <option value="Painting">Painting</option>
//   <option value="Carpentry">Carpentry</option>
//   <option value="Appliance Repair">Appliance Repair</option>
//   <option value="Gardening">Gardening</option>
// </select>


//         <label>Experience (years)</label>
//         <input name="experience" type="number" onChange={handleChange} required />

//         <label>Hourly Rate ($)</label>
//         <input name="hourlyRate" type="number" onChange={handleChange} required />

//         <label>Location</label>
//         <input name="location" onChange={handleChange} required />

//         <label>Service Area</label>
//         <input name="serviceArea" onChange={handleChange} required />

//         <label>Short Bio / Description</label>
//         <textarea name="bio" onChange={handleChange} required />

//         <label>Upload ID Proof</label>
// <input
//   type="file"
//   accept=".jpg,.png,.pdf"
//   onChange={(e) => setIdProof(e.target.files[0])}
//   required
// />
// <small className="file-note">Accepted formats: .jpg, .png, .pdf (max 2MB)</small>
// { idProof && <span className="upload-status">✅ File selected</span> }

// <label>Upload License / Certification</label>
// <input
//   type="file"
//   accept=".jpg,.png,.pdf"
//   onChange={(e) => setLicense(e.target.files[0])}
//   required
// />
// <small className="file-note">Accepted formats: .jpg, .png, .pdf (max 2MB)</small>
// { license && <span className="upload-status">✅ File selected</span> }



//         <button type="submit" className="submit-btn">Submit Application</button>
//       </form>
//       {submitted && (
//   <div className="success-banner">
//     ✅ Your application has been submitted! <br />
//     Our verification team will review your documents within <strong>24 hours</strong>.
//   </div>
// )}

//     </div>
//   );
// }

// export default JoinProviderPage;










import React, { useState, useContext } from "react"; // 1. Import useContext
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // 2. Import AuthContext
import { useNavigate } from "react-router-dom"; // 3. Import useNavigate
import "./JoinProviderPage.css";

function JoinProviderPage() {
  const { userInfo } = useContext(AuthContext); // 4. Get userInfo from context
  const navigate = useNavigate(); // 5. Initialize navigate

  const [formData, setFormData] = useState({
    serviceCategory: "",
    experience: "",
    hourlyRate: "",
    location: "",
    serviceArea: "",
    bio: "",
  });
  const [idProof, setIdProof] = useState(null);
  const [license, setLicense] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(''); // State for error messages


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) { // Check file size (2MB limit)
       alert(`File is too large. Maximum size is 2MB.`);
       e.target.value = null; // Reset the file input
       if(fileType === 'idProof') setIdProof(null);
       if(fileType === 'license') setLicense(null);
       return;
    }
    if (fileType === 'idProof') setIdProof(file);
    if (fileType === 'license') setLicense(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // 6. Check if user is logged in
    if (!userInfo) {
      alert("Please log in to submit an application.");
      navigate("/login");
      return;
    }
    
    // Check if files are selected
    if (!idProof || !license) {
        alert("Please upload both ID Proof and License/Certification.");
        return;
    }


    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("idProof", idProof); // Use correct key names for backend
    data.append("license", license); // Use correct key names for backend

    try {
      // 7. Prepare authentication headers
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`, // Add the token
        },
      };

      // 8. Use the correct API endpoint (we will build this next)
      await axios.post(`${API_BASE_URL}/api/providers/apply`, data, config);

      setSubmitted(true); // Show success banner
      // Optional: Clear form after successful submission
      // setFormData({ serviceCategory: "", experience: "", ... });
      // setIdProof(null);
      // setLicense(null);

    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong. Please try again.";
      console.error(err);
      setError(message); // Show specific error if available
      alert(message);
      setSubmitted(false); // Hide success banner on error
    }
  };

  return (
    <div className="join-provider-form-page">
      <h1>Become a Verified Service Provider</h1>
      <form className="join-provider-form" onSubmit={handleSubmit}>
        <label>Service Category</label>
        <select
          name="serviceCategory"
          value={formData.serviceCategory}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a category</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Painting">Painting</option>
          <option value="Carpentry">Carpentry</option>
          <option value="Appliance Repair">Appliance Repair</option>
          <option value="Gardening">Gardening</option>
        </select>

        <label>Experience (years)</label>
        <input name="experience" type="number" value={formData.experience} onChange={handleChange} required min="0" />

        <label>Hourly Rate ($)</label>
        <input name="hourlyRate" type="number" value={formData.hourlyRate} onChange={handleChange} required min="0" step="0.01" />

        <label>Location</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>Service Area</label>
        <input name="serviceArea" value={formData.serviceArea} onChange={handleChange} required />

        <label>Short Bio / Description</label>
        <textarea name="bio" value={formData.bio} onChange={handleChange} required maxLength="500" />

        <label>Upload ID Proof</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf" // Added jpeg
          onChange={(e) => handleFileChange(e, 'idProof')} // Updated onChange
          required
        />
        <small className="file-note">Accepted formats: .jpg, .png, .pdf (max 2MB)</small>
        { idProof && <span className="upload-status">✅ {idProof.name} selected</span> }

        <label>Upload License / Certification</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.pdf" // Added jpeg
          onChange={(e) => handleFileChange(e, 'license')} // Updated onChange
          required
        />
        <small className="file-note">Accepted formats: .jpg, .png, .pdf (max 2MB)</small>
        { license && <span className="upload-status">✅ {license.name} selected</span> }

        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px'}}>{error}</p>}

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
      {submitted && (
        <div className="success-banner">
          ✅ Your application has been submitted! <br />
          Our verification team will review your documents within <strong>24 hours</strong>.
        </div>
      )}

    </div>
  );
}

export default JoinProviderPage;