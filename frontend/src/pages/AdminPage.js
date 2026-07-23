import { API_BASE_URL } from '../config';






// // AdminPage.js
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";
// import "./AdminPage.css";

// function AdminPage() {
//   const { userInfo } = useContext(AuthContext);

//   const [activeTab, setActiveTab] = useState("providers"); // providers | disputes

//   // ---------- Provider State ----------
//   const [pendingProviders, setPendingProviders] = useState([]);
//   const [loadingProviders, setLoadingProviders] = useState(true);

//   // ---------- Dispute State ----------
//   const [disputes, setDisputes] = useState([]);
//   const [loadingDisputes, setLoadingDisputes] = useState(true);

//   // =====================================================================
//   //                      FETCH PENDING PROVIDERS
//   // =====================================================================
//   const fetchPendingProviders = async () => {
//     try {
//       setLoadingProviders(true);
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

//       const { data } = await axios.get(
//         `${API_BASE_URL}/api/admin/pending-providers`,
//         config
//       );

//       setPendingProviders(data);
//     } catch (err) {
//       console.error("Provider fetch error:", err);
//     } finally {
//       setLoadingProviders(false);
//     }
//   };

//   // =====================================================================
//   //                      FETCH ALL DISPUTES  ✔ CORRECT
//   // =====================================================================
//   const fetchDisputes = async () => {
//     try {
//       setLoadingDisputes(true);

//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

//       // ✔ Correct backend route
//       const { data } = await axios.get(
//         `${API_BASE_URL}/api/disputes`,
//         config
//       );

//       setDisputes(data);
//     } catch (err) {
//       console.error("Dispute fetch error:", err);
//     } finally {
//       setLoadingDisputes(false);
//     }
//   };

//   useEffect(() => {
//     if (userInfo?.role === "admin") {
//       fetchPendingProviders();
//       fetchDisputes();
//     }
//   }, [userInfo]);

//   // =====================================================================
//   //                      APPROVE / DECLINE PROVIDER
//   // =====================================================================
//   const handleApprove = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

//       await axios.put(
//         `${API_BASE_URL}/api/admin/providers/${id}/verify`,
//         {},
//         config
//       );

//       fetchPendingProviders();
//       alert("Provider approved successfully.");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDecline = async (id) => {
//     if (!window.confirm("Decline this provider?")) return;
//     setPendingProviders((prev) => prev.filter((p) => p._id !== id));
//   };

//   // =====================================================================
//   //                      ADMIN RESOLVES DISPUTE  ✔ CORRECT
//   // =====================================================================
//   const resolveDispute = async (id, decision) => {
//     const notes = window.prompt("Add admin notes (optional):") || "";

//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

//       // ✔ Correct backend route
//       await axios.put(
//         `${API_BASE_URL}/api/disputes/${id}/resolve`,
//         {
//           decision,
//           notes,
//         },
//         config
//       );

//       fetchDisputes();
//       alert("Dispute resolved.");
//     } catch (err) {
//       console.error("Resolve dispute error:", err);
//       alert("Failed to resolve dispute.");
//     }
//   };

//   // =====================================================================
//   //                      MAIN UI
//   // =====================================================================
//   return (
//     <div className="admin-page-container">
//       <h1>Admin Dashboard</h1>

//       {/* TAB BUTTONS */}
//       <div className="admin-tabs">
//         <button
//           className={activeTab === "providers" ? "tab active" : "tab"}
//           onClick={() => setActiveTab("providers")}
//         >
//           Pending Providers
//         </button>

//         <button
//           className={activeTab === "disputes" ? "tab active" : "tab"}
//           onClick={() => setActiveTab("disputes")}
//         >
//           Disputes
//         </button>
//       </div>

//       {/* ======================================================
//             TAB 1: PENDING PROVIDERS
//       ======================================================= */}
//       {activeTab === "providers" && (
//         <>
//           {loadingProviders ? (
//             <p>Loading providers...</p>
//           ) : pendingProviders.length === 0 ? (
//             <p>No providers pending verification.</p>
//           ) : (
//             <ul className="pending-list">
//               {pendingProviders.map((provider) => (
//                 <li key={provider._id} className="pending-item">
//                   <div className="provider-info">
//                     <span><strong>Name:</strong> {provider.name}</span>
//                     <span><strong>Email:</strong> {provider.email}</span>

//                     {provider.providerProfile && (
//                       <>
//                         <span>
//                           <strong>Service:</strong>{" "}
//                           {provider.providerProfile.serviceCategory}
//                         </span>
//                         <span>
//                           <strong>Experience:</strong>{" "}
//                           {provider.providerProfile.experience} years
//                         </span>
//                         <span>
//                           <strong>Bio:</strong>{" "}
//                           {provider.providerProfile.bio?.substring(0, 100)}...
//                         </span>
//                       </>
//                     )}
//                   </div>

//                   <div className="provider-actions">
//                     {/* DOCUMENT LINKS */}
//                     <div className="doc-links-container">
//                       {provider.providerProfile?.idProofPath && (
//                         <a
//                           className="doc-link"
//                           target="_blank"
//                           href={`http://localhost:5000/${provider.providerProfile.idProofPath.replace(
//                             /\\/g,
//                             "/"
//                           )}`}
//                         >
//                           View ID Proof
//                         </a>
//                       )}

//                       {provider.providerProfile?.licensePath && (
//                         <a
//                           className="doc-link"
//                           target="_blank"
//                           href={`http://localhost:5000/${provider.providerProfile.licensePath.replace(
//                             /\\/g,
//                             "/"
//                           )}`}
//                         >
//                           View License
//                         </a>
//                       )}
//                     </div>

//                     <div className="action-buttons-container">
//                       <button
//                         className="approve-btn"
//                         onClick={() => handleApprove(provider._id)}
//                       >
//                         Approve
//                       </button>

//                       <button
//                         className="decline-btn"
//                         onClick={() => handleDecline(provider._id)}
//                       >
//                         Decline
//                       </button>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       )}

//       {/* ======================================================
//             TAB 2: DISPUTES
//       ======================================================= */}
//       {activeTab === "disputes" && (
//         <>
//           {loadingDisputes ? (
//             <p>Loading disputes...</p>
//           ) : disputes.length === 0 ? (
//             <p>No disputes available.</p>
//           ) : (
//             <ul className="pending-list">
//               {disputes.map((d) => (
//                 <li key={d._id} className="pending-item">
//                   <div className="provider-info">
//                     <span>
//                       <strong>Booking:</strong> {d.booking?._id}
//                     </span>
//                     <span>
//                       <strong>Customer:</strong> {d.customer?.name}
//                     </span>
//                     <span>
//                       <strong>Provider:</strong> {d.provider?.name}
//                     </span>
//                     <span>
//                       <strong>Reason:</strong> {d.reason}
//                     </span>

//                     <span>
//                       <strong>Status:</strong> {d.status}
//                     </span>

//                     <h4>Provider Responses:</h4>
//                     {d.providerResponses.length === 0 ? (
//                       <p>No provider replies yet.</p>
//                     ) : (
//                       d.providerResponses.map((r) => (
//                         <p key={r._id}>
//                           → {r.message}{" "}
//                           <span style={{ fontSize: "12px", color: "#777" }}>
//                             ({new Date(r.createdAt).toLocaleString()})
//                           </span>
//                         </p>
//                       ))
//                     )}

//                     {d.adminDecision?.decision !== "Pending" && (
//                       <>
//                         <h4>Admin Decision:</h4>
//                         <p><strong>Decision:</strong> {d.adminDecision.decision}</p>
//                         <p><strong>Notes:</strong> {d.adminDecision.notes}</p>
//                       </>
//                     )}
//                   </div>

//                   {d.status !== "Resolved" && (
//                     <div className="action-buttons-container">
//                       <button
//                         className="approve-btn"
//                         onClick={() => resolveDispute(d._id, "Refund")}
//                       >
//                         Resolve for Customer (Refund)
//                       </button>

//                       <button
//                         className="decline-btn"
//                         onClick={() => resolveDispute(d._id, "NoAction")}
//                       >
//                         Resolve for Provider
//                       </button>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default AdminPage;






// AdminPage.js
import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./AdminPage.css";

function AdminPage() {
  const { userInfo } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("providers");

  const [pendingProviders, setPendingProviders] = useState([]);
  const [loadingProviders, setLoadingProviders] = useState(true);

  const [disputes, setDisputes] = useState([]);
  const [loadingDisputes, setLoadingDisputes] = useState(true);

  const authConfig = useCallback(() => {
    return {
      headers: { Authorization: `Bearer ${userInfo?.token}` }
    };
  }, [userInfo?.token]);

  // ================================================================
  // FETCH PENDING PROVIDERS
  // ================================================================
  const fetchPendingProviders = useCallback(async () => {
    if (!userInfo?.token) return;

    try {
      setLoadingProviders(true);

      const { data } = await axios.get(
        `${API_BASE_URL}/api/admin/pending-providers`,
        authConfig()
      );

      setPendingProviders(data);
    } catch (err) {
      console.error("Provider fetch error:", err);
    } finally {
      setLoadingProviders(false);
    }
  }, [authConfig, userInfo?.token]);

  // ================================================================
  // FETCH DISPUTES + ESCROW STATUS
  // ================================================================
  const fetchDisputes = useCallback(async () => {
    if (!userInfo?.token) return;

    try {
      setLoadingDisputes(true);

      const { data } = await axios.get(
        `${API_BASE_URL}/api/disputes`,
        authConfig()
      );

      setDisputes(data);
    } catch (err) {
      console.error("Dispute fetch error:", err);
    } finally {
      setLoadingDisputes(false);
    }
  }, [authConfig, userInfo?.token]);

  useEffect(() => {
    if (userInfo?.role === "admin") {
      fetchPendingProviders();
      fetchDisputes();
    }
  }, [userInfo, fetchPendingProviders, fetchDisputes]);

  // ================================================================
  // APPROVE PROVIDER
  // ================================================================
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/providers/${id}/verify`,
        {},
        authConfig()
      );

      fetchPendingProviders();
      alert("Provider approved successfully.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecline = (id) => {
    if (!window.confirm("Decline this provider?")) return;
    setPendingProviders((prev) => prev.filter((p) => p._id !== id));
  };

  // ================================================================
  // RESOLVE DISPUTE
  // ================================================================
  const resolveDispute = async (id, decision) => {
    const notes = window.prompt("Add admin notes (optional):") || "";

    try {
      await axios.put(
        `${API_BASE_URL}/api/disputes/${id}/resolve`,
        { decision, notes },
        authConfig()
      );

      fetchDisputes();
      alert("Dispute resolved.");
    } catch (err) {
      console.error("Resolve dispute error:", err);
      alert("Failed to resolve dispute.");
    }
  };

  // ================================================================
  // ESCROW CONTROLS (RELEASE / REFUND)
  // ================================================================
  const releaseEscrow = async (bookingId) => {
    if (!window.confirm("Release escrow payment to provider?")) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/escrow/release/${bookingId}`,
        {},
        authConfig()
      );

      fetchDisputes();
      alert("Escrow released.");
    } catch (err) {
      console.error(err);
      alert("Could not release escrow.");
    }
  };

  const refundEscrow = async (bookingId) => {
    if (!window.confirm("Refund customer from escrow?")) return;

    try {
      await axios.put(
        `${API_BASE_URL}/api/admin/escrow/refund/${bookingId}`,
        {},
        authConfig()
      );

      fetchDisputes();
      alert("Refund issued.");
    } catch (err) {
      console.error(err);
      alert("Could not refund escrow.");
    }
  };

  // ================================================================
  // MAIN UI
  // ================================================================
  return (
    <div className="admin-page-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button
          className={activeTab === "providers" ? "tab active" : "tab"}
          onClick={() => setActiveTab("providers")}
        >
          Pending Providers
        </button>

        <button
          className={activeTab === "disputes" ? "tab active" : "tab"}
          onClick={() => setActiveTab("disputes")}
        >
          Disputes / Escrow
        </button>
      </div>

      {/* ============================================================ */}
      {/* PENDING PROVIDERS */}
      {/* ============================================================ */}
      {activeTab === "providers" && (
        <>
          {loadingProviders ? (
            <p>Loading providers...</p>
          ) : pendingProviders.length === 0 ? (
            <p>No providers pending verification.</p>
          ) : (
            <ul className="pending-list">
              {pendingProviders.map((p) => (
                <li key={p._id} className="pending-item">
                  <div className="provider-info">
                    <span><strong>Name:</strong> {p.name}</span>
                    <span><strong>Email:</strong> {p.email}</span>

                    {p.providerProfile && (
                      <>
                        <span><strong>Service:</strong> {p.providerProfile.serviceCategory}</span>
                        <span><strong>Experience:</strong> {p.providerProfile.experience} years</span>
                        <span><strong>Bio:</strong> {p.providerProfile.bio}</span>
                      </>
                    )}
                  </div>

                  <div className="provider-actions">
                    <div className="doc-links-container">
                      {p.providerProfile?.idProofPath && (
                        <a
                          className="doc-link"
                          target="_blank"
                          rel="noreferrer"
                          href={`${API_BASE_URL}/${p.providerProfile.idProofPath}`}
                        >
                          View ID Proof
                        </a>
                      )}
                      {p.providerProfile?.licensePath && (
                        <a
                          className="doc-link"
                          target="_blank"
                          rel="noreferrer"
                          href={`${API_BASE_URL}/${p.providerProfile.licensePath}`}
                        >
                          View License
                        </a>
                      )}
                    </div>

                    <div className="action-buttons-container">
                      <button className="approve-btn" onClick={() => handleApprove(p._id)}>
                        Approve
                      </button>
                      <button className="decline-btn" onClick={() => handleDecline(p._id)}>
                        Decline
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* ============================================================ */}
      {/* DISPUTES + ESCROW */}
      {/* ============================================================ */}
      {activeTab === "disputes" && (
        <>
          {loadingDisputes ? (
            <p>Loading disputes...</p>
          ) : disputes.length === 0 ? (
            <p>No disputes.</p>
          ) : (
            <ul className="pending-list">
              {disputes.map((d) => (
                <li key={d._id} className="pending-item">
                  <div className="provider-info">
                    <p><strong>Booking:</strong> {d.booking?._id}</p>
                    <p><strong>Customer:</strong> {d.customer?.name}</p>
                    <p><strong>Provider:</strong> {d.provider?.name}</p>
                    <p><strong>Reason:</strong> {d.reason}</p>
                    <p><strong>Status:</strong> {d.status}</p>
                    <p><strong>Escrow:</strong> {d.booking?.escrowStatus}</p>

                    {/* Provider Replies */}
                    <h4>Provider Responses:</h4>
                    {d.providerResponses.length === 0 ? (
                      <p>No provider replies yet.</p>
                    ) : (
                      d.providerResponses.map((r) => (
                        <p key={r._id}>
                          → {r.message}
                          <span style={{ fontSize: "12px", color: "#777" }}>
                            {" "}
                            ({new Date(r.createdAt).toLocaleString()})
                          </span>
                        </p>
                      ))
                    )}

                    {/* Admin Decision */}
                    {d.adminDecision?.decision !== "Pending" && (
                      <>
                        <h4>Admin Decision:</h4>
                        <p><strong>Decision:</strong> {d.adminDecision.decision}</p>
                        <p><strong>Notes:</strong> {d.adminDecision.notes}</p>
                      </>
                    )}
                  </div>

                  {/* ESCROW BUTTONS */}
                  {d.booking?.escrowStatus === "HELD" && (
                    <div className="action-buttons-container">
                      <button
                        className="approve-btn"
                        onClick={() => releaseEscrow(d.booking._id)}
                      >
                        Release Payment
                      </button>

                      <button
                        className="decline-btn"
                        onClick={() => refundEscrow(d.booking._id)}
                      >
                        Refund Customer
                      </button>
                    </div>
                  )}

                  {/* DISPUTE RESOLUTION (Only if unresolved) */}
                  {d.status !== "Resolved" && (
                    <div className="action-buttons-container">
                      <button
                        className="approve-btn"
                        onClick={() => resolveDispute(d._id, "Refund")}
                      >
                        Resolve for Customer
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() => resolveDispute(d._id, "NoAction")}
                      >
                        Resolve for Provider
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default AdminPage;
