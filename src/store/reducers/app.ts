import { cities } from '../../const';
import { fetchOffersAction, ActionCreator, toggleFavoriteAction } from '../action';
import { Offer } from '../../types';

type CityName = typeof cities[number];

export type AppState = {
  city: CityName;
  isLoading: boolean;
  offers: Offer[];
};

export const initialAppState: AppState = {
  city: 'Paris',
  isLoading: false,
  offers: [],
};

export type AppAction =
  | ReturnType<typeof fetchOffersAction.pending>
  | ReturnType<typeof fetchOffersAction.fulfilled>
  | ReturnType<typeof fetchOffersAction.rejected>
  | ReturnType<typeof ActionCreator.changeCity>
  | ReturnType<typeof toggleFavoriteAction.fulfilled>;

export const appReducer = (state = initialAppState, action: AppAction): AppState => {
  switch (action.type) {
    case fetchOffersAction.pending.type:
      return { ...state, isLoading: true };

    case fetchOffersAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchOffersAction.fulfilled>;
      return {
        ...state,
        offers: typedAction.payload,
        isLoading: false
      };
    }

    case fetchOffersAction.rejected.type:
      return { ...state, isLoading: false };

    case 'city/change': {
      const typedAction = action as ReturnType<typeof ActionCreator.changeCity>;
      return {
        ...state,
        city: typedAction.payload
      };
    }

    case toggleFavoriteAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof toggleFavoriteAction.fulfilled>;
      const updatedOffer = typedAction.payload;
      return {
        ...state,
        offers: state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        ),
      };
    }

    default:
      return state;
  }
};
