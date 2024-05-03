import { BrowserRouter } from 'react-router-dom';

import { useAuth } from "../hooks/auth";

import { AuthRoutes } from './auth.routes';
import { AdiminRoutes } from './admin.routes';
import { CustomerRoutes } from './customer.routes';
import { SalesRoutes } from './sales.routes';
import { USER_ROLE } from '../utils/roles';
import { useEffect } from 'react';
import { api } from '../services/api';

export function Routes() {
  const { user, signOut } = useAuth();

  useEffect(() => {
    api.get('/users/validated').catch((error) => {
      if(error.response?.status === 401){
        signOut()
      }
    })
  }, [])

  function AccessRoute() {
    switch (user.role) {
      case USER_ROLE.ADMIN:
        return <AdiminRoutes />
      case USER_ROLE.CUSTOMER:
        return <CustomerRoutes />
      case USER_ROLE.SALE:
        return <SalesRoutes />
        default: <CustomerRoutes />
    }
  }

  return (
    <BrowserRouter>
      {user ? <AccessRoute /> : <AuthRoutes />}
    </BrowserRouter>
  );
}