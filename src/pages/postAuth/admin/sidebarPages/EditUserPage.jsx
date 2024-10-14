// EditUserPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../../../../api'; // Adjust the path as needed
import LoadingPage from '../../../LoadingPage';
import { showToast } from '../../../../components/Toast';
import EditValidationForms from '../../../../components/forms/EditValidationForms';

// Import validation and form components
import UseFormValidation from '../../../../components/hooks/UseFormValidation'; // Adjust the path

const EditUserPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  // State variables for form fields
  const [formData, setFormData] = useState({
    avatar: '',
    usertype: '',
    firstName: '',
    middleName: '',
    lastName: '',
    idNumber: '',
    mobileNumber: '',
    department: '',
    email: '',
    isActivated: false,
    dateHired: '',
  });

  const [disabledFields, setDisabledFields] = useState({
    isIdDisabled: true,
    isDateHiredDisabled: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for avatar upload
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [isAvatarSaving, setIsAvatarSaving] = useState(false);

  // Import form validation hook
  const { errors, validateField, validateForm } = UseFormValidation();

  // Fetch user data on mount
  useEffect(() => {
    api
      .get(`/users/${userid}`)
      .then(response => {
        if (response.data?.User) {
          const userData = response.data.User;
          setFormData({
            avatar: userData.avatar || '',
            usertype: userData.usertype || '',
            firstName: userData.firstName || '',
            middleName: userData.middleName || '',
            lastName: userData.lastName || '',
            idNumber: userData.idNumber || '',
            mobileNumber: userData.mobileNumber || userData.mobile || '',
            department: userData.department || '',
            email: userData.email || '',
            isActivated: userData.isActivated || false,
            dateHired: userData.dateHired || '',
          });

          // Set disabled fields based on usertype
          if (userData.usertype === 'Student') {
            setDisabledFields({ isIdDisabled: false, isDateHiredDisabled: true });
          } else {
            setDisabledFields({ isIdDisabled: true, isDateHiredDisabled: false });
          }
        } else {
          setError('User data not found');
        }
      })
      .catch(() => setError('Failed to fetch user data'))
      .finally(() => setLoading(false));
  }, [userid]);

  // Handle avatar file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatarFile(file);
    }
  };

  // Handle saving the avatar
  const handleSaveAvatar = () => {
    if (selectedAvatarFile) {
      setIsAvatarSaving(true);
      const formDataAvatar = new FormData();
      formDataAvatar.append('avatar', selectedAvatarFile);

      api.put(`/users/upload-avatar/${userid}`, formDataAvatar, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then(response => {
          if (response.data?.avatarUrl) {
            setFormData(prev => ({ ...prev, avatar: response.data.avatarUrl }));
            showToast('success', 'Avatar updated successfully');
            setSelectedAvatarFile(null); // Clear the selected file
          } else {
            showToast('error', 'Failed to get updated avatar URL');
          }
        })
        .catch(() => showToast('error', 'Failed to upload avatar'))
        .finally(() => {
          setIsAvatarSaving(false);
        });
    }
  };

  // Handle usertype changes to enable/disable fields
  useEffect(() => {
    const { usertype } = formData;
    if (!usertype) {
      setDisabledFields({ isIdDisabled: true, isDateHiredDisabled: true });
    } else if (usertype === 'Student') {
      setDisabledFields({ isIdDisabled: false, isDateHiredDisabled: true });
      setFormData(prev => ({ ...prev, dateHired: '' }));
    } else {
      setDisabledFields({ isIdDisabled: true, isDateHiredDisabled: false });
      setFormData(prev => ({ ...prev, idNumber: '' }));
    }
  }, [formData.usertype]);

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(
      field,
      value,
      {},
      disabledFields[`is${field.charAt(0).toUpperCase() + field.slice(1)}Disabled`]
    );
  };

  // Save changes handler
  const handleSaveChanges = () => {
    const fieldsToValidate = { ...formData };
    const fieldsDisabled = {
      idNumber: disabledFields.isIdDisabled,
      dateHired: disabledFields.isDateHiredDisabled,
    };

    if (validateForm(fieldsToValidate, fieldsDisabled)) {
      const updatedUser = {
        ...formData,
        mobile: formData.mobileNumber, // Adjust field name for backend
        dateHired: !disabledFields.isDateHiredDisabled ? formData.dateHired : '', // Ensure dateHired is passed correctly
      };

      api.put(`/users/update/${userid}`, updatedUser)
        .then(() => {
          showToast('success', 'Changes saved!');
          navigate(`/admin/users/${userid}`);
        })
        .catch(() => setError('Failed to update user data'));
    } else {
      showToast('error', 'Please correct the errors in the form.');
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 min-h-screen">
      {/* Top Section: Back Button and Save Changes */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(`/admin/users`)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={handleSaveChanges}
          className="btn px-4 py-2 bg-nucolor3 text-black rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>

      {/* Form Component */}
      <EditValidationForms
        {...formData}
        handleAvatarChange={handleAvatarChange}
        handleSaveAvatar={handleSaveAvatar}
        selectedAvatarFile={selectedAvatarFile}
        isAvatarSaving={isAvatarSaving}
        setUsertype={(value) => handleChange('usertype', value)}
        setFirstName={(value) => handleChange('firstName', value)}
        setMiddleName={(value) => handleChange('middleName', value)}
        setLastName={(value) => handleChange('lastName', value)}
        setIdNumber={(value) => handleChange('idNumber', value)}
        setMobileNumber={(value) => handleChange('mobileNumber', value)}
        setDepartment={(value) => handleChange('department', value)}
        setEmail={(value) => handleChange('email', value)}
        setDateHired={(value) => handleChange('dateHired', value)}
        setIsActivated={(value) => setFormData(prev => ({ ...prev, isActivated: value }))}
        isIdDisabled={disabledFields.isIdDisabled}
        isDateHiredDisabled={disabledFields.isDateHiredDisabled}
        errors={errors}
        validateField={validateField}
      />
    </div>
  );
};

export default EditUserPage;