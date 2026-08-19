import { Offer } from '../types';
import { cities } from '../const';
import { fetchOffersAction } from './action';

type CityName = typeof cities[number];

export type State = {
  city: CityName;
  offers: Offer[];
  isLoading: boolean;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isLoading: false,
};

export type Action =
  | { type: 'city/change'; payload: CityName }
  | ReturnType<typeof fetchOffersAction.pending>
  | ReturnType<typeof fetchOffersAction.fulfilled>
  | ReturnType<typeof fetchOffersAction.rejected>;

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case fetchOffersAction.pending.type:
      return {
        ...state,
        isLoading: true,
      };

    case fetchOffersAction.fulfilled.type:
      return {
        ...state,
        offers: (action as ReturnType<typeof fetchOffersAction.fulfilled>).payload,
        isLoading: false,
      };

    case fetchOffersAction.rejected.type:
      return {
        ...state,
        isLoading: false,
      };

    case 'city/change':
      return {
        ...state,
        city: (action as { type: 'city/change'; payload: CityName }).payload,
      };

    default:
      return state;
  }
};
