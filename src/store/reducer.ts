import { Offer, Review } from '../types';
import { cities, AuthorizationStatus } from '../const';
import {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  setAuthorizationStatus,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
} from './action';

type CityName = typeof cities[number];

export type State = {
  city: CityName;
  offers: Offer[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferDataLoading: boolean;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferDataLoading: false,
};

export type Action =
  | { type: 'city/change'; payload: CityName }
  | ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof fetchOffersAction.pending>
  | ReturnType<typeof fetchOffersAction.fulfilled>
  | ReturnType<typeof fetchOffersAction.rejected>
  | ReturnType<typeof checkAuthAction.fulfilled>
  | ReturnType<typeof checkAuthAction.rejected>
  | ReturnType<typeof loginAction.fulfilled>
  | ReturnType<typeof loginAction.rejected>
  | ReturnType<typeof logoutAction.fulfilled>
  | ReturnType<typeof logoutAction.rejected>
  | ReturnType<typeof fetchOfferAction.pending>
  | ReturnType<typeof fetchOfferAction.fulfilled>
  | ReturnType<typeof fetchOfferAction.rejected>
  | ReturnType<typeof fetchNearbyOffersAction.fulfilled>
  | ReturnType<typeof fetchCommentsAction.fulfilled>
  | ReturnType<typeof postCommentAction.fulfilled>;

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case fetchOffersAction.pending.type:
      return { ...state, isLoading: true };

    case fetchOffersAction.fulfilled.type:
      return {
        ...state,
        offers: (action as ReturnType<typeof fetchOffersAction.fulfilled>).payload,
        isLoading: false,
      };

    case fetchOffersAction.rejected.type:
      return { ...state, isLoading: false };

    case 'city/change':
      return {
        ...state,
        city: (action as { type: 'city/change'; payload: CityName }).payload,
      };

    case 'user/setAuthorizationStatus':
      return {
        ...state,
        authorizationStatus: (action as ReturnType<typeof setAuthorizationStatus>).payload,
      };

    case checkAuthAction.fulfilled.type:
    case loginAction.fulfilled.type:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.Auth,
      };

    case checkAuthAction.rejected.type:
    case loginAction.rejected.type:
    case logoutAction.fulfilled.type:
    case logoutAction.rejected.type:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      };

    case fetchOfferAction.pending.type:
      return {
        ...state,
        isOfferDataLoading: true,
      };

    case fetchOfferAction.fulfilled.type:
      return {
        ...state,
        currentOffer: (action as ReturnType<typeof fetchOfferAction.fulfilled>).payload,
        isOfferDataLoading: false,
      };

    case fetchOfferAction.rejected.type:
      return {
        ...state,
        currentOffer: null,
        isOfferDataLoading: false,
      };

    case fetchNearbyOffersAction.fulfilled.type:
      return {
        ...state,
        nearbyOffers: (action as ReturnType<typeof fetchNearbyOffersAction.fulfilled>).payload,
      };

    case fetchCommentsAction.fulfilled.type:
      return {
        ...state,
        comments: (action as ReturnType<typeof fetchCommentsAction.fulfilled>).payload,
      };

    case postCommentAction.fulfilled.type:
      return {
        ...state,
        comments: [
          (action as ReturnType<typeof postCommentAction.fulfilled>).payload,
          ...state.comments,
        ],
      };

    default:
      return state;
  }
};
