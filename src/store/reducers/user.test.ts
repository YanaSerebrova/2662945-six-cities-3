import { describe, it, expect } from 'vitest';
import { userReducer, initialUserState } from './user';
import { loginAction, logoutAction } from '../action';
import { AuthorizationStatus } from '../../const';

describe('UserReducer', () => {
  it('должен установить Auth и email при loginAction.fulfilled', () => {
    const action = loginAction.fulfilled(
      { name: 'Test', avatarUrl: '', isPro: false, email: 'test@test.com', token: '123' },
      '',
      { email: 'test@test.com', password: '123' }
    );
    const result = userReducer(initialUserState, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.userEmail).toBe('test@test.com');
  });
  it('должен установить NoAuth и очистить email при logoutAction.fulfilled', () => {
    const stateWithAuth = {
      ...initialUserState,
      authorizationStatus: AuthorizationStatus.Auth,
      userEmail: 'test@test.com'
    };
    const action = logoutAction.fulfilled(undefined, '', undefined);
    const result = userReducer(stateWithAuth, action);
    expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(result.userEmail).toBeNull();
  });
});
