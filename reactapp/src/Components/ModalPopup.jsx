import React from 'react';
import './ModalPopup.css';

const ModalPopup = ({ message, onClose }) => {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-box">
        <p className="modal-message">{message}</p>
        <button onClick={onClose} className="btn btn-primary modal-btn">OK</button>
      </div>
    </div>
  );
};

export default ModalPopup;