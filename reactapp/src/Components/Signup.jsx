import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import ModalPopup from './ModalPopup';
import './Signup.css';
import { jwtDecode } from 'jwt-decode';
import CraftMasterNavbar from '../CraftMasterComponents/CraftMasterNavbar';
import CraftSeekerNavbar from '../CraftSeekerComponents/CraftSeekerNavbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    mobileNumber: '',
    userRole: 'CraftSeeker'
  });

  const [errors, setErrors] = useState({});
  const [modalMessage, setModalMessage] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = jwtDecode(token);
        const userRole = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setRole(userRole);
      } catch {
        setRole('');
      }
    }
  }, []);

  const validate = () => {
    const newErrors = {};
  
    if (!formData.username.trim()) newErrors.username = "User Name is required";
  
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
  
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number format";
    }
  
    if (!formData.password) {
      newErrors.password = "Password is required";
    } 
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(formData.password)){
      newErrors.password = "Password must be at least 6 characters and include uppercase, lowercase, number, and symbol";
    }
    
  
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSignup = async e => {
    e.preventDefault();
    if (!validate()) return;

    const { confirmPassword, ...dataToSend } = formData;

    try {
      await axios.post(`${BASE_URL}/register`, dataToSend);
      setModalMessage("Signup successful. Please login.");
    } catch (err) {
      console.error("Signup failed:", err);
      setModalMessage("Signup failed. Please check your details.");
    }
  };

  return (
    <div className="signup-container">
      {role === 'CraftMaster' && <CraftMasterNavbar />}
      {role === 'CraftSeeker' && <CraftSeekerNavbar />}

      <div className="signup-card">
        <h3 className="text-center mb-3 text-white">Signup</h3>
        <form onSubmit={handleSignup} className="signup-form">
          <label>User Name<span className="required-star">*</span></label>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <small className="text-danger">{errors.username}</small>}

          <label>Email<span className="required-star">*</span></label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}

          <label>Mobile Number<span className="required-star">*</span></label>
          <input
            className="form-control"
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            placeholder="Enter 10 digit Mobile Number"
            onChange={handleChange}
          />
          {errors.mobileNumber && <small className="text-danger">{errors.mobileNumber}</small>}

          <label>Password<span className="required-star">*</span></label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}

          <label>Confirm Password<span className="required-star">*</span></label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}

          <label>Role<span className="required-star">*</span></label>
          <select
            className="form-control mb-3"
            name="userRole"
            value={formData.userRole}
            onChange={handleChange}
            required
          >
            <option value="CraftSeeker">Craft Seeker</option>
            <option value="CraftMaster">Craft Master</option>
          </select>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
          <p className="text-center mt-2 mb-0">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>

      {modalMessage && (
        <ModalPopup
          message={modalMessage}
          onClose={() => {
            setModalMessage('');
            if (modalMessage.includes("successful")) navigate('/login');
          }}
        />
      )}
    </div>
  );
};

export default Signup;