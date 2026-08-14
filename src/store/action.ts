import { Offer } from '../types';
import { cities } from '../const';

type CityName = typeof cities[number];

const CHANGE_CITY = 'city/change';
const SET_OFFERS = 'offers/set';

export const ActionCreator = {
  changeCity: (city: CityName) => ({
    type: CHANGE_CITY,
    payload: city,
  } as const),

  setOffers: (offers: Offer[]) => ({
    type: SET_OFFERS,
    payload: offers,
  } as const),
};
