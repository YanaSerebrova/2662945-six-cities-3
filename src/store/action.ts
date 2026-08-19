import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offer } from '../types';
import { cities } from '../const';

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

const CHANGE_CITY = 'city/change';

export const ActionCreator = {
  changeCity: (city: CityName) => ({
    type: CHANGE_CITY,
    payload: city,
  } as const),
};
