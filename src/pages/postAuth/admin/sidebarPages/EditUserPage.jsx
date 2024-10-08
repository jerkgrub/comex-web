import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../../../api'; // Adjust the path as needed
import { ArrowLeft } from 'lucide-react';
import LoadingPage from '../../../LoadingPage';
import { showToast } from '../../../../components/Toast';

// Import validation and input components
import UseFormValidation from '../../../../components/hooks/UseFormValidation'; // Adjust the path
import TextInput from '../../../../components/inputs/TextInput';
import SelectInput from '../../../../components/inputs/SelectInput';
import DepartmentOptions from '../../../../components/inputs/DepartmentOptions';
import UserTypeOptions from '../../../../components/inputs/UserTypeOptions';

const EditUserPage = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  // State variables for form fields
  const [avatar, setAvatar] = useState(''); // Added avatar state
  const [usertype, setUsertype] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const [dateHired, setDateHired] = useState('');
  const [isIdDisabled, setIsIdDisabled] = useState(true);
  const [isDateHiredDisabled, setIsDateHiredDisabled] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Import form validation hook
  const { errors, validateField, validateForm } = UseFormValidation();

  useEffect(() => {
    api
      .get(`/users/${userid}`) // Fetch user data
      .then(response => {
        if (response.data && response.data.User) {
          const userData = response.data.User;
          setAvatar(userData.avatar || ''); // Set avatar state
          setUsertype(userData.usertype || '');
          setFirstName(userData.firstName || '');
          setMiddleName(userData.middleName || '');
          setLastName(userData.lastName || '');
          setIdNumber(userData.idNumber || '');
          setMobileNumber(userData.mobileNumber || userData.mobile || '');
          setDepartment(userData.department || '');
          setEmail(userData.email || '');
          setIsActivated(userData.isActivated || false);
          setDateHired(userData.dateHired || '');

          // Set the fields' disabled state based on usertype
          if (userData.usertype === 'Student') {
            setIsIdDisabled(false);
            setIsDateHiredDisabled(true);
          } else {
            setIsIdDisabled(true);
            setIsDateHiredDisabled(false);
          }
        } else {
          setError('User data not found');
        }
      })
      .catch(error => {
        setError('Failed to fetch user data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userid]);

  // Effect to handle enabling/disabling fields based on usertype
  useEffect(() => {
    if (!usertype) {
      // If no usertype is selected, disable both fields
      setIsIdDisabled(true);
      setIsDateHiredDisabled(true);
    } else if (usertype === 'Student') {
      // Enable ID Number and disable Date Hired for students
      setIsIdDisabled(false);
      setIsDateHiredDisabled(true);
      setDateHired(''); // Clear dateHired when disabled
    } else {
      // Disable ID Number and enable Date Hired for others
      setIsIdDisabled(true);
      setIsDateHiredDisabled(false);
      setIdNumber(''); // Clear idNumber when disabled
    }
  }, [usertype]);

  const handleSaveChanges = () => {
    const fields = {
      avatar, // Added avatar field here
      usertype,
      firstName,
      middleName,
      lastName,
      idNumber,
      mobileNumber,
      department,
      email,
      dateHired
    };

    const disabledFields = {
      idNumber: isIdDisabled,
      dateHired: isDateHiredDisabled
    };

    if (validateForm(fields, disabledFields)) {
      // Map mobileNumber to mobile if backend expects 'mobile'
      const updatedUser = {
        avatar,
        usertype,
        firstName,
        middleName,
        lastName,
        idNumber,
        mobile: mobileNumber, // Adjusted field name
        department,
        email,
        isActivated,
        dateHired
      };

      console.log('Updated User Data:', updatedUser); // For debugging

      api
        .put(`/users/update/${userid}`, updatedUser)
        .then(() => {
          showToast('success', 'Changes saved!');
          navigate(`/admin/users/${userid}`);
        })
        .catch(() => {
          setError('Failed to update user data');
        });
    } else {
      showToast('error', 'Please correct the errors in the form.');
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 min-h-screen">
      {/* Top Section: Back Button on left, Save Changes on right */}
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

      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Edit User</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-lg shadow-lg">
        {/* Avatar and User Type */}
        <div className="flex flex-col items-center border-r border-gray-200 pr-6">
          <img
            src={avatar || '/default-avatar.png'} // Use avatar from user data or fallback to a default avatar
            alt="User Avatar"
            className="h-48 w-48 rounded-full border-4 border-gray-300 shadow-md mb-4"
          />
          <SelectInput
            label="Usertype"
            value={usertype}
            onChange={e => {
              setUsertype(e.target.value);
              validateField('usertype', e.target.value);
            }}
            options={UserTypeOptions()}
            error={!!errors.usertype}
            errorMessage={errors.usertype}
          />
        </div>

        {/* User Form */}
        <div className="col-span-2">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <TextInput
                label="First Name"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                  validateField('firstName', e.target.value);
                }}
                error={!!errors.firstName}
                errorMessage={errors.firstName}
              />
              <TextInput
                label="Middle Name"
                value={middleName}
                onChange={e => {
                  setMiddleName(e.target.value);
                  validateField('middleName', e.target.value);
                }}
                error={!!errors.middleName}
                errorMessage={errors.middleName}
              />
              <TextInput
                label="Last Name"
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                  validateField('lastName', e.target.value);
                }}
                error={!!errors.lastName}
                errorMessage={errors.lastName}
              />
            </div>
            <div>
              <TextInput
                label="ID Number"
                value={idNumber}
                disabled={isIdDisabled}
                onChange={e => {
                  setIdNumber(e.target.value);
                  validateField('idNumber', e.target.value, {}, isIdDisabled);
                }}
                error={!!errors.idNumber && !isIdDisabled}
                errorMessage={errors.idNumber}
              />
              <TextInput
                label="Mobile Number"
                value={mobileNumber}
                onChange={e => {
                  setMobileNumber(e.target.value);
                  validateField('mobileNumber', e.target.value);
                }}
                error={!!errors.mobileNumber}
                errorMessage={errors.mobileNumber}
              />
              <SelectInput
                label="Department"
                value={department}
                onChange={e => {
                  setDepartment(e.target.value);
                  validateField('department', e.target.value);
                }}
                options={DepartmentOptions()}
                error={!!errors.department}
                errorMessage={errors.department}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">
            <TextInput
              label="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                validateField('email', e.target.value);
              }}
              error={!!errors.email}
              errorMessage={errors.email}
            />

            {/* Date Hired */}
            <div className="mb-4">
              <label className="mb-1 pl-1 font-semibold">Date Hired</label>
              <input
                type="date"
                value={dateHired || ''}
                disabled={isDateHiredDisabled}
                onChange={e => {
                  setDateHired(e.target.value);
                  validateField('dateHired', e.target.value, {}, isDateHiredDisabled);
                }}
                className={`input input-bordered w-full ${
                  errors.dateHired && !isDateHiredDisabled ? 'border-red-500' : ''
                }`}
              />
              {errors.dateHired && !isDateHiredDisabled && (
                <p className="pl-1 text-red-500 text-sm mt-1">* {errors.dateHired}</p>
              )}
            </div>

            {/* Account Activation */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                name="isActivated"
                checked={isActivated}
                onChange={e => setIsActivated(e.target.checked)}
              />
              <span>Account Activated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;