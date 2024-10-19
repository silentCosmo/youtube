import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message, preview }) => {
  if (!isOpen) return null; // Do not render the modal if it's not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Are you sure?</h2>
        <p>{message}</p>
        {preview}
        <div className="modal-buttons">
          <button className="modal-confirm-btn" onClick={onConfirm}>Confirm</button>
          <button className="modal-cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
