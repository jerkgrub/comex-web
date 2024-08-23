import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function postAuthRedirect(WrappedComponent) {
  return function(props) {
    const navigate = useNavigate();

    useEffect(() => {
      // If the user is authenticated, redirect to the home page
      if (localStorage.getItem('token')) {
        navigate('/client/home');
      }
    }, [navigate]);

    // Render the wrapped component
    return <WrappedComponent {...props} />;
  };
}