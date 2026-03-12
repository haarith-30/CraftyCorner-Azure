import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CraftMasterNavbar.css';

const CraftMasterNavbar = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const nameClaim = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        setUsername(`${payload[nameClaim]}   /   CraftMaster`);
      } catch {
        setUsername('CraftMaster');
      }
    }
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    setShowModal(false);
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand brand-name" to="/home">Crafty Corner</Link>
          <div className="text-center flex-grow-1">
            <span className="badge bg-light text-dark fs-6 px-3 py-2">{username}</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link className="nav-link text-white" to="/home">Home</Link>
            <div className="nav-item dropdown">
              <span className="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown">
                Craft
              </span>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/view-craft">View Crafts</Link></li>
                <li><Link className="dropdown-item" to="/add-craft">Add Craft</Link></li>
              </ul>
            </div>
            <button className="btn btn-outline-light" onClick={() => setShowModal(true)}>Logout</button>
          </div>
        </div>
      </nav>

      {showModal && (
        <>
          <div className="custom-modal-overlay"></div>
          <div className="custom-modal">
            <div className="custom-modal-header"><h5>Confirm Logout</h5></div>
            <div className="custom-modal-body"><p>Are you sure you want to logout?</p></div>
            <div className="custom-modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>No</button>
              <button className="btn btn-danger" onClick={handleLogoutConfirm}>Yes, Logout</button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CraftMasterNavbar;