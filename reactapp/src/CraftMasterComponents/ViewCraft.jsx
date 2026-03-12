import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { jwtDecode } from 'jwt-decode';
import CraftMasterNavbar from '../CraftMasterComponents/CraftMasterNavbar';
import ModalPopup from '../Components/ModalPopup';
import './ViewCraft.css';

const ViewCraft = () => {
  const [crafts, setCrafts] = useState([]);
  const [role, setRole] = useState('');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteCraftId, setDeleteCraftId] = useState(null);

  useEffect(() => {
    const updated = localStorage.getItem('craftUpdated');
    if (updated === 'true') {
      setShowUpdateModal(true);
      localStorage.removeItem('craftUpdated');
    }

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setRole(userRole);
      } catch (err) {
        console.error('Token decode failed:', err);
      }
    }

    fetchCrafts();
  }, []);

  const fetchCrafts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/crafts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCrafts(response.data);
    } catch (err) {
      console.error("Failed to fetch crafts:", err);
    }
  };

  const confirmDelete = (id) => {
    setDeleteCraftId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${BASE_URL}/crafts/${deleteCraftId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCrafts(crafts.filter(craft => craft.craftId !== deleteCraftId));
      setShowDeleteConfirm(false);
      setDeleteCraftId(null);
    } catch (err) {
      console.error("Failed to delete craft:", err);
    }
  };

  return (
    <div>
      <CraftMasterNavbar />
      <div className="image-container">
        <div className="viewcraft-container container mt-4">
          <div className="craft-box card p-3 shadow-sm">
            <h3 className="text-center mb-4">Crafts</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle text-center">
                <thead className="table-primary">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Materials Required</th>
                    <th>Instructions</th>
                    {role === 'CraftMaster' && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {crafts.length > 0 ? (
                    crafts.map((craft) => (
                      <tr key={craft.craftId}>
                        <td>
                          <img src={craft.craftImage} alt={craft.name} className="craft-img rounded" />
                        </td>
                        <td>{craft.name}</td>
                        <td>{craft.category}</td>
                        <td>{craft.materialsRequired}</td>
                        <td>{craft.instructions}</td>
                        {role === 'CraftMaster' && (
                          <td>
                            <div className="action-buttons">
                              <Link to={`/edit-craft/${craft.craftId}`} className="btn btn-primary edit-button">
                                Edit
                              </Link>
                              <button
                                className="btn btn-danger delete-button ms-2"
                                onClick={() => confirmDelete(craft.craftId)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={role === 'CraftMaster' ? 6 : 5}>No crafts found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <ModalPopup
          message="Craft updated successfully!"
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-box">
            <p className="modal-message">Are you sure you want to delete this craft?</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <button className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCraft;