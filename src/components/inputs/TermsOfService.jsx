import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';

const TermsOfService = ({ isChecked, handleCheckboxChange }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleAccept = () => {
    handleCheckboxChange(true); // Set isChecked to true in parent component
    setOpenModal(false);
  };

  const handleDecline = () => {
    handleCheckboxChange(false); // Set isChecked to false in parent component
    setOpenModal(false);
  };

  return (
    <div className="form-control mt-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="checkbox mr-2"
          checked={isChecked}
          onChange={(e) => handleCheckboxChange(e.target.checked)}
        />
        <div>
          <h2>
            By clicking Register, you are agreeing to Comex Connect's{' '}
            <span
              onClick={() => setOpenModal(true)}
              className="text-nucolor6 cursor-pointer underline"
            >
              Terms of Service
            </span>
            .
            <br />
          </h2>
        </div>
      </div>

      {/* Modal for Terms of Service */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Welcome to Comex Connect! By using our services, you agree to comply with our Terms of Service.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Welcome to COMEX CONNECT, a web application developed to assist and manage the activities and needs of the NU MoA Comex Brigade, an organization that partners with communities to help other communities. By using our services, you agree to comply with and be bound by the following terms and conditions.

Please read the Terms of Service carefully. If you do not agree to these terms, please refrain from using COMEX CONNECT.
            </p>
            {/* Add more sections as needed */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" onClick={handleAccept}>I accept</Button>
          <Button color="gray" onClick={handleDecline}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TermsOfService;
