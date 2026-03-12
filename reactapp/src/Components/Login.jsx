import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { jwtDecode } from 'jwt-decode';
import ModalPopup from './ModalPopup';
import CraftMasterNavbar from '../CraftMasterComponents/CraftMasterNavbar';
import CraftSeekerNavbar from '../CraftSeekerComponents/CraftSeekerNavbar';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);
      const token = response.data?.item2?.token;

      if (!token || token.split('.').length !== 3) {
        setModalMessage("Invalid token received");
        return;
      }

      localStorage.setItem("token", token);
      navigate('/home');

    } catch (error) {
      console.error("Login failed:", error);
      setModalMessage("Login failed. Please check your credentials.");
    }
  };

  return (
   
    <div className="login-page">
      {role === 'CraftMaster' && <CraftMasterNavbar />}
      {role === 'CraftSeeker' && <CraftSeekerNavbar />}

      <div className="login-container">
        <div className="login-left">
          <h2 className="crafty">Crafty Corner</h2>
          <p>
            Unleash your creativity with personalized craft ideas! Discover exciting DIY projects tailored to your interests, from knitting to woodworking.
          </p>
        </div>
        <div className="login-form-section">
          <h2 className="login-heading">Login</h2>
          <form onSubmit={handleLogin} noValidate>
            <div className="mb-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
  
            <button type="submit" className="btn btn-primary w-100 login-btn">Login</button>
            <p className="mt-3 text-center">Don't have an account? <a href="/signup">Sign up</a></p>
          </form>
        </div>
      </div>

      {modalMessage && (
        <ModalPopup
          message={modalMessage}
          onClose={() => setModalMessage('')}
        />
      )}
    </div>
   
  );
};

export default Login;