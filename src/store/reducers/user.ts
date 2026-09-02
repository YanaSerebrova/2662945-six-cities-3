import { AuthorizationStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction, setAuthorizationStatus } from '../action';

export type UserState = {
  authorizationStatus: AuthorizationStatus;
};

export const initialUserState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export type UserAction =
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof checkAuthAction.fulfilled>
  | ReturnType<typeof checkAuthAction.rejected>
  | ReturnType<typeof loginAction.fulfilled>
  | ReturnType<typeof loginAction.rejected>
  | ReturnType<typeof logoutAction.fulfilled>
  | ReturnType<typeof logoutAction.rejected>;

export const userReducer = (state = initialUserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'user/setAuthorizationStatus': {
      const typedAction = action as ReturnType<typeof setAuthorizationStatus>;
      return { ...state, authorizationStatus: typedAction.payload };
    }
    case checkAuthAction.fulfilled.type:
    case loginAction.fulfilled.type:
      return { ...state, authorizationStatus: AuthorizationStatus.Auth };
    case checkAuthAction.rejected.type:
    case loginAction.rejected.type:
    case logoutAction.fulfilled.type:
    case logoutAction.rejected.type:
      return { ...state, authorizationStatus: AuthorizationStatus.NoAuth };
    default:
      return state;
  }
};
