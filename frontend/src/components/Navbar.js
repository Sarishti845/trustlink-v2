
// import React from 'react';
// import { Link } from 'react-router-dom'; // Import the Link component
// import './Navbar.css';

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">TrustLink</Link> {/* Use Link for the logo */}
//         <div className="nav-menu">
//           <Link to="/services" className="nav-item">Browse Services</Link>
//           <Link to="/how-it-works" className="nav-item">How It Works</Link>
//           <Link to="/become-provider" className="nav-item">Become a Provider</Link>
//         </div>
//         <div className="nav-buttons">
//           {/* Use Link styled as a button */}
//           <Link to="/login" className="nav-btn-signin">Sign In</Link>
//           <Link to="/register" className="nav-btn-signup">Sign Up</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }







// // export default Navbar;
// import { FaRegHandshake } from 'react-icons/fa';
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import './Navbar.css';

// function Navbar() {
//   const { userInfo, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   // return (
//   //   <nav className="navbar">
//   //     <div className="navbar-container">
//   //       <Link to="/" className="navbar-logo">TrustLink</Link>

//   //       {/* This div was in the wrong place. It should be here so it's always visible. */}
//   //       <div className="nav-menu">
//   //         <Link to="/services" className="nav-item">Browse Services</Link>
//   //         <Link to="/how-it-works" className="nav-item">How It Works</Link>
//   //         <Link to="/become-provider" className="nav-item">Become a Provider</Link>
//   //       </div>

//   //       <div className="nav-buttons">
//   //         {userInfo ? (
//   //           // If user is logged in
//   //           <>
//   //             <span className="nav-user-name">Welcome, {userInfo.name}</span>
//   //             <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
//   //           </>
//   //         ) : (
//   //           // If user is not logged in
//   //           <>
//   //             <Link to="/login" className="nav-btn-signin">Sign In</Link>
//   //             <Link to="/register" className="nav-btn-signup">Sign Up</Link>
//   //           </>
//   //         )}
//   //       </div>
//   //     </div>
//   //   </nav>
//   // );
//   return (
//   <nav className="navbar">
//     <div className="navbar-container">
//       {/* --- CHANGE IS HERE --- */}
//       <Link to="/" className="navbar-logo">
//         <FaRegHandshake className="logo-icon" /> 
//         TrustLink
//       </Link>
      
//       <div className="nav-menu">
//         <Link to="/services" className="nav-item">Browse Services</Link>
//        <a href="/#how-it-works-section" className="nav-item">How It Works</a>
//         <a href="/#join-provider-section" className="nav-item">Become a Provider</a>
//         <Link to="/help" className="nav-item">Help</Link>
//       </div>

//       <div className="nav-buttons">
//         {userInfo ? (
//           <>
//             <span className="nav-user-name">Welcome, {userInfo.name}</span>
//             <button onClick={handleLogout} className="nav-btn-logout">Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="nav-btn-signin">Sign In</Link>
//             <Link to="/register" className="nav-btn-signup">Sign Up</Link>
//           </>
//         )}
//       </div>
//     </div>
//   </nav>
// );
// }

// export default Navbar;








import { FaRegHandshake } from 'react-icons/fa';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToDashboard = () => {
    if (!userInfo) return;

    if (userInfo.role === "customer") navigate("/user/dashboard");
    if (userInfo.role === "provider") navigate("/provider/dashboard");
    if (userInfo.role === "admin") navigate("/admin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <FaRegHandshake className="logo-icon" />
          TrustLink
        </Link>

        <div className="nav-menu">
          <Link to="/services" className="nav-item">Browse Services</Link>
          <a href="/#how-it-works-section" className="nav-item">How It Works</a>
          <a href="/#join-provider-section" className="nav-item">Become a Provider</a>
          <Link to="/help" className="nav-item">Help</Link>
        </div>

        <div className="nav-buttons">
          
          {userInfo ? (
            <>
              <span className="nav-user-name">Welcome, {userInfo.name}</span>

              {/* NEW DASHBOARD BUTTON */}
              <button onClick={goToDashboard} className="nav-btn-dashboard">
                Dashboard
              </button>

              <button onClick={handleLogout} className="nav-btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn-signin">Sign In</Link>
              <Link to="/register" className="nav-btn-signup">Sign Up</Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
