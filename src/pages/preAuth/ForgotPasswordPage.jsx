import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../components/inputs/TextInput';
import { showToast } from '../../components/Toast';
import { ArrowLeft } from 'lucide-react'; 
import api from '../../api'; // Axios instance for API calls

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = e => {
    setEmail(e.target.value);
    setEmailError(!e.target.value || !/\S+@\S+\.\S+/.test(e.target.value));
  };

  const handleOtpChange = e => setOtp(e.target.value);

  const handleForgotPassword = async e => {
    e.preventDefault();

    if (!email || emailError) {
      showToast('Please provide a valid email', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post('/auth/forgot-password', { email });
      showToast('OTP sent to your email', 'success');
      setOtpSent(true);
    } catch (error) {
      showToast('Error sending OTP. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidateOtp = async e => {
    e.preventDefault();

    if (!otp) {
      showToast('Please provide the OTP sent to your email', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/auth/validate-otp', { email, otp });
      if (response.data.success) {
        showToast('OTP validated successfully! Redirecting to reset password...', 'success');
        navigate('/reset-password'); 
      } else {
        showToast('Invalid or expired OTP. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Error validating OTP. Please try again later.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[91.3vh] py-9 bg-gradient-bg bg-cover bg-no-repeat p-3 flex justify-center items-center">
      <div className="bg-white2 sm:w-max flex flex-col w-full py-8 px-4 rounded-xl shadow-xl">
        <div className="mb-5 flex flex-center items-center">
          <div className='flex self-start'>
            <button
              className="w-max p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className='self-center'>
            <h1 className=" text-2xl font-extrabold text-center">Forgot Password</h1>
          </div>
        </div>

        <form onSubmit={otpSent ? handleValidateOtp : handleForgotPassword}>
          <TextInput
            label="Email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            errorMessage="Please provide a valid email address"
          />
          
          {otpSent && (
            <TextInput
              label="OTP"
              value={otp}
              onChange={handleOtpChange}
              error={!otp}
              errorMessage="Please enter the OTP sent to your email"
            />
          )}

          <button
            type="submit"
            className={`btn bg-nucolor3 w-full mt-5 py-2 px-4 bg-blue-500 text-black rounded-lg ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : otpSent ? 'Validate OTP' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;