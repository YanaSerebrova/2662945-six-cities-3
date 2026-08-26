import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer, AuthInfo } from '../types';
import { cities, AuthorizationStatus } from '../const';

type CityName = typeof cities[number];

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  { extra: AxiosInstance }
>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  AuthInfo,
  undefined,
  { extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<AuthInfo>('/login');
    return data;
  }
);

export const loginAction = createAsyncThunk<
  AuthInfo,
  { email: string; password: string },
  { extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<AuthInfo>('/login', { email, password });
    return data;
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete('/logout');
  }
);

export const setAuthorizationStatus = (status: AuthorizationStatus) => ({
  type: 'user/setAuthorizationStatus',
  payload: status,
} as const);

export const ActionCreator = {
  changeCity: (city: CityName) => ({
    type: 'city/change',
    payload: city,
  } as const),
};
