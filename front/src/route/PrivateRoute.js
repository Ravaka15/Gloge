import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    return user ? true : false;
  };

  return isLoggedIn() ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;