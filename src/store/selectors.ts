import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer } from '../types';

export const getFavoriteOffers = (state: RootState): Offer[] => state.app.favoriteOffers;

export const getGroupedFavoriteOffers = createSelector(
  [getFavoriteOffers],
  (favoriteOffers): Record<string, Offer[]> =>
    favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {})
);
