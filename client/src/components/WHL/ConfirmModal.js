// ConfirmModal.js
import React from 'react';

function ConfirmModal({ isOpen, onClose, onConfirm, noHistory, page }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {
            noHistory?
            <><h2>Oops..!</h2>
            <p>You don't have any {page}!</p></>
            
        :<><h2>Are you sure?</h2>
        <p>Do you really want to clear your {page}?</p></>
        }
        <div className="modal-buttons">
        {
            noHistory?
            <button className="confirm-button" onClick={onConfirm}>Go to Home</button>
            :
            <button className="confirm-button" onClick={onConfirm}>Yes, Clear History</button>
        }
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
