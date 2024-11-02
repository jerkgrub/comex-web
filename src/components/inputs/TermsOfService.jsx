import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

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
            By clicking Register, you are agreeing to Comex Connect's{" "}
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
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-justify">
              Welcome to COMEX CONNECT, a web application developed to assist
              and manage the activities and needs of the NU MoA Comex Brigade,
              an organization that partners with communities to help other
              communities. By using our services, you agree to comply with and
              be bound by the following terms and conditions.
            </p>

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-justify">
              <strong>Data Privacy and Protection</strong>
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 text-justify">
              We value your privacy and are committed to protecting your
              personal data. This section outlines how we collect, use, and
              safeguard your information:
            </p>
            <ul className="list-disc ml-6 text-base leading-relaxed text-gray-500 dark:text-gray-400 text-justify">
              <li>
                <strong>Data Collection</strong>: We may collect personal data
                such as your name, email address, contact details, and any
                information necessary for user registration, activity
                participation, and communication within the platform.
              </li>
              <li>
                <strong>Purpose of Data Use</strong>: Your data is used to
                manage user accounts, facilitate event participation, improve
                user experience, and provide support for activities conducted
                through COMEX CONNECT.
              </li>
              <li>
                <strong>Data Sharing</strong>: We do not sell, rent, or share
                your personal data with third parties without your consent,
                except where required by law or necessary for service provision.
              </li>
              <li>
                <strong>Data Security</strong>: We implement robust security
                measures to protect your data from unauthorized access,
                alteration, disclosure, or destruction.
              </li>
              <li>
                <strong>User Rights</strong>: You have the right to access,
                correct, or request the deletion of your personal data. To
                exercise these rights, please contact our support team.
              </li>
              <li>
                <strong>Consent</strong>: By using COMEX CONNECT, you consent to
                the collection and use of your personal information as outlined
                in this policy.
              </li>
            </ul>
            <p className="text-justify italic text-nucolor3">
              Please read the Terms of Service carefully. If you do not agree to
              these terms, please refrain from using COMEX CONNECT.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="dark" onClick={handleAccept}>
            I accept
          </Button>
          <Button color="gray" onClick={handleDecline}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TermsOfService;
