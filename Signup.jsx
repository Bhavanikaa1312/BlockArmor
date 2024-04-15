import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/signup', { firstName, lastName, email, password });
      localStorage.setItem('token', response.data.token);
      
      // Redirect to input page upon successful signup
      window.location.href = '/home';
    } catch (error) {
      if (error.response.status === 409 && error.response.data.includes('duplicate key error')) {
        // User with the same email already exists
        setErrorMessage('User with this email already exists.');
      } else {
        // Other errors
        setErrorMessage('User with this email already exists.'); // Set error message for other errors
        console.error('Signup failed:', error.response.data);
      }
    }
  };

  return (
    <div className="cover">
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMessage && (
      <div className="error-msg">
        <span>{errorMessage}<button className="close-btn" onClick={() => setErrorMessage('')}>X</button></span>
      </div>
    )}
        <button className="b" type="submit">Sign Up</button>
        <div className="signup-link">
      <span>Already have an account?</span>
      <Link to="/">Login</Link>
    </div>
      </form>
    </div>
    {/* Display error message directly in UI */}
  
   
  </div>
  
  );
}

export default Signup;
