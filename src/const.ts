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

export const ratingTitles: Record<string, string> = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};
