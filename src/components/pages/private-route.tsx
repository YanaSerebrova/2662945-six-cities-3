import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { ReactNode } from 'react';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: ReactNode;
};

export function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} replace />
  );
}
