import { Offer } from '../types';
import { cities, AuthorizationStatus } from '../const';
import {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  setAuthorizationStatus,
} from './action';

type CityName = typeof cities[number];

export type State = {
  city: CityName;
  offers: Offer[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

export type Action =
  | { type: 'city/change'; payload: CityName }
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof fetchOffersAction.pending>
  | ReturnType<typeof fetchOffersAction.fulfilled>
  | ReturnType<typeof fetchOffersAction.rejected>
  | ReturnType<typeof checkAuthAction.fulfilled>
  | ReturnType<typeof checkAuthAction.rejected>
  | ReturnType<typeof loginAction.fulfilled>
  | ReturnType<typeof loginAction.rejected>
  | ReturnType<typeof logoutAction.fulfilled>
  | ReturnType<typeof logoutAction.rejected>;

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case fetchOffersAction.pending.type:
      return { ...state, isLoading: true };

    case fetchOffersAction.fulfilled.type:
      return {
        ...state,
        offers: (action as ReturnType<typeof fetchOffersAction.fulfilled>).payload,
        isLoading: false,
      };

    case fetchOffersAction.rejected.type:
      return { ...state, isLoading: false };

    case 'city/change':
      return {
        ...state,
        city: (action as { type: 'city/change'; payload: CityName }).payload,
      };

    case 'user/setAuthorizationStatus':
      return {
        ...state,
        authorizationStatus: (action as ReturnType<typeof setAuthorizationStatus>).payload,
      };

    case checkAuthAction.fulfilled.type:
    case loginAction.fulfilled.type:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.Auth,
      };

    case checkAuthAction.rejected.type:
    case loginAction.rejected.type:
    case logoutAction.fulfilled.type:
    case logoutAction.rejected.type:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };

    default:
      return state;
  }
};
