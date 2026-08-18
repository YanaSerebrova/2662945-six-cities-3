export enum AppRoute {
Main='/',
Login='/login',
Favorites='/favorites',
Offer='/offer/:id',
}

export enum AuthorizationStatus {
  Auth='Auth',
  NoAuth='noAuth',
  Unknown='Unknown',
}
export const OFFER_COUNT = 5;

export const DEFAULT_ZOOM = 12;

export const NEAR_PLACES_COUNT = 3;

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const DEFAULT_CITY_LOCATION = {
  latitude: 48.85661,
  longitude: 2.351499,
  zoom: 12,
};

export const ratingTitles: Record<string, string> = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};
