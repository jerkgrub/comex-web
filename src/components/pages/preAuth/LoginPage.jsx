import React, { useContext, useState } from "react";
import './LoginPage.css';

import email_icon from '../../images/email.png';
import password_icon from '../../images/password.png';
import logo from '../../images/logo.png';

import { FiEye, FiEyeOff } from 'react-icons/fi';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

const LoginPage = () => {

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // login data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [usertype, setUsertype ] = useState('Client');

  // functions
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const login_btn = () => {
    Swal.fire({
      title: 'Logging in...',
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    }).then((result) => {
      axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password,
        usertype: usertype.toLowerCase()
      })
      .then((response) => {
        if(response.data.message === "Successfully logged in as admin") {
          Swal.fire({
            icon: 'success',
            title: 'Logged in as admin!',
            showConfirmButton: false,
            timer: 1500,
          });
          setUser({ email: email }); //set here
          navigate('/admin/dashboard');
        } else if(response.data.message === "Successfully logged in as client") {
          Swal.fire({
            icon: 'success',
            title: 'Logged in as client!',
            showConfirmButton: false,
            timer: 1500,
          });
          setUser({ email: email }); //set here
          navigate('/client/home');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid login attempt',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
    });
  };

  return (
    <div className='bg'>
    <div className='glue'>

      <div className='logo-container'>
        <div className="flex items-center"> 
        <div><img src={logo} alt="Logo" className="logo"/></div>
        <p className="title">
            COMEX CONNECT
          </p>
        </div>
      </div>

      <div className='container w-max px-8'>

      {/* header shiz */}
      <div className='header'>
        <div className='text'>Sign In</div>
        <div className='underline'></div>
      </div>

      {/* inputs */}
      <div className='inputs'>

        {/* email input */}
        <p className="labelz">E-mail</p>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input type='text'
          onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>

        {/* password input */}
        <p className="labelz">Password</p>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input type={showPassword ? 'text' : 'password'}
          onChange={(e)=>{setPassword(e.target.value)}}/>
          {showPassword ? <FiEye onClick={toggleShowPassword} /> : <FiEyeOff onClick={toggleShowPassword} />}
        </div>

      </div>

      <div className='submit-container'>
        <div className='submit' onClick={login_btn}>
          SIGN IN
        </div>
      </div>

    </div>  
    </div>
    </div>
  );
}

export default LoginPage;