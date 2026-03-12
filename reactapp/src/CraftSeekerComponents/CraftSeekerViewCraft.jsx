import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { jwtDecode } from 'jwt-decode';
import CraftSeekerNavbar from '../CraftSeekerComponents/CraftSeekerNavbar';
import './CraftSeekerViewCraft.css';

const CraftSeekerViewCraft = () => {
  const [crafts, setCrafts] = useState([]);
  const [filteredCrafts, setFilteredCrafts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      } catch (err) {
        console.error('Failed to decode token:', err);
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
      setFilteredCrafts(response.data);
    } catch (error) {
      console.error('Failed to fetch crafts:', error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = crafts.filter(
      craft =>
        craft.name.toLowerCase().includes(value) ||
        craft.category.toLowerCase().includes(value)
    );
    setFilteredCrafts(filtered);
  };

  return (
    <div>
      <CraftSeekerNavbar />
      <div className="viewcraft-container">
        <div className="craft-box">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Available Crafts</h3>
            <input
              type="text"
              placeholder="Search by Name or Category"
              className="form-control w-50"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Materials Required</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrafts.length > 0 ? (
                  filteredCrafts.map((craft) => (
                    <tr key={craft.craftId}>
                      <td>
                        <img
                          src={craft.craftImage}
                          alt={craft.name}
                          className="craft-img rounded"
                        />
                      </td>
                      <td>{craft.name}</td>
                      <td>{craft.category}</td>
                      <td>{craft.materialsRequired}</td>
                      <td>{craft.instructions}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No crafts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CraftSeekerViewCraft;