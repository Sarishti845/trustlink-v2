import { API_BASE_URL } from '../config';







// import React, { useState, useEffect, useContext } from "react";
// import {
//   Home,
//   Briefcase,
//   Wallet,
//   AlertCircle,
//   User,
//   Bell,
//   LogOut,
// } from "lucide-react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./ProviderDashboard.css";

// function ProviderDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [bookings, setBookings] = useState([]);
//   const [earnings, setEarnings] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [providerDisputes, setProviderDisputes] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);

//   const { userInfo } = useContext(AuthContext);
//   const navigate = useNavigate();

//   /** LOGOUT **/
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   /** FETCH PROVIDER DASHBOARD DATA **/
//   const [profileData, setProfileData] = useState({
//     serviceCategory: "",
//     hourlyRate: "",
//     bio: "",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!userInfo?.token) return;

//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

//         // Profile
//         const profileRes = await axios.get(
//           `${API_BASE_URL}/api/providers/me`,
//           config
//         );

//         setProfileData({
//           serviceCategory: profileRes.data.serviceCategory || "",
//           hourlyRate: profileRes.data.hourlyRate || "",
//           bio: profileRes.data.bio || "",
//         });

//         const providerId = profileRes.data._id;

//         // Bookings
//         const { data: bookingsData } = await axios.get(
//           `${API_BASE_URL}/api/providers/my-jobs`,
//           config
//         );
//         setBookings(bookingsData.bookings || []);

//         // Earnings
//         const { data: earningsData } = await axios.get(
//           `${API_BASE_URL}/api/providers/earnings`,
//           config
//         );
//         setEarnings(earningsData || {});

//         // Rating
//         const { data: ratingData } = await axios.get(
//           `${API_BASE_URL}/api/reviews/${providerId}/summary`
//         );
//         setAverageRating(ratingData.avgRating || 0);

//         // DISPUTES for provider
//         const disputesRes = await axios.get(
//           `${API_BASE_URL}/api/disputes/provider/mine`,
//           config
//         );
//         setProviderDisputes(disputesRes.data || []);
//       } catch (error) {
//         console.error("Error loading provider dashboard:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userInfo]);

//   /** JOB ACTIONS **/
//   const handleConfirm = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/confirm/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Confirmed" } : b))
//       );
//     } catch (err) {
//       console.error("Error confirming booking:", err);
//     }
//   };

//   const handleComplete = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/complete/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Completed" } : b))
//       );
//     } catch (err) {
//       console.error("Error completing booking:", err);
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/reject/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Rejected" } : b))
//       );
//     } catch (err) {
//       console.error("Error rejecting booking:", err);
//     }
//   };

//   /** PROVIDER RESPONDS TO DISPUTE **/
//   const handleRespond = async (id, message) => {
//     if (!message.trim()) return alert("Response message cannot be empty!");

//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/disputes/${id}/respond`,
//         { message },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );

//       alert("Response submitted!");

//       // Refresh disputes
//       const res = await axios.get(
//         `${API_BASE_URL}/api/disputes/provider/mine`,
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       setProviderDisputes(res.data);
//     } catch (err) {
//       console.error("Error responding to dispute:", err);
//       alert("Failed to respond.");
//     }
//   };

//   /** RENDER PAGES **/
//   const renderContent = () => {
//     if (loading) return <div>Loading data...</div>;

//     switch (activePage) {
//       /** DASHBOARD **/
//       case "dashboard":
//         return (
//           <div className="provider-content-section">
//             <h2>Dashboard Overview</h2>
//             <div className="provider-stat-grid">
//               <div className="provider-stat-card blue">
//                 <h3>{bookings.filter((b) => b.status === "Pending").length}</h3>
//                 <p>New Requests</p>
//               </div>

//               <div className="provider-stat-card purple">
//                 <h3>{bookings.filter((b) => b.status === "Confirmed").length}</h3>
//                 <p>Active Jobs</p>
//               </div>

//               <div className="provider-stat-card green">
//                 <h3>${earnings.totalEarnings || 0}</h3>
//                 <p>Total Earnings</p>
//               </div>

//               <div className="provider-stat-card orange">
//                 <h3>{Number(averageRating).toFixed(1)}⭐</h3>
//                 <p>Average Rating</p>
//               </div>
//             </div>
//           </div>
//         );

//       /** JOBS **/
//       case "jobs":
//         return (
//           <div className="provider-content-section">
//             <h2>My Jobs</h2>
//             {bookings.map((b) => (
//               <div className="provider-job-card" key={b._id}>
//                 <div>
//                   <h4>Service Booking</h4>
//                   <p>Customer: {b.customer?.name}</p>
//                   <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
//                   <p>Time: {b.bookingTime}</p>
//                   <p>Status: {b.status}</p>
//                 </div>

//                 <div className="provider-job-buttons">
//                   {b.status === "Pending" && (
//                     <>
//                       <button
//                         className="provider-btn-accept"
//                         onClick={() => handleConfirm(b._id)}
//                       >
//                         Accept
//                       </button>

//                       <button
//                         className="provider-btn-reject"
//                         onClick={() => handleReject(b._id)}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}

//                   {b.status === "Confirmed" && (
//                     <button
//                       className="provider-btn-complete"
//                       onClick={() => handleComplete(b._id)}
//                     >
//                       Mark Complete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       /** EARNINGS **/
//       case "earnings":
//         return (
//           <div className="provider-content-section">
//             <h2>Earnings Overview</h2>
//             <div className="provider-earning-summary">
//               <h3>Total Balance: ${earnings.totalEarnings || 0}</h3>
//               <p>Completed Jobs: {earnings.completedJobs || 0}</p>
//               <p>Pending Jobs: {earnings.pendingJobs || 0}</p>
//             </div>

//             <table className="provider-earning-table">
//               <thead>
//                 <tr>
//                   <th>Job</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b._id}>
//                     <td>{b.customer?.name}</td>
//                     <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
//                     <td>${b.totalCost}</td>
//                     <td>{b.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         );

//       // /** DISPUTES — PROVIDER ONLY RESPONDS **/
//       // case "disputes":
//       //   return (
//       //     <div className="provider-content-section">
//       //       <h2>Disputes Assigned to You</h2>

//       //       {providerDisputes.length === 0 ? (
//       //         <p>No disputes assigned to you.</p>
//       //       ) : (
//       //         providerDisputes.map((d) => (
//       //           <div className="provider-job-card" key={d._id}>
//       //             <p><strong>Customer:</strong> {d.customer?.name}</p>
//       //             <p><strong>Reason:</strong> {d.reason}</p>
//       //             <p><strong>Status:</strong> {d.status}</p>

//       //             <h4>Previous Responses:</h4>
//       //             {d.providerResponses.length === 0 ? (
//       //               <p>No responses yet.</p>
//       //             ) : (
//       //               d.providerResponses.map((r) => (
//       //                 <div key={r._id}>
//       //                   <p><strong>You:</strong> {r.message}</p>
//       //                   <p style={{ fontSize: "12px", color: "#666" }}>
//       //                     {new Date(r.createdAt).toLocaleString()}
//       //                   </p>
//       //                 </div>
//       //               ))
//       //             )}

//       //             <textarea
//       //               placeholder="Write your response..."
//       //               rows={3}
//       //               onChange={(e) =>
//       //                 setProviderDisputes((prev) =>
//       //                   prev.map((x) =>
//       //                     x._id === d._id ? { ...x, _response: e.target.value } : x
//       //                   )
//       //                 )
//       //               }
//       //             ></textarea>

//       //             <button
//       //               className="provider-btn-primary"
//       //               onClick={() => handleRespond(d._id, d._response || "")}
//       //             >
//       //               Submit Response
//       //             </button>
//       //           </div>
//       //         ))
//       //       )}
//       //     </div>
//       //   );
//      /** DISPUTES — CLEAN UI **/
// case "disputes":
//   return (
//     <div className="provider-content-section">
//       <h2>Disputes Assigned to You</h2>

//       {providerDisputes.length === 0 ? (
//         <p>No disputes assigned to you.</p>
//       ) : (
//         providerDisputes.map((d) => (
//           <div className="dispute-card" key={d._id}>
//             <div className="dispute-row">
//               <div>
//                 <p><strong>Customer:</strong> {d.customer?.name}</p>
//                 <p><strong>Reason:</strong> {d.reason}</p>
//                 <p><strong>Status:</strong> {d.status}</p>
//               </div>

//               <div className="previous-responses">
//                 <h4>Previous Responses</h4>

//                 {d.providerResponses.length === 0 ? (
//                   <p className="no-response">No responses yet.</p>
//                 ) : (
//                   d.providerResponses.map((r) => (
//                     <div className="response-bubble" key={r._id}>
//                       <p>{r.message}</p>
//                       <span className="timestamp">
//                         {new Date(r.createdAt).toLocaleString()}
//                       </span>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>

//             {/* TEXTBOX + BUTTON IN SAME ROW */}
//             <div className="response-input-row">
//               <textarea
//                 className="response-textarea"
//                 placeholder="Write your response..."
//                 rows={2}
//                 value={d._response || ""}
//                 onChange={(e) =>
//                   setProviderDisputes((prev) =>
//                     prev.map((x) =>
//                       x._id === d._id ? { ...x, _response: e.target.value } : x
//                     )
//                   )
//                 }
//               ></textarea>

//               <button
//                 className="provider-btn-primary response-btn"
//                 onClick={() => handleRespond(d._id, d._response || "")}
//               >
//                 Submit Response
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );

//       /** PROFILE **/
//       case "profile":
//         return (
//           <div className="provider-content-section">
//             <h2>My Profile</h2>

//             <form className="provider-profile-form">
//               <label>Full Name</label>
//               <input type="text" value={userInfo?.name} readOnly />

//               <label>Email</label>
//               <input type="text" value={userInfo?.email} readOnly />

//               <label>Service Category</label>
//               <input
//                 type="text"
//                 value={profileData.serviceCategory}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, serviceCategory: e.target.value })
//                 }
//               />

//               <label>Hourly Rate</label>
//               <input
//                 type="number"
//                 value={profileData.hourlyRate}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, hourlyRate: e.target.value })
//                 }
//               />

//               <label>Bio</label>
//               <textarea
//                 rows="4"
//                 value={profileData.bio}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, bio: e.target.value })
//                 }
//               ></textarea>

//               <button className="provider-btn-primary" type="submit">
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         );

//       default:
//         return <h2>Welcome!</h2>;
//     }
//   };

//   /** SIDEBAR MENU **/
//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <Home /> },
//     { id: "jobs", label: "My Jobs", icon: <Briefcase /> },
//     { id: "earnings", label: "Earnings", icon: <Wallet /> },
//     { id: "disputes", label: "Disputes", icon: <AlertCircle /> },
//     { id: "profile", label: "Profile", icon: <User /> },
//   ];

//   return (
//     <div className="provider-dashboard">
//       <aside className="provider-sidebar">
//         <h2 className="provider-sidebar-logo">TrustLink</h2>

//         <nav>
//           {menuItems.map((item) => (
//             <div
//               key={item.id}
//               className={`provider-sidebar-item ${
//                 activePage === item.id ? "active" : ""
//               }`}
//               onClick={() => setActivePage(item.id)}
//             >
//               <span className="provider-icon">{item.icon}</span>
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </nav>

//         <div className="provider-sidebar-footer">
//           <div className="provider-sidebar-item provider-logout" onClick={handleLogout}>
//             <LogOut size={18} />
//             <span>Logout</span>
//           </div>
//         </div>
//       </aside>

//       <main className="provider-main-section">
//         <header className="provider-navbar">
//           <h3>
//             Welcome back,{" "}
//             <span className="provider-highlight">
//               {userInfo?.name || "Provider"}
//             </span>{" "}
//             👋
//           </h3>

//           <div className="provider-navbar-right">
//             <Bell size={22} />
//             <img
//               src="https://via.placeholder.com/40"
//               alt="profile"
//               className="provider-profile-avatar"
//             />
//           </div>
//         </header>

//         <div className="provider-page-content">{renderContent()}</div>
//       </main>
//     </div>
//   );
// }

// export default ProviderDashboard;














// // ProviderDashboard.js
// import React, { useState, useEffect, useContext } from "react";
// import {
//   Home,
//   Briefcase,
//   Wallet,
//   AlertCircle,
//   User,
//   Bell,
//   LogOut,
// } from "lucide-react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./ProviderDashboard.css";


// function ProviderDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [bookings, setBookings] = useState([]);
//   const [earnings, setEarnings] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [providerDisputes, setProviderDisputes] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);

//   const { userInfo } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // small helper to build auth config
//   const authConfig = () => ({
//     headers: { Authorization: `Bearer ${userInfo?.token || ""}` },
//   });

//   /** LOGOUT **/
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   /** PROFILE DATA **/
//   const [profileData, setProfileData] = useState({
//     serviceCategory: "",
//     hourlyRate: "",
//     bio: "",
//   });

//   // Fetch data (profile, bookings, earnings, disputes)
//   useEffect(() => {
//     let mounted = true;

//     const fetchData = async () => {
//       if (!userInfo?.token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         // profile
//         const profileRes = await axios.get(
//           `${API_BASE_URL}/api/providers/me`,
//           authConfig()
//         );

//         if (!mounted) return;

//         setProfileData({
//           serviceCategory: profileRes.data.serviceCategory || "",
//           hourlyRate: profileRes.data.hourlyRate || "",
//           bio: profileRes.data.bio || "",
//         });

//         const providerId = profileRes.data._id;

//         // bookings
//         const { data: bookingsData } = await axios.get(
//           `${API_BASE_URL}/api/providers/my-jobs`,
//           authConfig()
//         );
//         if (mounted) setBookings(bookingsData.bookings || []);

//         // earnings
//         const { data: earningsData } = await axios.get(
//           `${API_BASE_URL}/api/providers/earnings`,
//           authConfig()
//         );
//         if (mounted) setEarnings(earningsData || {});

//         // rating
//         try {
//           const { data: ratingData } = await axios.get(
//             `${API_BASE_URL}/api/reviews/${providerId}/summary`
//           );
//           if (mounted) setAverageRating(ratingData.avgRating || 0);
//         } catch (err) {
//           // fail silently if review endpoint not present
//           if (mounted) setAverageRating(0);
//         }

//         // disputes assigned to this provider
//         const disputesRes = await axios.get(
//           `${API_BASE_URL}/api/disputes/provider/mine`,
//           authConfig()
//         );

//         // Ensure each dispute has a transient _response field (controlled textarea)
//         const disputesWithResponse = (disputesRes.data || []).map((d) => ({
//           ...d,
//           _response: d._response || "",
//           providerResponses: d.providerResponses || [],
//         }));

//         if (mounted) setProviderDisputes(disputesWithResponse);
//       } catch (error) {
//         console.error("Error loading provider dashboard:", error);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchData();

//     return () => {
//       mounted = false;
//     };
//   }, [userInfo]);

//   /** JOB ACTIONS **/
//   const handleConfirm = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/confirm/${id}`,
//         {},
//         authConfig()
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Confirmed" } : b))
//       );
//     } catch (err) {
//       console.error("Error confirming booking:", err);
//       alert("Could not confirm booking.");
//     }
//   };

//   const handleComplete = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/complete/${id}`,
//         {},
//         authConfig()
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Completed" } : b))
//       );
//     } catch (err) {
//       console.error("Error completing booking:", err);
//       alert("Could not mark booking complete.");
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/reject/${id}`,
//         {},
//         authConfig()
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Rejected" } : b))
//       );
//     } catch (err) {
//       console.error("Error rejecting booking:", err);
//       alert("Could not reject booking.");
//     }
//   };

//   /** PROVIDER RESPONDS TO A DISPUTE
//    * Behavior A: provider can reply multiple times until admin resolves it.
//    * Once dispute.status === 'Resolved' the textarea + button are hidden.
//    **/
//   const handleRespond = async (disputeId, message) => {
//     if (!message || !message.trim()) {
//       alert("Response message cannot be empty.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/disputes/${disputeId}/respond`,
//         { message },
//         authConfig()
//       );

//       // refresh only the changed dispute (or re-fetch all disputes)
//       const res = await axios.get(
//         `${API_BASE_URL}/api/disputes/provider/mine`,
//         authConfig()
//       );

//       const disputesWithResponse = (res.data || []).map((d) => ({
//         ...d,
//         _response: "",
//         providerResponses: d.providerResponses || [],
//       }));

//       setProviderDisputes(disputesWithResponse);
//       // optional small UI feedback
//       alert("Response submitted.");
//     } catch (err) {
//       console.error("Error responding to dispute:", err);
//       alert("Failed to submit response.");
//     }
//   };

//   /** RENDER SECTION CONTENT **/
//   const renderContent = () => {
//     if (loading) return <div>Loading data...</div>;

//     switch (activePage) {
//       case "dashboard":
//         return (
//           <div className="provider-content-section">
//             <h2>Dashboard Overview</h2>
//             <div className="provider-stat-grid">
//               <div className="provider-stat-card blue">
//                 <h3>{bookings.filter((b) => b.status === "Pending").length}</h3>
//                 <p>New Requests</p>
//               </div>

//               <div className="provider-stat-card purple">
//                 <h3>{bookings.filter((b) => b.status === "Confirmed").length}</h3>
//                 <p>Active Jobs</p>
//               </div>

//               <div className="provider-stat-card green">
//                 <h3>${earnings.totalEarnings || 0}</h3>
//                 <p>Total Earnings</p>
//               </div>

//               <div className="provider-stat-card orange">
//                 <h3>{Number(averageRating).toFixed(1)}⭐</h3>
//                 <p>Average Rating</p>
//               </div>
//             </div>
//           </div>
//         );

//       case "jobs":
//         return (
//           <div className="provider-content-section">
//             <h2>My Jobs</h2>
//             {bookings.map((b) => (
//               <div className="provider-job-card" key={b._id}>
//                 <div>
//                   <h4>Service Booking</h4>
//                   <p>Customer: {b.customer?.name}</p>
//                   <p>Date: {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "-"}</p>
//                   <p>Time: {b.bookingTime || "-"}</p>
//                   <p>Status: {b.status}</p>
//                 </div>

//                 <div className="provider-job-buttons">
//                   {b.status === "Pending" && (
//                     <>
//                       <button
//                         className="provider-btn-accept"
//                         onClick={() => handleConfirm(b._id)}
//                       >
//                         Accept
//                       </button>

//                       <button
//                         className="provider-btn-reject"
//                         onClick={() => handleReject(b._id)}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}

//                   {b.status === "Confirmed" && (
//                     <button
//                       className="provider-btn-complete"
//                       onClick={() => handleComplete(b._id)}
//                     >
//                       Mark Complete
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         );

//       case "earnings":
//         return (
//           <div className="provider-content-section">
//             <h2>Earnings Overview</h2>
//             <div className="provider-earning-summary">
//               <h3>Total Balance: ${earnings.totalEarnings || 0}</h3>
//               <p>Completed Jobs: {earnings.completedJobs || 0}</p>
//               <p>Pending Jobs: {earnings.pendingJobs || 0}</p>
//             </div>

//             <table className="provider-earning-table">
//               <thead>
//                 <tr>
//                   <th>Job</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b._id}>
//                     <td>{b.customer?.name}</td>
//                     <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "-"}</td>
//                     <td>${b.totalCost || 0}</td>
//                     <td>{b.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         );

//       case "disputes":
//         return (
//           <div className="provider-content-section">
//             <h2>Disputes Assigned to You</h2>

//             {providerDisputes.length === 0 ? (
//               <p>No disputes assigned to you.</p>
//             ) : (
//               providerDisputes.map((d) => (
//                 <div className="dispute-card" key={d._id}>
//                   <div className="dispute-row">
//                     <div className="dispute-meta">
//                       <p><strong>Customer:</strong> {d.customer?.name || "—"}</p>
//                       <p><strong>Reason:</strong> {d.reason || "—"}</p>
//                       <p><strong>Status:</strong> {d.status || "—"}</p>
//                     </div>

//                     <div className="previous-responses">
//                       <h4>Previous Responses</h4>

//                       {(!d.providerResponses || d.providerResponses.length === 0) ? (
//                         <p className="no-response">No responses yet.</p>
//                       ) : (
//                         d.providerResponses.map((r) => (
//                           <div className="response-bubble" key={r._id || r.createdAt}>
//                             <p>{r.message}</p>
//                             <span className="timestamp">
//                               {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
//                             </span>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>

//                   {/* show textarea and submit button ONLY when status !== 'Resolved' */}
//                   {d.status !== "Resolved" && (
//                     <div className="response-input-row">
//                       <textarea
//                         className="response-textarea"
//                         placeholder="Write your response..."
//                         rows={2}
//                         value={d._response || ""}
//                         onChange={(e) =>
//                           setProviderDisputes((prev) =>
//                             prev.map((x) =>
//                               x._id === d._id ? { ...x, _response: e.target.value } : x
//                             )
//                           )
//                         }
//                       />
//                       <button
//                         className="provider-btn-primary response-btn"
//                         onClick={() => handleRespond(d._id, d._response || "")}
//                       >
//                         Submit Response
//                       </button>
//                     </div>
//                   )}

//                   {/* if resolved, give a small note */}
//                   {d.status === "Resolved" && (
//                     <div style={{ marginTop: 8, color: "#333", fontStyle: "italic" }}>
//                       Dispute resolved by admin — no further responses allowed.
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         );

//       case "profile":
//         return (
//           <div className="provider-content-section">
//             <h2>My Profile</h2>

//             <form
//               className="provider-profile-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 // optional save flow; you already had handleSaveProfile earlier.
//                 axios
//                   .put(`${API_BASE_URL}/api/providers/me`, profileData, authConfig())
//                   .then(() => alert("Profile updated"))
//                   .catch((err) => {
//                     console.error("Error updating profile", err);
//                     alert("Error updating profile");
//                   });
//               }}
//             >
//               <label>Full Name</label>
//               <input type="text" value={userInfo?.name || ""} readOnly />

//               <label>Email</label>
//               <input type="text" value={userInfo?.email || ""} readOnly />

//               <label>Service Category</label>
//               <input
//                 type="text"
//                 value={profileData.serviceCategory}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, serviceCategory: e.target.value })
//                 }
//               />

//               <label>Hourly Rate</label>
//               <input
//                 type="number"
//                 value={profileData.hourlyRate}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, hourlyRate: e.target.value })
//                 }
//               />

//               <label>Bio</label>
//               <textarea
//                 rows="4"
//                 value={profileData.bio}
//                 onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
//               />

//               <button className="provider-btn-primary" type="submit">
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         );

//       default:
//         return <h2>Welcome!</h2>;
//     }
//   };

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <Home /> },
//     { id: "jobs", label: "My Jobs", icon: <Briefcase /> },
//     { id: "earnings", label: "Earnings", icon: <Wallet /> },
//     { id: "disputes", label: "Disputes", icon: <AlertCircle /> },
//     { id: "profile", label: "Profile", icon: <User /> },
//   ];

//   return (
//     <div className="provider-dashboard">
//       <aside className="provider-sidebar">
//         <h2 className="provider-sidebar-logo">TrustLink</h2>

//         <nav>
//           {menuItems.map((item) => (
//             <div
//               key={item.id}
//               className={`provider-sidebar-item ${activePage === item.id ? "active" : ""}`}
//               onClick={() => setActivePage(item.id)}
//             >
//               <span className="provider-icon">{item.icon}</span>
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </nav>

//         <div className="provider-sidebar-footer">
//           <div className="provider-sidebar-item provider-logout" onClick={handleLogout}>
//             <LogOut size={18} />
//             <span>Logout</span>
//           </div>
//         </div>
//       </aside>

//       <main className="provider-main-section">
//         <header className="provider-navbar">
//           <h3>
//             Welcome back,{" "}
//             <span className="provider-highlight">{userInfo?.name || "Provider"}</span> 👋
//           </h3>

//           <div className="provider-navbar-right">
//             <Bell size={22} />
//             <img src="https://cdn-icons-png.freepik.com/512/4862/4862248.png" alt="profile" className="provider-profile-avatar" />
         
//          {/* <img
//   src=""
//   alt="provider-avatar"
//   className="provider-profile-avatar"
// /> */}


//           </div>
//           {/* <div className="provider-navbar-right">
//   <Bell size={22} />

//   <img
//     src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${userInfo?.name || "Provider"}`}
//     alt="profile"
//     className="provider-profile-avatar"
//   />
// </div> */}

//         </header>

//         <div className="provider-page-content">{renderContent()}</div>
//       </main>
//     </div>
//   );
// }

// export default ProviderDashboard;




// // frontend/src/pages/ProviderDashboard.js
// import React, { useState, useEffect, useContext } from "react";
// import {
//   Home,
//   Briefcase,
//   Wallet,
//   AlertCircle,
//   User,
//   Bell,
//   LogOut,
// } from "lucide-react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./ProviderDashboard.css";

// function ProviderDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [bookings, setBookings] = useState([]);
//   const [earnings, setEarnings] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [providerDisputes, setProviderDisputes] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);

//   const { userInfo } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // small helper to build auth config for requests outside useEffect
//   const authConfig = (token = userInfo?.token) => ({
//     headers: { Authorization: `Bearer ${token || ""}` },
//   });

//   /** LOGOUT **/
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   /** PROFILE DATA **/
//   const [profileData, setProfileData] = useState({
//     serviceCategory: "",
//     hourlyRate: "",
//     bio: "",
//   });

//   // Fetch data (profile, bookings, earnings, disputes)
//   // Use userInfo?.token as the dependency to avoid eslint missing-deps.
//   useEffect(() => {
//     let mounted = true;
//     const token = userInfo?.token;

//     const fetchData = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);

//         // profile
//         const profileRes = await axios.get(
//           `${API_BASE_URL}/api/providers/me`,
//           authConfig(token)
//         );

//         if (!mounted) return;

//         setProfileData({
//           serviceCategory: profileRes.data.serviceCategory || "",
//           hourlyRate: profileRes.data.hourlyRate || "",
//           bio: profileRes.data.bio || "",
//         });

//         const providerId = profileRes.data._id;

//         // bookings
//         const { data: bookingsData } = await axios.get(
//           `${API_BASE_URL}/api/providers/my-jobs`,
//           authConfig(token)
//         );
//         if (mounted) setBookings(bookingsData.bookings || []);

//         // earnings
//         const { data: earningsData } = await axios.get(
//           `${API_BASE_URL}/api/providers/earnings`,
//           authConfig(token)
//         );
//         if (mounted) setEarnings(earningsData || {});

//         // rating (optional)
//         try {
//           const { data: ratingData } = await axios.get(
//             `${API_BASE_URL}/api/reviews/${providerId}/summary`
//           );
//           if (mounted) setAverageRating(ratingData.avgRating || 0);
//         } catch (err) {
//           if (mounted) setAverageRating(0);
//         }

//         // disputes assigned to this provider
//         const disputesRes = await axios.get(
//           `${API_BASE_URL}/api/disputes/provider/mine`,
//           authConfig(token)
//         );

//         // Ensure each dispute has a transient _response field (controlled textarea)
//         const disputesWithResponse = (disputesRes.data || []).map((d) => ({
//           ...d,
//           _response: d._response || "",
//           providerResponses: d.providerResponses || [],
//         }));

//         if (mounted) setProviderDisputes(disputesWithResponse);
//       } catch (error) {
//         console.error("Error loading provider dashboard:", error);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchData();

//     return () => {
//       mounted = false;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [userInfo?.token]); // only depends on the token to avoid lint warning

//   /** JOB ACTIONS **/
//   const handleConfirm = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/confirm/${id}`,
//         {},
//         authConfig()
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Confirmed" } : b))
//       );
//     } catch (err) {
//       console.error("Error confirming booking:", err);
//       alert("Could not confirm booking.");
//     }
//   };

//   const handleComplete = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/complete/${id}`,
//         {},
//         authConfig()
//       );
//       // booking status stays "Completed" (customer must provide OTP to release funds)
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Completed" } : b))
//       );
//     } catch (err) {
//       console.error("Error completing booking:", err);
//       alert("Could not mark booking complete.");
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/reject/${id}`,
//         {},
//         authConfig()
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Rejected" } : b))
//       );
//     } catch (err) {
//       console.error("Error rejecting booking:", err);
//       alert("Could not reject booking.");
//     }
//   };

//   /** OTP verification + Release funds (Provider) **/
//   const verifyOtp = async (bookingId) => {
//     if (!userInfo?.token) {
//       alert("You must be logged in.");
//       return;
//     }

//     const otp = prompt("Enter completion OTP from customer:");
//     if (!otp) {
//       alert("OTP is required.");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/api/bookings/${bookingId}/verify-otp`,
//         { otp },
//         authConfig()
//       );

//       // success handling: backend should respond with updated booking or success flag
//       // update local state to reflect funds released (choose status label 'Released')
//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === bookingId ? { ...b, status: res.data.status || "Released" } : b
//         )
//       );

//       alert("OTP verified! Money released.");
//     } catch (err) {
//       console.error("OTP verification error:", err);
//       const message =
//         err?.response?.data?.message || "Failed to verify OTP. Please try again.";
//       alert(message);
//     }
//   };

//   /** PROVIDER RESPONDS TO A DISPUTE **/
//   const handleRespond = async (disputeId, message) => {
//     if (!message || !message.trim()) {
//       alert("Response message cannot be empty.");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/disputes/${disputeId}/respond`,
//         { message },
//         authConfig()
//       );

//       // refresh provider disputes
//       const res = await axios.get(
//         `${API_BASE_URL}/api/disputes/provider/mine`,
//         authConfig()
//       );

//       const disputesWithResponse = (res.data || []).map((d) => ({
//         ...d,
//         _response: "",
//         providerResponses: d.providerResponses || [],
//       }));

//       setProviderDisputes(disputesWithResponse);
//       alert("Response submitted.");
//     } catch (err) {
//       console.error("Error responding to dispute:", err);
//       alert("Failed to submit response.");
//     }
//   };

//   /** RENDER SECTION CONTENT **/
//   const renderContent = () => {
//     if (loading) return <div>Loading data...</div>;

//     switch (activePage) {
//       case "dashboard":
//         return (
//           <div className="provider-content-section">
//             <h2>Dashboard Overview</h2>
//             <div className="provider-stat-grid">
//               <div className="provider-stat-card blue">
//                 <h3>{bookings.filter((b) => b.status === "Pending").length}</h3>
//                 <p>New Requests</p>
//               </div>

//               <div className="provider-stat-card purple">
//                 <h3>{bookings.filter((b) => b.status === "Confirmed").length}</h3>
//                 <p>Active Jobs</p>
//               </div>

//               <div className="provider-stat-card green">
//                 <h3>${earnings.totalEarnings || 0}</h3>
//                 <p>Total Earnings</p>
//               </div>

//               <div className="provider-stat-card orange">
//                 <h3>{Number(averageRating).toFixed(1)}⭐</h3>
//                 <p>Average Rating</p>
//               </div>
//             </div>
//           </div>
//         );

//       case "jobs":
//         return (
//           <div className="provider-content-section">
//             <h2>My Jobs</h2>
//             {bookings.length === 0 ? (
//               <p>No jobs yet.</p>
//             ) : (
//               bookings.map((b) => (
//                 <div className="provider-job-card" key={b._id}>
//                   <div>
//                     <h4>Service Booking</h4>
//                     <p>Customer: {b.customer?.name}</p>
//                     <p>
//                       Date:{" "}
//                       {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "-"}
//                     </p>
//                     <p>Time: {b.bookingTime || "-"}</p>
//                     <p>Status: {b.status}</p>
//                   </div>

//                   <div className="provider-job-buttons">
//                     {b.status === "Pending" && (
//                       <>
//                         <button
//                           className="provider-btn-accept"
//                           onClick={() => handleConfirm(b._id)}
//                         >
//                           Accept
//                         </button>

//                         <button
//                           className="provider-btn-reject"
//                           onClick={() => handleReject(b._id)}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}

//                     {b.status === "Confirmed" && (
//                       <button
//                         className="provider-btn-complete"
//                         onClick={() => handleComplete(b._id)}
//                       >
//                         Mark Complete
//                       </button>
//                     )}

//                     {/* SHOW OTP VERIFY button when booking is Completed */}
//                     {b.status === "Completed" && (
//                       <>
//                         <button
//                           className="provider-btn-primary"
//                           onClick={() => verifyOtp(b._id)}
//                           title="Ask customer for completion OTP, enter it and release funds"
//                         >
//                           Verify OTP & Release Payment
//                         </button>
//                       </>
//                     )}

//                     {/* If funds released, show a small badge */}
//                     {b.status === "Released" && (
//                       <div className="provider-badge success">Funds Released</div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         );

//       case "earnings":
//         return (
//           <div className="provider-content-section">
//             <h2>Earnings Overview</h2>
//             <div className="provider-earning-summary">
//               <h3>Total Balance: ${earnings.totalEarnings || 0}</h3>
//               <p>Completed Jobs: {earnings.completedJobs || 0}</p>
//               <p>Pending Jobs: {earnings.pendingJobs || 0}</p>
//             </div>

//             <table className="provider-earning-table">
//               <thead>
//                 <tr>
//                   <th>Job</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b._id}>
//                     <td>{b.customer?.name}</td>
//                     <td>
//                       {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "-"}
//                     </td>
//                     <td>${b.totalCost || 0}</td>
//                     <td>{b.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         );

//       case "disputes":
//         return (
//           <div className="provider-content-section">
//             <h2>Disputes Assigned to You</h2>

//             {providerDisputes.length === 0 ? (
//               <p>No disputes assigned to you.</p>
//             ) : (
//               providerDisputes.map((d) => (
//                 <div className="dispute-card" key={d._id}>
//                   <div className="dispute-row">
//                     <div className="dispute-meta">
//                       <p>
//                         <strong>Customer:</strong> {d.customer?.name || "—"}
//                       </p>
//                       <p>
//                         <strong>Reason:</strong> {d.reason || "—"}
//                       </p>
//                       <p>
//                         <strong>Status:</strong> {d.status || "—"}
//                       </p>
//                     </div>

//                     <div className="previous-responses">
//                       <h4>Previous Responses</h4>

//                       {(!d.providerResponses || d.providerResponses.length === 0) ? (
//                         <p className="no-response">No responses yet.</p>
//                       ) : (
//                         d.providerResponses.map((r) => (
//                           <div className="response-bubble" key={r._id || r.createdAt}>
//                             <p>{r.message}</p>
//                             <span className="timestamp">
//                               {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
//                             </span>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                   </div>

//                   {/* show textarea and submit button ONLY when status !== 'Resolved' */}
//                   {d.status !== "Resolved" && (
//                     <div className="response-input-row">
//                       <textarea
//                         className="response-textarea"
//                         placeholder="Write your response..."
//                         rows={2}
//                         value={d._response || ""}
//                         onChange={(e) =>
//                           setProviderDisputes((prev) =>
//                             prev.map((x) =>
//                               x._id === d._id ? { ...x, _response: e.target.value } : x
//                             )
//                           )
//                         }
//                       />
//                       <button
//                         className="provider-btn-primary response-btn"
//                         onClick={() => handleRespond(d._id, d._response || "")}
//                       >
//                         Submit Response
//                       </button>
//                     </div>
//                   )}

//                   {/* if resolved, give a small note */}
//                   {d.status === "Resolved" && (
//                     <div style={{ marginTop: 8, color: "#333", fontStyle: "italic" }}>
//                       Dispute resolved by admin — no further responses allowed.
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         );

//       case "profile":
//         return (
//           <div className="provider-content-section">
//             <h2>My Profile</h2>

//             <form
//               className="provider-profile-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 axios
//                   .put(`${API_BASE_URL}/api/providers/me`, profileData, authConfig())
//                   .then(() => alert("Profile updated"))
//                   .catch((err) => {
//                     console.error("Error updating profile", err);
//                     alert("Error updating profile");
//                   });
//               }}
//             >
//               <label>Full Name</label>
//               <input type="text" value={userInfo?.name || ""} readOnly />

//               <label>Email</label>
//               <input type="text" value={userInfo?.email || ""} readOnly />

//               <label>Service Category</label>
//               <input
//                 type="text"
//                 value={profileData.serviceCategory}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, serviceCategory: e.target.value })
//                 }
//               />

//               <label>Hourly Rate</label>
//               <input
//                 type="number"
//                 value={profileData.hourlyRate}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, hourlyRate: e.target.value })
//                 }
//               />

//               <label>Bio</label>
//               <textarea
//                 rows="4"
//                 value={profileData.bio}
//                 onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
//               />

//               <button className="provider-btn-primary" type="submit">
//                 Save Changes
//               </button>
//             </form>
//           </div>
//         );

//       default:
//         return <h2>Welcome!</h2>;
//     }
//   };

//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <Home /> },
//     { id: "jobs", label: "My Jobs", icon: <Briefcase /> },
//     { id: "earnings", label: "Earnings", icon: <Wallet /> },
//     { id: "disputes", label: "Disputes", icon: <AlertCircle /> },
//     { id: "profile", label: "Profile", icon: <User /> },
//   ];

//   return (
//     <div className="provider-dashboard">
//       <aside className="provider-sidebar">
//         <h2 className="provider-sidebar-logo">TrustLink</h2>

//         <nav>
//           {menuItems.map((item) => (
//             <div
//               key={item.id}
//               className={`provider-sidebar-item ${activePage === item.id ? "active" : ""}`}
//               onClick={() => setActivePage(item.id)}
//             >
//               <span className="provider-icon">{item.icon}</span>
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </nav>

//         <div className="provider-sidebar-footer">
//           <div className="provider-sidebar-item provider-logout" onClick={handleLogout}>
//             <LogOut size={18} />
//             <span>Logout</span>
//           </div>
//         </div>
//       </aside>

//       <main className="provider-main-section">
//         <header className="provider-navbar">
//           <h3>
//             Welcome back,{" "}
//             <span className="provider-highlight">{userInfo?.name || "Provider"}</span> 👋
//           </h3>

//           <div className="provider-navbar-right">
//             <Bell size={22} />
//             <img
//               src="https://cdn-icons-png.freepik.com/512/4862/4862248.png"
//               alt="profile"
//               className="provider-profile-avatar"
//             />
//           </div>
//         </header>

//         <div className="provider-page-content">{renderContent()}</div>
//       </main>
//     </div>
//   );
// }

// export default ProviderDashboard;


















// // frontend/src/pages/ProviderDashboard.js
// import React, { useState, useEffect, useContext } from "react";
// import {
//   Home,
//   Briefcase,
//   Wallet,
//   AlertCircle,
//   User,
//   Bell,
//   LogOut,
// } from "lucide-react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import "./ProviderDashboard.css";

// // -------------------------------------------------------------
// // 🔵 FIXED AUTH CONFIG (outside component)
// // -------------------------------------------------------------
// const buildAuthConfig = (token) => ({
//   headers: { Authorization: `Bearer ${token}` },
// });

// function ProviderDashboard() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [bookings, setBookings] = useState([]);
//   const [earnings, setEarnings] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [providerDisputes, setProviderDisputes] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);

//   const { userInfo } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // -------------------------------------------------------------
//   // LOGOUT
//   // -------------------------------------------------------------
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   // -------------------------------------------------------------
//   // PROFILE DATA
//   // -------------------------------------------------------------
//   const [profileData, setProfileData] = useState({
//     serviceCategory: "",
//     hourlyRate: "",
//     bio: "",
//   });

//   // -------------------------------------------------------------
//   // FETCH all provider data
//   // -------------------------------------------------------------
//   useEffect(() => {
//     if (!userInfo?.token) return;

//     let mounted = true;
//     const token = userInfo.token;

//     const loadData = async () => {
//       try {
//         setLoading(true);

//         // Provider Profile
//         const profileRes = await axios.get(
//           `${API_BASE_URL}/api/providers/me`,
//           buildAuthConfig(token)
//         );

//         if (!mounted) return;

//         setProfileData({
//           serviceCategory: profileRes.data.serviceCategory || "",
//           hourlyRate: profileRes.data.hourlyRate || "",
//           bio: profileRes.data.bio || "",
//         });

//         const providerId = profileRes.data._id;

//         // Provider Jobs
//         const jobsRes = await axios.get(
//           `${API_BASE_URL}/api/providers/my-jobs`,
//           buildAuthConfig(token)
//         );

//         if (mounted) setBookings(jobsRes.data.bookings || []);

//         // Earnings
//         const earningsRes = await axios.get(
//           `${API_BASE_URL}/api/providers/earnings`,
//           buildAuthConfig(token)
//         );
//         if (mounted) setEarnings(earningsRes.data || {});

//         // Average Rating
//         try {
//           const ratingRes = await axios.get(
//             `${API_BASE_URL}/api/reviews/${providerId}/summary`
//           );
//           if (mounted) setAverageRating(ratingRes.data.avgRating || 0);
//         } catch {
//           setAverageRating(0);
//         }

//         // Disputes assigned to provider
//         const disputesRes = await axios.get(
//           `${API_BASE_URL}/api/disputes/provider/mine`,
//           buildAuthConfig(token)
//         );

//         if (mounted)
//           setProviderDisputes(
//             (disputesRes.data || []).map((d) => ({
//               ...d,
//               _response: "",
//               providerResponses: d.providerResponses || [],
//             }))
//           );
//       } catch (err) {
//         console.error("Provider dashboard load error:", err);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadData();
//     return () => (mounted = false);
//   }, [userInfo?.token]);

//   // -------------------------------------------------------------
//   // ACCEPT JOB
//   // -------------------------------------------------------------
//   const handleConfirm = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/confirm/${id}`,
//         {},
//         buildAuthConfig(userInfo.token)
//       );
//       setBookings((prev) =>
//         prev.map((b) => (b._id === id ? { ...b, status: "Confirmed" } : b))
//       );
//     } catch (err) {
//       console.error("Accept job error:", err);
//       alert("Could not accept job.");
//     }
//   };

//   // -------------------------------------------------------------
//   // MARK JOB COMPLETED (Provider side)
//   // -------------------------------------------------------------
//   const handleComplete = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/complete/${id}`,
//         {},
//         buildAuthConfig(userInfo.token)
//       );

//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === id ? { ...b, status: "Completed" } : b
//         )
//       );
//     } catch (err) {
//       console.error("Complete job error:", err);
//       alert("Error completing job.");
//     }
//   };

//   // -------------------------------------------------------------
//   // REJECT JOB
//   // -------------------------------------------------------------
//   const handleReject = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/providers/reject/${id}`,
//         {},
//         buildAuthConfig(userInfo.token)
//       );

//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === id ? { ...b, status: "Rejected" } : b
//         )
//       );
//     } catch (err) {
//       alert("Error rejecting job.");
//     }
//   };

//   // -------------------------------------------------------------
//   // 🔵 OTP VERIFY FLOW (Provider → Release Payment)
//   // -------------------------------------------------------------
//   const verifyOtp = async (bookingId) => {
//     const otp = prompt("Enter OTP customer gave you:");

//     if (!otp) return alert("OTP required!");

//     try {
//       const res = await axios.post(
//         `${API_BASE_URL}/api/bookings/${bookingId}/verify-otp`,
//         { otp },
//         buildAuthConfig(userInfo.token)
//       );

//       alert("OTP Verified — Payment Released!");

//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === bookingId
//             ? { ...b, status: "Released", escrowStatus: "RELEASED" }
//             : b
//         )
//       );
//     } catch (err) {
//       alert(err?.response?.data?.message || "Invalid OTP");
//     }
//   };

//   // -------------------------------------------------------------
//   // RESPONSE TO DISPUTE
//   // -------------------------------------------------------------
//   const handleRespond = async (id, msg) => {
//     if (!msg.trim()) return alert("Response cannot be empty");

//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/disputes/${id}/respond`,
//         { message: msg },
//         buildAuthConfig(userInfo.token)
//       );

//       const res = await axios.get(
//         `${API_BASE_URL}/api/disputes/provider/mine`,
//         buildAuthConfig(userInfo.token)
//       );

//       setProviderDisputes(
//         res.data.map((d) => ({ ...d, _response: "" }))
//       );
//     } catch (err) {
//       alert("Error responding to dispute.");
//     }
//   };

//   // -------------------------------------------------------------
//   // JSX FOR DIFFERENT PAGES
//   // -------------------------------------------------------------
//   const renderContent = () => {
//     if (loading) return <div>Loading...</div>;

//     switch (activePage) {
//       // █████████████ DASHBOARD █████████████
//       case "dashboard":
//         return (
//           <div className="provider-content-section">
//             <h2>Dashboard Overview</h2>

//             <div className="provider-stat-grid">
//               <div className="provider-stat-card blue">
//                 <h3>{bookings.filter((b) => b.status === "Pending").length}</h3>
//                 <p>New Requests</p>
//               </div>

//               <div className="provider-stat-card purple">
//                 <h3>{bookings.filter((b) => b.status === "Confirmed").length}</h3>
//                 <p>Active Jobs</p>
//               </div>

//               <div className="provider-stat-card green">
//                 <h3>${earnings.totalEarnings || 0}</h3>
//                 <p>Total Earnings</p>
//               </div>

//               <div className="provider-stat-card orange">
//                 <h3>{Number(averageRating).toFixed(1)}⭐</h3>
//                 <p>Average Rating</p>
//               </div>
//             </div>
//           </div>
//         );

//       // █████████████ JOBS █████████████
//       case "jobs":
//         return (
//           <div className="provider-content-section">
//             <h2>My Jobs</h2>

//             {bookings.length === 0 ? (
//               <p>No jobs yet.</p>
//             ) : (
//               bookings.map((b) => (
//                 <div className="provider-job-card" key={b._id}>
//                   <div>
//                     <h4>Service Booking</h4>
//                     <p>Customer: {b.customer?.name}</p>
//                     <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
//                     <p>Time: {b.bookingTime}</p>
//                     <p>Status: {b.status}</p>
//                   </div>

//                   <div className="provider-job-buttons">
//                     {b.status === "Pending" && (
//                       <>
//                         <button
//                           className="provider-btn-accept"
//                           onClick={() => handleConfirm(b._id)}
//                         >
//                           Accept
//                         </button>
//                         <button
//                           className="provider-btn-reject"
//                           onClick={() => handleReject(b._id)}
//                         >
//                           Reject
//                         </button>
//                       </>
//                     )}

//                     {b.status === "Confirmed" && (
//                       <button
//                         className="provider-btn-complete"
//                         onClick={() => handleComplete(b._id)}
//                       >
//                         Mark Complete
//                       </button>
//                     )}

//                     {b.status === "Completed" && (
//                       <button
//                         className="provider-btn-primary"
//                         onClick={() => verifyOtp(b._id)}
//                       >
//                         Verify OTP & Release Payment
//                       </button>
//                     )}

//                     {b.status === "Released" && (
//                       <div className="provider-badge success">
//                         Funds Released
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         );

//       // █████████████ EARNINGS █████████████
//       case "earnings":
//         return (
//           <div className="provider-content-section">
//             <h2>Earnings Overview</h2>

//             <div className="provider-earning-summary">
//               <h3>Total Balance: ${earnings.totalEarnings || 0}</h3>
//               <p>Completed Jobs: {earnings.completedJobs || 0}</p>
//               <p>Pending Jobs: {earnings.pendingJobs || 0}</p>
//             </div>

//             <table className="provider-earning-table">
//               <thead>
//                 <tr>
//                   <th>Job</th>
//                   <th>Date</th>
//                   <th>Amount</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b._id}>
//                     <td>{b.customer?.name}</td>
//                     <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
//                     <td>${b.totalCost}</td>
//                     <td>{b.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         );

//       // █████████████ DISPUTES █████████████
//       case "disputes":
//         return (
//           <div className="provider-content-section">
//             <h2>Disputes Assigned to You</h2>

//             {providerDisputes.length === 0 ? (
//               <p>No disputes yet.</p>
//             ) : (
//               providerDisputes.map((d) => (
//                 <div className="dispute-card" key={d._id}>
//                   <div className="dispute-row">
//                     <div className="dispute-meta">
//                       <p><strong>Customer:</strong> {d.customer?.name}</p>
//                       <p><strong>Reason:</strong> {d.reason}</p>
//                       <p><strong>Status:</strong> {d.status}</p>
//                     </div>

//                     <div className="previous-responses">
//                       <h4>Previous Responses</h4>

//                       {d.providerResponses?.length ? (
//                         d.providerResponses.map((r) => (
//                           <div className="response-bubble" key={r._id}>
//                             <p>{r.message}</p>
//                             <span>{new Date(r.createdAt).toLocaleString()}</span>
//                           </div>
//                         ))
//                       ) : (
//                         <p>No responses yet.</p>
//                       )}
//                     </div>
//                   </div>

//                   {d.status !== "Resolved" && (
//                     <div className="response-input-row">
//                       <textarea
//                         className="response-textarea"
//                         placeholder="Write response..."
//                         value={d._response}
//                         onChange={(e) =>
//                           setProviderDisputes((prev) =>
//                             prev.map((x) =>
//                               x._id === d._id
//                                 ? { ...x, _response: e.target.value }
//                                 : x
//                             )
//                           )
//                         }
//                       />

//                       <button
//                         className="provider-btn-primary"
//                         onClick={() => handleRespond(d._id, d._response)}
//                       >
//                         Submit Response
//                       </button>
//                     </div>
//                   )}

//                   {d.status === "Resolved" && (
//                     <i style={{ color: "green" }}>
//                       Dispute resolved — no more replies.
//                     </i>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         );

//       // █████████████ PROFILE █████████████
//       case "profile":
//         return (
//           <div className="provider-content-section">
//             <h2>My Profile</h2>

//             <form
//               className="provider-profile-form"
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 axios
//                   .put(
//                     `${API_BASE_URL}/api/providers/me`,
//                     profileData,
//                     buildAuthConfig(userInfo.token)
//                   )
//                   .then(() => alert("Profile updated"))
//                   .catch(() => alert("Error updating profile"));
//               }}
//             >
//               <label>Email</label>
//               <input value={userInfo.email} readOnly />

//               <label>Name</label>
//               <input value={userInfo.name} readOnly />

//               <label>Category</label>
//               <input
//                 value={profileData.serviceCategory}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     serviceCategory: e.target.value,
//                   })
//                 }
//               />

//               <label>Hourly Rate</label>
//               <input
//                 type="number"
//                 value={profileData.hourlyRate}
//                 onChange={(e) =>
//                   setProfileData({
//                     ...profileData,
//                     hourlyRate: e.target.value,
//                   })
//                 }
//               />

//               <label>Bio</label>
//               <textarea
//                 value={profileData.bio}
//                 onChange={(e) =>
//                   setProfileData({ ...profileData, bio: e.target.value })
//                 }
//               />

//               <button className="provider-btn-primary">Save</button>
//             </form>
//           </div>
//         );

//       default:
//         return <h2>Welcome!</h2>;
//     }
//   };

//   // -------------------------------------------------------------
//   // SIDEBAR MENU
//   // -------------------------------------------------------------
//   const menuItems = [
//     { id: "dashboard", label: "Dashboard", icon: <Home /> },
//     { id: "jobs", label: "My Jobs", icon: <Briefcase /> },
//     { id: "earnings", label: "Earnings", icon: <Wallet /> },
//     { id: "disputes", label: "Disputes", icon: <AlertCircle /> },
//     { id: "profile", label: "Profile", icon: <User /> },
//   ];

//   return (
//     <div className="provider-dashboard">
//       <aside className="provider-sidebar">
//         <h2 className="provider-sidebar-logo">TrustLink</h2>

//         <nav>
//           {menuItems.map((item) => (
//             <div
//               key={item.id}
//               className={`provider-sidebar-item ${
//                 activePage === item.id ? "active" : ""
//               }`}
//               onClick={() => setActivePage(item.id)}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </div>
//           ))}
//         </nav>

//         <div className="provider-sidebar-footer">
//           <div
//             className="provider-sidebar-item provider-logout"
//             onClick={handleLogout}
//           >
//             <LogOut />
//             <span>Logout</span>
//           </div>
//         </div>
//       </aside>

//       <main className="provider-main-section">
//         <header className="provider-navbar">
//           <h3>
//             Welcome, <span className="provider-highlight">{userInfo.name}</span> 👋
//           </h3>

//           <div className="provider-navbar-right">
//             <Bell size={22} />
//             <img
//               src="https://cdn-icons-png.freepik.com/512/4862/4862248.png"
//               className="provider-profile-avatar"
//               alt="avatar"
//             />
//           </div>
//         </header>

//         <div className="provider-page-content">{renderContent()}</div>
//       </main>
//     </div>
//   );
// }

// export default ProviderDashboard;



// frontend/src/pages/ProviderDashboard.js
import React, { useState, useEffect, useContext } from "react";
import {
  Home,
  Briefcase,
  Wallet,
  AlertCircle,
  User,
  Bell,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProviderDashboard.css";

function ProviderDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState({});
  const [loading, setLoading] = useState(true);
  const [providerDisputes, setProviderDisputes] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // small helper to build auth config (accepts optional token to avoid stale closure)
  const authConfig = (token = userInfo?.token) => ({
    headers: { Authorization: `Bearer ${token || ""}` },
  });

  /** LOGOUT **/
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  /** PROFILE DATA **/
  const [profileData, setProfileData] = useState({
    businessName: "",
    serviceCategory: "",
    hourlyRate: "",
    bio: "",
  });

  // fetch bookings helper so other actions can refresh bookings
  const fetchBookings = async (token) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/providers/my-jobs`,
        authConfig(token)
      );
      setBookings(data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // Fetch data (profile, bookings, earnings, disputes)
  // depends only on token to satisfy eslint for react-hooks/exhaustive-deps
  useEffect(() => {
    let mounted = true;
    const token = userInfo?.token;

    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // profile
        const profileRes = await axios.get(
          `${API_BASE_URL}/api/providers/me`,
          authConfig(token)
        );

        if (!mounted) return;

        // map any businessName field if present in profile
        setProfileData({
          businessName: profileRes.data.businessName || profileRes.data.name || "",
          serviceCategory: profileRes.data.serviceCategory || "",
          hourlyRate: profileRes.data.hourlyRate || "",
          bio: profileRes.data.bio || "",
        });

        const providerId = profileRes.data._id;

        // bookings
        await fetchBookings(token);

        // earnings
        try {
          const { data: earningsData } = await axios.get(
            `${API_BASE_URL}/api/providers/earnings`,
            authConfig(token)
          );
          if (mounted) setEarnings(earningsData || {});
        } catch (err) {
          console.warn("Earnings endpoint not available or failed:", err);
          if (mounted) setEarnings({});
        }

        // rating (optional)
        try {
          const { data: ratingData } = await axios.get(
            `${API_BASE_URL}/api/reviews/${providerId}/summary`
          );
          if (mounted) setAverageRating(ratingData.avgRating || 0);
        } catch (err) {
          if (mounted) setAverageRating(0);
        }

        // disputes assigned to this provider
        try {
          const disputesRes = await axios.get(
            `${API_BASE_URL}/api/disputes/provider/mine`,
            authConfig(token)
          );

          const disputesWithResponse = (disputesRes.data || []).map((d) => ({
            ...d,
            _response: d._response || "",
            providerResponses: d.providerResponses || [],
          }));

          if (mounted) setProviderDisputes(disputesWithResponse);
        } catch (err) {
          console.warn("No disputes endpoint / failed:", err);
          if (mounted) setProviderDisputes([]);
        }
      } catch (error) {
        console.error("Error loading provider dashboard:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
    // only depend on token to avoid stale closure & eslint warnings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.token]);

  /** JOB ACTIONS **/
  const handleConfirm = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/providers/confirm/${id}`,
        {},
        authConfig()
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "Confirmed" } : b))
      );
    } catch (err) {
      console.error("Error confirming booking:", err);
      alert("Could not confirm booking.");
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/providers/complete/${id}`,
        {},
        authConfig()
      );
      // mark locally as Completed; customer must provide OTP to release funds
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "Completed" } : b))
      );
    } catch (err) {
      console.error("Error completing booking:", err);
      alert("Could not mark booking complete.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/providers/reject/${id}`,
        {},
        authConfig()
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "Rejected" } : b))
      );
    } catch (err) {
      console.error("Error rejecting booking:", err);
      alert("Could not reject booking.");
    }
  };

  /** OTP verification + Release funds (Provider) **/
  const verifyOtp = async (bookingId) => {
    if (!userInfo?.token) {
      alert("You must be logged in.");
      return;
    }

    const otp = prompt("Enter completion OTP from customer:");
    if (!otp || !otp.trim()) {
      alert("OTP is required.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/bookings/${bookingId}/verify-otp`,
        { otp },
        authConfig()
      );

      // After verifying, refresh bookings so UI is in sync with backend changes.
      await fetchBookings(userInfo?.token);

      // Show backend message or fallback success message
      alert(data?.message || "OTP verified! Money released.");
    } catch (err) {
      console.error("OTP verification error:", err);
      const message =
        err?.response?.data?.message || "Failed to verify OTP. Please try again.";
      alert(message);
    }
  };

  /** PROVIDER RESPONDS TO A DISPUTE **/
  const handleRespond = async (disputeId, message) => {
    if (!message || !message.trim()) {
      alert("Response message cannot be empty.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/api/disputes/${disputeId}/respond`,
        { message },
        authConfig()
      );

      // refresh provider disputes
      const res = await axios.get(
        `${API_BASE_URL}/api/disputes/provider/mine`,
        authConfig()
      );

      const disputesWithResponse = (res.data || []).map((d) => ({
        ...d,
        _response: "",
        providerResponses: d.providerResponses || [],
      }));

      setProviderDisputes(disputesWithResponse);
      alert("Response submitted.");
    } catch (err) {
      console.error("Error responding to dispute:", err);
      alert("Failed to submit response.");
    }
  };

  /** RENDER SECTION CONTENT **/
  const renderContent = () => {
    if (loading) return <div>Loading data...</div>;

    switch (activePage) {
      case "dashboard":
        return (
          <div className="provider-content-section">
            <h2>Dashboard Overview</h2>
            <div className="provider-stat-grid">
              <div className="provider-stat-card blue">
                <h3>{bookings.filter((b) => b.status === "Pending").length}</h3>
                <p>New Requests</p>
              </div>

              <div className="provider-stat-card purple">
                <h3>{bookings.filter((b) => b.status === "Confirmed").length}</h3>
                <p>Active Jobs</p>
              </div>

              <div className="provider-stat-card green">
                <h3>${earnings.totalEarnings || 0}</h3>
                <p>Total Earnings</p>
              </div>

              <div className="provider-stat-card orange">
                <h3>{Number(averageRating).toFixed(1)}⭐</h3>
                <p>Average Rating</p>
              </div>
            </div>
          </div>
        );

      case "jobs":
        return (
          <div className="provider-content-section">
            <h2>My Jobs</h2>
            {bookings.length === 0 ? (
              <p>No jobs yet.</p>
            ) : (
              bookings.map((b) => (
                <div className="provider-job-card" key={b._id}>
                  <div>
                    <h4>Service Booking</h4>
                    <p>Customer: {b.customer?.name || "-"}</p>
                    <p>
                      Date:{" "}
                      {b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "-"}
                    </p>
                    <p>Time: {b.bookingTime || "-"}</p>
                    <p>Status: {b.status}</p>
                    {/* show OTP only to provider? we don't show OTP here for security; provider must ask customer */}
                  </div>

                  <div className="provider-job-buttons">
                    {b.status === "Pending" && (
                      <>
                        <button
                          className="provider-btn-accept"
                          onClick={() => handleConfirm(b._id)}
                        >
                          Accept
                        </button>

                        <button
                          className="provider-btn-reject"
                          onClick={() => handleReject(b._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {b.status === "Confirmed" && (
                      <button
                        className="provider-btn-complete"
                        onClick={() => handleComplete(b._id)}
                      >
                        Mark Complete
                      </button>
                    )}

                    {/* SHOW OTP VERIFY button when booking is Completed */}
                    {b.status === "Completed" && (
                      <button
                        className="provider-btn-primary"
                        onClick={() => verifyOtp(b._id)}
                        title="Ask customer for completion OTP, enter it and release funds"
                      >
                        Verify OTP & Release Payment
                      </button>
                    )}

                    {/* If funds released, show a small badge */}
                    {b.escrowStatus === "RELEASED" && (
                      <div className="provider-badge success">Funds Released</div>
                    )}
                    {b.escrowStatus === "REFUNDED" && (
                      <div className="provider-badge danger">Customer Refunded</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case "earnings":
        return (
          <div className="provider-content-section">
            <h2>Earnings Overview</h2>
            <div className="provider-earning-summary">
              <h3>Total Balance: ${earnings.totalEarnings || 0}</h3>
              <p>Completed Jobs: {earnings.completedJobs || 0}</p>
              <p>Pending Jobs: {earnings.pendingJobs || 0}</p>
            </div>

            <table className="provider-earning-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.customer?.name || "-"}</td>
                    <td>{b.bookingDate ? new Date(b.bookingDate).toLocaleDateString() : "-"}</td>
                    <td>${b.totalCost || 0}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "disputes":
        return (
          <div className="provider-content-section">
            <h2>Disputes Assigned to You</h2>

            {providerDisputes.length === 0 ? (
              <p>No disputes assigned to you.</p>
            ) : (
              providerDisputes.map((d) => (
                <div className="dispute-card" key={d._id}>
                  <div className="dispute-row">
                    <div className="dispute-meta">
                      <p>
                        <strong>Customer:</strong> {d.customer?.name || "—"}
                      </p>
                      <p>
                        <strong>Reason:</strong> {d.reason || "—"}
                      </p>
                      <p>
                        <strong>Status:</strong> {d.status || "—"}
                      </p>
                    </div>

                    <div className="previous-responses">
                      <h4>Previous Responses</h4>

                      {(!d.providerResponses || d.providerResponses.length === 0) ? (
                        <p className="no-response">No responses yet.</p>
                      ) : (
                        d.providerResponses.map((r) => (
                          <div className="response-bubble" key={r._id || r.createdAt}>
                            <p>{r.message}</p>
                            <span className="timestamp">
                              {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* show textarea and submit button ONLY when status !== 'Resolved' */}
                  {d.status !== "Resolved" && (
                    <div className="response-input-row">
                      <textarea
                        className="response-textarea"
                        placeholder="Write your response..."
                        rows={2}
                        value={d._response || ""}
                        onChange={(e) =>
                          setProviderDisputes((prev) =>
                            prev.map((x) =>
                              x._id === d._id ? { ...x, _response: e.target.value } : x
                            )
                          )
                        }
                      />
                      <button
                        className="provider-btn-primary response-btn"
                        onClick={() => handleRespond(d._id, d._response || "")}
                      >
                        Submit Response
                      </button>
                    </div>
                  )}

                  {/* if resolved, give a small note */}
                  {d.status === "Resolved" && (
                    <div style={{ marginTop: 8, color: "#333", fontStyle: "italic" }}>
                      Dispute resolved by admin — no further responses allowed.
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        );

      case "profile":
        return (
          <div className="provider-content-section">
            <h2>My Profile</h2>

            <form
              className="provider-profile-form"
              onSubmit={(e) => {
                e.preventDefault();
                axios
                  .put(`${API_BASE_URL}/api/providers/me`, profileData, authConfig())
                  .then(() => alert("Profile updated"))
                  .catch((err) => {
                    console.error("Error updating profile", err);
                    alert("Error updating profile");
                  });
              }}
            >
              <label>Full Name</label>
              <input type="text" value={userInfo?.name || ""} readOnly />

              <label>Email</label>
              <input type="text" value={userInfo?.email || ""} readOnly />

              <label>Service Category</label>
              <input
                type="text"
                value={profileData.serviceCategory}
                onChange={(e) =>
                  setProfileData({ ...profileData, serviceCategory: e.target.value })
                }
              />

              <label>Hourly Rate</label>
              <input
                type="number"
                value={profileData.hourlyRate}
                onChange={(e) =>
                  setProfileData({ ...profileData, hourlyRate: e.target.value })
                }
              />

              <label>Bio</label>
              <textarea
                rows="4"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              />

              <button className="provider-btn-primary" type="submit">
                Save Changes
              </button>
            </form>
          </div>
        );

      default:
        return <h2>Welcome!</h2>;
    }
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home /> },
    { id: "jobs", label: "My Jobs", icon: <Briefcase /> },
    { id: "earnings", label: "Earnings", icon: <Wallet /> },
    { id: "disputes", label: "Disputes", icon: <AlertCircle /> },
    { id: "profile", label: "Profile", icon: <User /> },
  ];

  return (
    <div className="provider-dashboard">
      <aside className="provider-sidebar">
        <h2 className="provider-sidebar-logo">TrustLink</h2>

        <nav>
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`provider-sidebar-item ${activePage === item.id ? "active" : ""}`}
              onClick={() => setActivePage(item.id)}
            >
              <span className="provider-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="provider-sidebar-footer">
          <div className="provider-sidebar-item provider-logout" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="provider-main-section">
        <header className="provider-navbar">
          <h3>
            Welcome back,{" "}
            <span className="provider-highlight">
              {profileData.businessName || userInfo?.name || "Provider"}
            </span>{" "}
            👋
          </h3>

          <div className="provider-navbar-right">
            <Bell size={22} />
            <img
              src="https://cdn-icons-png.freepik.com/512/4862/4862248.png"
              alt="profile"
              className="provider-profile-avatar"
            />
          </div>
        </header>

        <div className="provider-page-content">{renderContent()}</div>
      </main>
    </div>
  );
}

export default ProviderDashboard;
