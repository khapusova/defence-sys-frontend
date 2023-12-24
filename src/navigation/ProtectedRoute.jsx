import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES, LOCALSTORAGE } from '@constants';
import { getDataFromLS } from '../store/localStorage';

const ProtectedRoute = ({ children }) => {
  const token = getDataFromLS(LOCALSTORAGE.activeUser);
  const isLoggedIn = token?.token || null;

  if (!isLoggedIn) {
    return <Navigate replace to={ROUTES.root} />;
  }

  return children;
};



export default ProtectedRoute;
