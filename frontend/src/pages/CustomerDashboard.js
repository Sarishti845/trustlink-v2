import { API_BASE_URL } from '../config';



// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import {
//   Home,
//   Briefcase,
//   AlertCircle,
//   User,
//   LogOut,
//   Bell,
// } from "lucide-react";

// import { AuthContext } from "../context/AuthContext";
// import "./ProviderDashboard.css"; // same styling

// function CustomerDashboard() {
//   const { userInfo, logout } = useContext(AuthContext);
//   const [activePage, setActivePage] = useState("dashboard");

//   const [bookings, setBookings] = useState([]);
//   const [customerDisputes, setCustomerDisputes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Dispute Form States
//   const [selectedBookingId, setSelectedBookingId] = useState("");
//   const [disputeReason, setDisputeReason] = useState("");

//   // ---------------------------------------------------------------------
//   // FETCH CUSTOMER DATA
//   // ---------------------------------------------------------------------
//   useEffect(() => {
//     if (!userInfo?.token) return;

//     const fetchData = async () => {
//       try {
//         const config = {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         };

//         // Load bookings
//         const res1 = await axios.get(
//           `${API_BASE_URL}/api/bookings/mybookings`,
//           config
//         );
//         setBookings(res1.data.bookings || []);

//         // Load disputes
//         const res2 = await axios.get(
//           `${API_BASE_URL}/api/disputes/mine`,
//           config
//         );
//         setCustomerDisputes(res2.data || []);
//       } catch (err) {
//         console.error("Error loading dashboard:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [userInfo]);

//   // ---------------------------------------------------------------------
//   // CANCEL BOOKING
//   // ---------------------------------------------------------------------
//   const cancelBooking = async (id) => {
//     try {
//       await axios.put(
//         `${API_BASE_URL}/api/bookings/cancel/${id}`,
//         {},
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );

//       setBookings((prev) =>
//         prev.map((b) =>
//           b._id === id ? { ...b, status: "Cancelled" } : b
//         )
//       );

//       alert("Booking cancelled!");
//     } catch (err) {
//       console.error("Cancel Error:", err);
//     }
//   };

//   // ---------------------------------------------------------------------
//   // CREATE A DISPUTE (Customer)
//   // ---------------------------------------------------------------------
//   const handleCreateDispute = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         `${API_BASE_URL}/api/disputes`,
//         {
//           bookingId: selectedBookingId,
//           reason: disputeReason,
//         },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );

//       alert("Dispute submitted!");

//       // Reset form
//       setSelectedBookingId("");
//       setDisputeReason("");

//       // Refresh disputes
//       const res = await axios.get(
//         `${API_BASE_URL}/api/disputes/mine`,
//         {
//           headers: { Authorization: `Bearer ${userInfo.token}` },
//         }
//       );
//       setCustomerDisputes(res.data);
//     } catch (err) {
//       console.error("Error creating dispute:", err);
//       alert("Failed to submit dispute.");
//     }
//   };

//   // ---------------------------------------------------------------------
//   // RENDER PAGES
//   // ---------------------------------------------------------------------
//   const renderContent = () => {
//     if (loading) return <div>Loading...</div>;

//     switch (activePage) {
//       // ------------------------------------------------ Dashboard
//       case "dashboard":
//         return (
//           <div className="provider-content-section">
//             <h2>Dashboard Overview</h2>

//             <div className="provider-stat-grid">
//               <div className="provider-stat-card blue">
//                 <h3>{bookings.filter(b => b.status === "Pending").length}</h3>
//                 <p>Pending Requests</p>
//               </div>

//               <div className="provider-stat-card purple">
//                 <h3>{bookings.filter(b => b.status === "Confirmed").length}</h3>
//                 <p>Upcoming Jobs</p>
//               </div>

//               <div className="provider-stat-card green">
//                 <h3>{bookings.filter(b => b.status === "Completed").length}</h3>
//                 <p>Completed Jobs</p>
//               </div>

//               <div className="provider-stat-card orange">
//                 <h3>{bookings.filter(b => b.status === "Cancelled").length}</h3>
//                 <p>Cancelled</p>
//               </div>
//             </div>
//           </div>
//         );

//       // ------------------------------------------------ My Bookings
//       case "bookings":
//         return (
//           <div className="provider-content-section">
//             <h2>My Bookings</h2>

//             {bookings.length === 0 ? (
//               <p>No bookings yet.</p>
//             ) : (
//               // bookings.map((b) => (
//               //   <div className="provider-job-card" key={b._id}>
//               //     <div>
//               //       <h4>Service Booking</h4>
//               //       <p>Provider: {b.provider?.name}</p>
//               //       <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
//               //       <p>Time: {b.bookingTime}</p>
//               //       <p>Status: {b.status}</p>
//               //       <p><b>Booking ID:</b> {b._id}</p>
//               //     </div>

//               //     <div className="provider-job-buttons">
//               //       {b.status === "Pending" && (
//               //         <button
//               //           className="provider-btn-reject"
//               //           onClick={() => cancelBooking(b._id)}
//               //         >
//               //           Cancel
//               //         </button>
//               //       )}
//               //     </div>
//               //   </div>
//               // ))
//               bookings.map((b) => (
//   <div className="provider-job-card" key={b._id}>
//     <div>
//       <h4>Service Booking</h4>
//       <p>Provider: {b.provider?.name}</p>
//       <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
//       <p>Time: {b.bookingTime}</p>
//       <p>Status: {b.status}</p>
//       <p><b>Booking ID:</b> {b._id}</p>

//       {/* 🔵 SHOW COMPLETION OTP HERE */}
//       {b.completionOtp && (
//         <p style={{ marginTop: "10px", fontWeight: "bold", color: "#0a58ca" }}>
//           Completion OTP: {b.completionOtp}  
//           <br />
//           <span style={{ fontSize: "13px", color: "gray" }}>
//             Share this OTP with the provider after job completion.
//           </span>
//         </p>
//       )}

//     </div>

//     <div className="provider-job-buttons">
//       {b.status === "Pending" && (
//         <button
//           className="provider-btn-reject"
//           onClick={() => cancelBooking(b._id)}
//         >
//           Cancel
//         </button>
//       )}
//     </div>
//   </div>
// ))

//             )}
//           </div>
//         );

//       // ------------------------------------------------ Disputes
//       case "disputes":
//         return (
//           <div className="provider-content-section">
//             <h2>Raise a Dispute</h2>

//             {/* FORM */}
//             <form className="provider-dispute-form" onSubmit={handleCreateDispute}>
              
//               <label>Choose Booking</label>
//               {/* <select
//                 value={selectedBookingId}
//                 onChange={(e) => setSelectedBookingId(e.target.value)}
//                 required
//               >
//                 <option value="">Select a booking</option>

//                 {bookings.map((b) => (
//                   <option key={b._id} value={b._id}>
//                     {b._id} — {b.provider?.name} — {new Date(b.bookingDate).toLocaleDateString()}
//                   </option>
//                 ))}
//               </select> */}
       
//        <select
//   className="pretty-select"
//   value={selectedBookingId}
//   onChange={(e) => setSelectedBookingId(e.target.value)}
//   required
// >
//   <option value="">Select a booking</option>
//   {bookings.map((b) => (
//     <option key={b._id} value={b._id}>
//       {b._id} — {b.provider?.name} — {new Date(b.bookingDate).toLocaleDateString()}
//     </option>
//   ))}
// </select>



//               <label>Reason</label>
//               <textarea
//                 rows={4}
//                 placeholder="Describe the issue..."
//                 value={disputeReason}
//                 onChange={(e) => setDisputeReason(e.target.value)}
//                 required
//               ></textarea>

//               <button className="provider-btn-primary">Submit Dispute</button>
//             </form>

//             {/* ---------------------------------------------------------------- */}
//             <h3 style={{ marginTop: "25px" }}>My Previous Disputes</h3>
//             {/* ---------------------------------------------------------------- */}

//             {customerDisputes.length === 0 ? (
//               <p>No disputes yet.</p>
//             ) : (
//               customerDisputes.map((d) => (
//                 <div className="provider-job-card" key={d._id}>
//                   <p><strong>Reason:</strong> {d.reason}</p>
//                   <p>
//                     <strong>Status:</strong>{" "}
//                     <span style={{ color: d.status === "Resolved" ? "green" : "red" }}>
//                       {d.status}
//                     </span>
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         );

//       // ------------------------------------------------ Profile
//       case "profile":
//         return (
//           <div className="provider-content-section">
//             <h2>My Profile</h2>

//             <form className="provider-profile-form">
//               <label>Name</label>
//               <input type="text" value={userInfo?.name} readOnly />

//               <label>Email</label>
//               <input type="text" value={userInfo?.email} readOnly />

//               <label>Phone</label>
//               <input type="text" placeholder="Add phone number" />

//               <button className="provider-btn-primary">Save</button>
//             </form>
//           </div>
//         );

//       default:
//         return <h2>Welcome!</h2>;
//     }
//   };

//   // ---------------------------------------------------------------------
//   // FINAL UI LAYOUT
//   // ---------------------------------------------------------------------
//   return (
//     <div className="provider-dashboard">
//       <aside className="provider-sidebar">
//         <h2 className="provider-sidebar-logo">TrustLink</h2>

//         <nav>
//           <div
//             className={`provider-sidebar-item ${
//               activePage === "dashboard" ? "active" : ""
//             }`}
//             onClick={() => setActivePage("dashboard")}
//           >
//             <Home />
//             <span>Dashboard</span>
//           </div>

//           <div
//             className={`provider-sidebar-item ${
//               activePage === "bookings" ? "active" : ""
//             }`}
//             onClick={() => setActivePage("bookings")}
//           >
//             <Briefcase />
//             <span>My Bookings</span>
//           </div>

//           <div
//             className={`provider-sidebar-item ${
//               activePage === "disputes" ? "active" : ""
//             }`}
//             onClick={() => setActivePage("disputes")}
//           >
//             <AlertCircle />
//             <span>Disputes</span>
//           </div>

//           <div
//             className={`provider-sidebar-item ${
//               activePage === "profile" ? "active" : ""
//             }`}
//             onClick={() => setActivePage("profile")}
//           >
//             <User />
//             <span>Profile</span>
//           </div>
//         </nav>

//         <div className="provider-sidebar-footer">
//           <div className="provider-sidebar-item provider-logout" onClick={logout}>
//             <LogOut />
//             <span>Logout</span>
//           </div>
//         </div>
//       </aside>

//       <main className="provider-main-section">
//         <header className="provider-navbar">
//           <h3>
//             Welcome back,{" "}
//             <span className="provider-highlight">{userInfo?.name}</span> 👋
//           </h3>

//           <div className="provider-navbar-right">
//             <Bell size={22} />
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
//               alt="profile"
//               className="provider-profile-avatar"
//             />
//           </div>

//           {/* <div className="provider-navbar-right">
//   <Bell size={22} />

//   <img
//     src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${userInfo?.name || "Customer"}`}
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

// export default CustomerDashboard;






// CustomerDashboard.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Home,
  Briefcase,
  AlertCircle,
  User,
  LogOut,
  Bell,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import "./ProviderDashboard.css"; // same styling

// ----------------------------------------------
// ✅ FIX: Move authConfig OUTSIDE component
// ----------------------------------------------
const buildAuthConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

function CustomerDashboard() {
  const { userInfo, logout } = useContext(AuthContext);
  const [activePage, setActivePage] = useState("dashboard");

  const [bookings, setBookings] = useState([]);
  const [customerDisputes, setCustomerDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dispute Form States
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [disputeReason, setDisputeReason] = useState("");

  // ---------------------------------------------------------------------
  // FETCH CUSTOMER DATA
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (!userInfo?.token) return;

    const fetchData = async () => {
      try {
        const config = buildAuthConfig(userInfo.token);

        const res1 = await axios.get(
          `${API_BASE_URL}/api/bookings/mybookings`,
          config
        );
        setBookings(res1.data.bookings || []);

        const res2 = await axios.get(
          `${API_BASE_URL}/api/disputes/mine`,
          config
        );
        setCustomerDisputes(res2.data || []);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

  // ---------------------------------------------------------------------
  // CANCEL BOOKING
  // ---------------------------------------------------------------------
  const cancelBooking = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/bookings/cancel/${id}`,
        {},
        buildAuthConfig(userInfo.token)
      );

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, status: "Cancelled" } : b
        )
      );

      alert("Booking cancelled!");
    } catch (err) {
      console.error("Cancel Error:", err);
    }
  };

  // ---------------------------------------------------------------------
  // CREATE A DISPUTE (Customer)
  // ---------------------------------------------------------------------
  const handleCreateDispute = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${API_BASE_URL}/api/disputes`,
        {
          bookingId: selectedBookingId,
          reason: disputeReason,
          // description: disputeReason 
        },
        buildAuthConfig(userInfo.token)
      );

      alert("Dispute submitted!");

      setSelectedBookingId("");
      setDisputeReason("");

      const res = await axios.get(
        `${API_BASE_URL}/api/disputes/mine`,
        buildAuthConfig(userInfo.token)
      );
      setCustomerDisputes(res.data);
    } catch (err) {
      console.error("Error creating dispute:", err);
      alert("Failed to submit dispute.");
    }
  };

  // ---------------------------------------------------------------------
  // RENDER PAGES
  // ---------------------------------------------------------------------
  const renderContent = () => {
    if (loading) return <div>Loading...</div>;

    switch (activePage) {
      // ------------------------------------------------ Dashboard
      case "dashboard":
        return (
          <div className="provider-content-section">
            <h2>Dashboard Overview</h2>

            <div className="provider-stat-grid">
              <div className="provider-stat-card blue">
                <h3>{bookings.filter(b => b.status === "Pending").length}</h3>
                <p>Pending Requests</p>
              </div>

              <div className="provider-stat-card purple">
                <h3>{bookings.filter(b => b.status === "Confirmed").length}</h3>
                <p>Upcoming Jobs</p>
              </div>

              <div className="provider-stat-card green">
                <h3>{bookings.filter(b => b.status === "Completed").length}</h3>
                <p>Completed Jobs</p>
              </div>

              <div className="provider-stat-card orange">
                <h3>{bookings.filter(b => b.status === "Cancelled").length}</h3>
                <p>Cancelled</p>
              </div>
            </div>
          </div>
        );

      // ------------------------------------------------ My Bookings
      // case "bookings":
      //   return (
      //     <div className="provider-content-section">
      //       <h2>My Bookings</h2>

      //       {bookings.length === 0 ? (
      //         <p>No bookings yet.</p>
      //       ) : (
      //         bookings.map((b) => (
      //           <div className="provider-job-card" key={b._id}>
      //             <div>
      //               <h4>Service Booking</h4>
      //               <p>Provider: {b.provider?.name}</p>
      //               <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
      //               <p>Time: {b.bookingTime}</p>
      //               <p>Status: {b.status}</p>
      //               <p><b>Booking ID:</b> {b._id}</p>

      //               {/* 🔵 SHOW COMPLETION OTP */}
      //               {b.completionOtp && (
      //                 <p style={{ marginTop: "10px", fontWeight: "bold", color: "#0a58ca" }}>
      //                   Completion OTP: {b.completionOtp}
      //                   <br />
      //                   <span style={{ fontSize: "13px", color: "gray" }}>
      //                     Share this OTP with the provider after job completion.
      //                   </span>
      //                 </p>
      //               )}

      //             </div>

      //             <div className="provider-job-buttons">
      //               {b.status === "Pending" && (
      //                 <button
      //                   className="provider-btn-reject"
      //                   onClick={() => cancelBooking(b._id)}
      //                 >
      //                   Cancel
      //                 </button>
      //               )}
      //             </div>
      //           </div>
      //         ))
      //       )}
      //     </div>
      //   );


      case "bookings":
  return (
    <div className="provider-content-section">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((b) => (
          <div className="provider-job-card" key={b._id}>
            <div>
              <h4>Service Booking</h4>
              <p>Provider: {b.provider?.name}</p>
              <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
              <p>Time: {b.bookingTime}</p>
              <p>Status: {b.status}</p>
              <p><b>Booking ID:</b> {b._id}</p>

              {/* 🔵 SHOW CUSTOMER OTP */}
              {b.status === "Completed" && b.completionOtp && (
                <p style={{ marginTop: "10px", fontWeight: "bold", color: "#0a58ca" }}>
                  Completion OTP: {b.completionOtp}
                  <br />
                  <span style={{ fontSize: "13px", color: "gray" }}>
                    Share this OTP with the provider to release payment.
                  </span>
                </p>
              )}
            </div>

            <div className="provider-job-buttons">
              {b.status === "Pending" && (
                <button
                  className="provider-btn-reject"
                  onClick={() => cancelBooking(b._id)}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );


      // ------------------------------------------------ Disputes
      case "disputes":
        return (
          <div className="provider-content-section">
            <h2>Raise a Dispute</h2>

            <form className="provider-dispute-form" onSubmit={handleCreateDispute}>
              <label>Choose Booking</label>

              <select
                className="pretty-select"
                value={selectedBookingId}
                onChange={(e) => setSelectedBookingId(e.target.value)}
                required
              >
                <option value="">Select a booking</option>
                {bookings.map((b) => (
                  <option key={b._id} value={b._id}>
                    {b._id} — {b.provider?.name} — {new Date(b.bookingDate).toLocaleDateString()}
                  </option>
                ))}
              </select>

              <label>Reason</label>
              <textarea
                rows={4}
                placeholder="Describe the issue..."
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                required
              ></textarea>

              <button className="provider-btn-primary">Submit Dispute</button>
            </form>

            <h3 style={{ marginTop: "25px" }}>My Previous Disputes</h3>

            {customerDisputes.length === 0 ? (
              <p>No disputes yet.</p>
            ) : (
              customerDisputes.map((d) => (
                <div className="provider-job-card" key={d._id}>
                  <p><strong>Reason:</strong> {d.reason}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span style={{ color: d.status === "Resolved" ? "green" : "red" }}>
                      {d.status}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        );

      // ------------------------------------------------ Profile
      case "profile":
        return (
          <div className="provider-content-section">
            <h2>My Profile</h2>

            <form className="provider-profile-form">
              <label>Name</label>
              <input type="text" value={userInfo?.name} readOnly />

              <label>Email</label>
              <input type="text" value={userInfo?.email} readOnly />

              <label>Phone</label>
              <input type="text" placeholder="Add phone number" />

              <button className="provider-btn-primary">Save</button>
            </form>
          </div>
        );

      default:
        return <h2>Welcome!</h2>;
    }
  };

  // ---------------------------------------------------------------------
  // FINAL UI LAYOUT
  // ---------------------------------------------------------------------
  return (
    <div className="provider-dashboard">
      <aside className="provider-sidebar">
        <h2 className="provider-sidebar-logo">TrustLink</h2>

        <nav>
          <div
            className={`provider-sidebar-item ${activePage === "dashboard" ? "active" : ""}`}
            onClick={() => setActivePage("dashboard")}
          >
            <Home />
            <span>Dashboard</span>
          </div>

          <div
            className={`provider-sidebar-item ${activePage === "bookings" ? "active" : ""}`}
            onClick={() => setActivePage("bookings")}
          >
            <Briefcase />
            <span>My Bookings</span>
          </div>

          <div
            className={`provider-sidebar-item ${activePage === "disputes" ? "active" : ""}`}
            onClick={() => setActivePage("disputes")}
          >
            <AlertCircle />
            <span>Disputes</span>
          </div>

          <div
            className={`provider-sidebar-item ${activePage === "profile" ? "active" : ""}`}
            onClick={() => setActivePage("profile")}
          >
            <User />
            <span>Profile</span>
          </div>
        </nav>

        <div className="provider-sidebar-footer">
          <div className="provider-sidebar-item provider-logout" onClick={logout}>
            <LogOut />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="provider-main-section">
        <header className="provider-navbar">
          <h3>
            Welcome back,{" "}
            <span className="provider-highlight">{userInfo?.name}</span> 👋
          </h3>

          <div className="provider-navbar-right">
            <Bell size={22} />
            <img
              src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
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

export default CustomerDashboard;



