import { Navigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext';
import { Login } from '../pages/Login';

interface Props {
  component: React.ComponentType,
  path?: string,
  role: string
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, role }) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const userHasRequiredRole = user && role === user.tipo_usuario.nome ? true : false

  if (isAuthenticated && userHasRequiredRole) {
    return <RouteComponent />
  }

  if (isAuthenticated && !userHasRequiredRole) {
    return <Login />
  }

  return <Navigate to="/" />
}
