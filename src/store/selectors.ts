import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';
import { Offer } from '../types';

export const getOffers = (state: RootState) => state.app.offers;

export const getFavoriteOffers = createSelector(
  [getOffers],
  (offers): Offer[] => offers.filter((offer) => offer.isFavorite)
);

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
