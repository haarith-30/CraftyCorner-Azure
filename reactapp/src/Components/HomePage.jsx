import React from 'react';
import {jwtDecode} from 'jwt-decode';
import CraftMasterNavbar from '../CraftMasterComponents/CraftMasterNavbar';
import CraftSeekerNavbar from '../CraftSeekerComponents/CraftSeekerNavbar';
import './HomePage.css';

function HomePage() {
  const token = localStorage.getItem('token');
  let role = '';

  if (token && token.split('.').length === 3) {
    try {
      const decoded = jwtDecode(token);
      role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch (err) {
      console.error("Token decode failed:", err);
    }
  }

  return (
    <div>
      {role === 'CraftMaster' && <CraftMasterNavbar />}
      {role === 'CraftSeeker' && <CraftSeekerNavbar />}

      
    <div className='homepage-wrapper'>  
      <div className="homepage-container">
        <div className="overlay-card">
          <h1 className="title">Welcome to Crafty Corner!</h1>
          <p className="description">
            Unleash your creativity with personalized craft ideas! Discover exciting DIY projects tailored to your interests, from knitting to woodworking. Gather materials and follow easy-to-understand instructions. Perfect for both novice and expert crafters!
          </p>
        </div>
      </div>
      <footer className="text-center mt-4">
        Contact Us: <a href="mailto:support@craftycorner.com">support@craftycorner.com</a><br />
        © 2025 Crafty Corner. All rights reserved.
      </footer>
      </div>
    </div>
  );
}

export default HomePage;