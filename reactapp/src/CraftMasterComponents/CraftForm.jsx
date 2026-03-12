import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CraftForm.css';
import axios from 'axios';
import { BASE_URL } from '../apiConfig';
import { jwtDecode } from 'jwt-decode';
import CraftMasterNavbar from '../CraftMasterComponents/CraftMasterNavbar';
import ModalPopup from '../Components/ModalPopup';

const CraftForm = ({ isEdit }) => {
  const [craft, setCraft] = useState({
    name: '',
    category: '',
    materialsRequired: '',
    instructions: '',
    craftImage: '',
  });

  const [errors, setErrors] = useState({});
  const [role, setRole] = useState('');
  const [modalMsg, setModalMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

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

    if (isEdit && id && token) {
      axios.get(`${BASE_URL}/crafts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => setCraft(res.data))
        .catch(() => {
          setModalMsg("Craft not found.");
          setShowModal(true);
        });
    } else {
      setCraft({
        name: '',
        category: '',
        materialsRequired: '',
        instructions: '',
        craftImage: '',
      });
      setErrors({});
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'craftImage' && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCraft({ ...craft, craftImage: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setCraft({ ...craft, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!craft.name.trim()) newErrors.name = 'Name is required';
    if (!craft.category) newErrors.category = 'Category is required';
    if (!craft.materialsRequired.trim()) newErrors.materialsRequired = 'Materials are required';
    if (!craft.instructions.trim()) newErrors.instructions = 'Instructions are required';
    if (!isEdit && !craft.craftImage) newErrors.craftImage = 'Image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (isEdit) {
        await axios.put(`${BASE_URL}/crafts/${id}`, craft, config);
        setModalMsg('Craft updated successfully!');
      } else {
        await axios.post(`${BASE_URL}/crafts`, craft, config);
        setModalMsg('Craft added successfully!');
      }

      setShowModal(true);
    } catch (err) {
      if (err.response && err.response.status === 500) {
        setModalMsg('A craft with the same name already exists.');
      } else {
        setModalMsg('Cannot edit with same category as previous.');
      }
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    if (modalMsg.includes('successfully')) {
      navigate("/view-craft");
    }
  };

  return (
    <div className='page-background'>
      <CraftMasterNavbar />
      <div className="container mt-4">
        <div className="card p-4 shadow form-container">
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <button type='button' className="btn btn-outline-primary btn-sm" onClick={() => navigate(-1)}>Back</button>  
            <h3 className="text-center m-0 flex-grow-1 form-title">{isEdit ? 'Edit Craft' : 'Create New Craft'}</h3>
            <div style={{ width: '60px' }}></div>
          </div>
          
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Name<span className="text-danger">*</span></label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                name="name"
                value={craft.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Category<span className="text-danger">*</span></label>
              <select
                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                name="category"
                value={craft.category}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="Origami">Origami</option>
                <option value="Knitting">Knitting</option>
                <option value="Painting">Painting</option>
                <option value="Woodworking">Woodworking</option>
                <option value="Embroidery">Embroidery</option>
                <option value="Decor">Decor</option>
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Materials Required<span className="text-danger">*</span></label>
              <textarea
                className={`form-control ${errors.materialsRequired ? 'is-invalid' : ''}`}
                name="materialsRequired"
                value={craft.materialsRequired}
                onChange={handleChange}
                rows="2"
              />
              {errors.materialsRequired && <div className="invalid-feedback">{errors.materialsRequired}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Instructions<span className="text-danger">*</span></label>
              <textarea
                className={`form-control ${errors.instructions ? 'is-invalid' : ''}`}
                name="instructions"
                value={craft.instructions}
                onChange={handleChange}
                rows="3"
              />
              {errors.instructions && <div className="invalid-feedback">{errors.instructions}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Craft Image<span className="text-danger">*</span></label>
              <input
                type="file"
                className={`form-control ${errors.craftImage ? 'is-invalid' : ''}`}
                name="craftImage"
                accept="image/*"
                onChange={handleChange}
              />
              {errors.craftImage && <div className="invalid-feedback">{errors.craftImage}</div>}
            </div>

            {craft.craftImage && (
              <div className="mb-3 text-center">
                <img
                  src={craft.craftImage}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ width: '200px', height: 'auto' }}
                />
              </div>
            )}

            <div className="text-center">
              <button type="submit" className="btn btn-primary px-5 add-btn">
                {isEdit ? 'Update Craft' : 'Add Craft'}
              </button>
            </div>
          </form>
        </div>

        {showModal && (
          <ModalPopup message={modalMsg} onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default CraftForm;