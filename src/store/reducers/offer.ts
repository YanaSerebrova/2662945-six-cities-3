import { Offer, Review } from '../../types';
import { fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction, postCommentAction } from '../action';

export type OfferState = {
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferDataLoading: boolean;
};

export const initialOfferState: OfferState = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferDataLoading: false,
};

export type OfferAction =
  | ReturnType<typeof fetchOfferAction.pending>
  | ReturnType<typeof fetchOfferAction.fulfilled>
  | ReturnType<typeof fetchOfferAction.rejected>
  | ReturnType<typeof fetchNearbyOffersAction.fulfilled>
  | ReturnType<typeof fetchCommentsAction.fulfilled>
  | ReturnType<typeof postCommentAction.fulfilled>;

export const offerReducer = (state = initialOfferState, action: OfferAction): OfferState => {
  switch (action.type) {
    case fetchOfferAction.pending.type:
      return { ...state, isOfferDataLoading: true };
    case fetchOfferAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchOfferAction.fulfilled>;
      return { ...state, currentOffer: typedAction.payload, isOfferDataLoading: false };
    }
    case fetchOfferAction.rejected.type:
      return { ...state, currentOffer: null, isOfferDataLoading: false };
    case fetchNearbyOffersAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;
      return { ...state, nearbyOffers: typedAction.payload };
    }
    case fetchCommentsAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof fetchCommentsAction.fulfilled>;
      return { ...state, comments: typedAction.payload };
    }
    case postCommentAction.fulfilled.type: {
      const typedAction = action as ReturnType<typeof postCommentAction.fulfilled>;
      return { ...state, comments: [typedAction.payload, ...state.comments] };
    }

    default:
      return state;
  }
};
