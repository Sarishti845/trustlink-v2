import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './RegisterPage.css';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
       
      // Send the form data to your backend's register endpoint
      const { data } = await axios.post('http://127.0.0.1:5000/api/users/register', {
        name,
        email,
        password,
      });

      console.log('User registered successfully:', data);
      alert('Registration successful!');
      
    } catch (error) {
      // Display a more specific error message from the backend if it exists
      const message = error.response && error.response.data.message
        ? error.response.data.message
        : 'Registration failed. Please try again.';
      console.error('Registration error:', message);
      alert(message);
    }
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Create an Account</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;