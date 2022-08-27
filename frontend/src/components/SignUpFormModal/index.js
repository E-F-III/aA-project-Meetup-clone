import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import SignupFormPage from '../SignupForm'

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button style={{backgroundColor:"white", border:"none", textDecoration:"none", fontSize:"15px"}} onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal className="w450px" onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
