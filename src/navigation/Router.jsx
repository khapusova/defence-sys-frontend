import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@constants';
import { OrderHistory, SignIn, MainAuthorized, MainNotAuthorized, Accounting } from '@pages';
import ProtectedRoute from './ProtectedRoute';
import { Database, DocumentsReceivedSupplies, Menu, SignIn2 } from '../pages';
import Main from './Main';

const Router = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route element={<SignIn />} path={ROUTES.signUp} />
          <Route path='db' element={
            <ProtectedRoute>
              <Database />
            </ProtectedRoute>
          } />
          <Route element={<SignIn2 />} path={ROUTES.signIn} />
          <Route
            element={<Main />}
            path={ROUTES.root}
          />
          <Route
            element={
              <ProtectedRoute>
                <Accounting />
              </ProtectedRoute>
            }
            path={ROUTES.accounting}
          />
          <Route
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
            path={ROUTES.order}
          />
          <Route
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
            path={ROUTES.menu}
          />
          <Route
            element={
              <ProtectedRoute>
                <DocumentsReceivedSupplies />
              </ProtectedRoute>
            }
            path={ROUTES.documentsReceivedSupplies}
          />
          <Route
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
            path="/*"
          />
        </Routes>
      </BrowserRouter>
  );
};

export default Router;
