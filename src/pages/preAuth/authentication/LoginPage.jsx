import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/inputs/TextInput";
import PasswordInput from "../../../components/inputs/PasswordInput";
import { useContext, useState } from "react";
import Alternate from "../../../components/inputs/Alternate";
import RememberMe from "../../../components/inputs/RememberMe";
import ForgotPassword from "../../../components/inputs/ForgotPassword";
import LoginButton from "../../../components/LoginButton";
import { UserContext } from "../../../components/UserContext";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(!e.target.value);
  };

  return (
    <div className="py-9 bg-gradient-bg bg-cover bg-no-repeat p-3 flex justify-center items-center">
      <div className="bg-white2 sm:w-max flex flex-col w-full py-8 px-4 rounded-xl shadow-xl">
        <h1 className="text-2xl font-extrabold text-center mb-5">Log in</h1>

        {/* Email and Password Inputs */}
        <TextInput
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          errorMessage="Email is required"
        />
        <PasswordInput
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          errorMessage="Password is required"
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex flex-row justify-between gap-16 mx-1 -mt-6 mb-7">
          <RememberMe />
          <ForgotPassword />
        </div>

        {/* Login Button */}
        <LoginButton email={email} password={password} setUser={setUser} />

        {/* Register Link */}
        <div className="flex justify-center">
          <Alternate
            labelText="Don't have an account?"
            linkTo="/register"
            linkText="Register"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;