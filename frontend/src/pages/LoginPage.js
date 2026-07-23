import { API_BASE_URL } from '../config';
// import React, { useState, useContext } from 'react'; // 1. Import useContext
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext'; // 2. Import AuthContext
// import './RegisterPage.css';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext); // 3. Get the login function from context

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });

//       login(data); // 4. Call the context login function with user data

//       alert('Login successful!');
//       navigate('/'); // Redirect to homepage
//     } catch (error) {
//       // ... (error handling remains the same)
//       const message = error.response?.data?.message || 'Invalid email or password.';
//       alert(message);
//     }
//   };


// //   const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   try {
// //     const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });

// //     // ✅ Save token to localStorage so other components (like ReviewSection) can access it
// //     if (data.token) {
// //       localStorage.setItem("token", data.token);
// //     }

// //     login(data); // keep context logic
// //     alert('Login successful!');
// //     navigate('/');
// //   } catch (error) {
// //     const message = error.response?.data?.message || 'Invalid email or password.';
// //     alert(message);
// //   }
// // };


//   // ... (the return statement with the form remains the same)
//   return (
//     <div className="form-container">
//       <form className="register-form" onSubmit={handleSubmit}>
//         <h1>Sign In</h1>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit" className="submit-btn">Sign In</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;









import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './RegisterPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        { email, password }
      );

      login(data);   // save user in context/localStorage

      alert("Login successful!");

      // ❗ Stay on homepage after login
      navigate("/");
      
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid email or password.";
      alert(message);
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Sign In</h1>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;
