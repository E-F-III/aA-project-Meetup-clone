import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button style={{backgroundColor:"white", border:"none", textDecoration:"none", fontSize:"15px"}} onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal className="w450px" onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
