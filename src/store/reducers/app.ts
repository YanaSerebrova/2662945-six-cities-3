/* eslint-disable @typescript-eslint/no-duplicate-type-constituents */
import { cities } from '../../const';
import { fetchOffersAction, ActionCreator, toggleFavoriteAction, fetchFavoriteOffersAction } from '../action';
import { Offer } from '../../types';

type CityName = typeof cities[number];

export type AppState = {
  city: CityName;
  isLoading: boolean;
  offers: Offer[];
  favoriteOffers: Offer[];
};

export const initialAppState: AppState = {
  city: 'Paris',
  isLoading: false,
  offers: [],
  favoriteOffers: [],
};

export type AppAction =
  | ReturnType<typeof fetchOffersAction.pending>
  | ReturnType<typeof fetchOffersAction.fulfilled>
  | ReturnType<typeof fetchOffersAction.rejected>
  | ReturnType<typeof ActionCreator.changeCity>
  | ReturnType<typeof toggleFavoriteAction.fulfilled>
  | ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;

export const appReducer = (state = initialAppState, action: AppAction): AppState => {
  switch (action.type) {
    case fetchOffersAction.pending.type:
      return { ...state, isLoading: true };

    case fetchOffersAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchOffersAction.fulfilled>;
      return {
        ...state,
        offers: typedAction.payload,
        isLoading: false,
      };
    }

    case fetchOffersAction.rejected.type:
      return { ...state, isLoading: false };

    case 'city/change': {
      const typedAction = action as ReturnType<typeof ActionCreator.changeCity>;
      return {
        ...state,
        city: typedAction.payload,
      };
    }

    case fetchFavoriteOffersAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchFavoriteOffersAction.fulfilled>;
      return {
        ...state,
        favoriteOffers: typedAction.payload,
      };
    }

    case toggleFavoriteAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof toggleFavoriteAction.fulfilled>;
      const updatedOffer = typedAction.payload;

      const updatedOffers = state.offers.map((offer) =>
        offer.id === updatedOffer.id ? updatedOffer : offer
      );

      let updatedFavoriteOffers = [...state.favoriteOffers];

      if (updatedOffer.isFavorite) {
        if (!updatedFavoriteOffers.find((o) => o.id === updatedOffer.id)) {
          updatedFavoriteOffers.push(updatedOffer);
        }
      } else {
        updatedFavoriteOffers = updatedFavoriteOffers.filter((o) => o.id !== updatedOffer.id);
      }

      return {
        ...state,
        offers: updatedOffers,
        favoriteOffers: updatedFavoriteOffers,
      };
    }

    default:
      return state;
  }
};

