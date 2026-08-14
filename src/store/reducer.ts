import { Offer } from '../types';
import { cities } from '../const';

type CityName = typeof cities[number];

export type State = {
  city: CityName;
  offers: Offer[];
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
};

const CHANGE_CITY = 'city/change';
const SET_OFFERS = 'offers/set';

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case SET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
};

type ChangeCityAction = {
  type: typeof CHANGE_CITY;
  payload: CityName;
};

type SetOffersAction = {
  type: typeof SET_OFFERS;
  payload: Offer[];
};

export type Action = ChangeCityAction | SetOffersAction;
