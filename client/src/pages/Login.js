// client/src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', formData);
      alert('✅ Login successful!');
      console.log(res.data);

      // Optional: Save token in localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Navigate to Chat Page
      navigate('/chat');
    } catch (err) {
      console.error(err);
      setError('❌ Login failed. Please check your email and password.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <br />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
