import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { appReducer } from './reducers/app';
import { offerReducer } from './reducers/offer';

export const reducer = combineReducers({
  user: userReducer,
  app: appReducer,
  offer: offerReducer,
});
