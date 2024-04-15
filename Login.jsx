import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      localStorage.setItem('token', response.data.token);
      // Redirect to input page upon successful login
      window.location.href = '/home';
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized - Invalid email or password
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        // Other errors
        console.error('Login failed:', error);
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="cover">
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="signup-link">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
