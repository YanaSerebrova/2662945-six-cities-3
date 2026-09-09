import { describe, it, expect } from 'vitest';
import { offerReducer, initialOfferState } from './offer';
import { fetchOfferAction, toggleFavoriteAction } from '../action';

const mockOffer = {
  id: '1', title: 'Test Offer', type: 'apartment', price: 100, isPremium: false, isFavorite: false,
  rating: 4.5, previewImage: 'img.jpg', city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 }, images: ['img.jpg'], bedrooms: 1, maxAdults: 2,
  goods: ['Wi-Fi'], description: 'Test', host: { name: 'Host', avatarUrl: 'img.jpg', isPro: false },
};

describe('OfferReducer', () => {
  it('должен сохранить текущий оффер и убрать загрузку при fetchOfferAction.fulfilled', () => {
    const state = { ...initialOfferState, isOfferDataLoading: true };
    const action = fetchOfferAction.fulfilled(mockOffer, '', '1');
    const result = offerReducer(state, action);
    expect(result.currentOffer).toEqual(mockOffer);
    expect(result.isOfferDataLoading).toBe(false);
  });

  it('должен обновить isFavorite у текущего оффера при toggleFavoriteAction.fulfilled', () => {
    const state = { ...initialOfferState, currentOffer: { ...mockOffer, isFavorite: false } };
    const updatedOffer = { ...mockOffer, isFavorite: true };
    const action = toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 });
    const result = offerReducer(state, action);
    expect(result.currentOffer?.isFavorite).toBe(true);
  });
});
