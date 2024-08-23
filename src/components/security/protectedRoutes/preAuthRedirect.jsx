import { Navigate, Route } from 'react-router-dom';

function PrivateRoutes({ element, path, ...rest }) {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return (
    <Route 
      path={path} 
      element={isAuthenticated ? element : <Navigate to="/login" replace />}
      {...rest}
    />
  );
}

export default PrivateRoutes;