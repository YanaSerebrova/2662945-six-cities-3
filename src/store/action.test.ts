import { describe, it, expect, vi } from 'vitest';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import {
  fetchOffersAction,
  fetchFavoriteOffersAction,
  loginAction,
  logoutAction,
  toggleFavoriteAction
} from './action';
import { AxiosInstance } from 'axios';
import { saveToken, dropToken } from '../token';

const mockOffer = {
  id: '1',
  title: 'Test Offer',
  isFavorite: true
};

const mockApi = {
  get: vi.fn(),
  post: vi.fn(),
  delete: vi.fn(),
} as unknown as AxiosInstance;

vi.mock('../token', () => ({
  saveToken: vi.fn(),
  dropToken: vi.fn(),
  getToken: vi.fn(),
}));

const dummySlice = createSlice({
  name: 'dummy',
  initialState: {},
  reducers: {},
});

describe('Async Actions', () => {
  const store = configureStore({
    reducer: {
      app: dummySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: mockApi,
        },
      }),
  });

  it('fetchOffersAction должен сделать GET запрос к /offers', async () => {
    const mockOffers = [{ id: '1', title: 'Test' }];
    vi.mocked(mockApi.get).mockResolvedValue({ data: mockOffers });

    await store.dispatch(fetchOffersAction());

    expect(mockApi.get).toHaveBeenCalledTimes(1);
    expect(mockApi.get).toHaveBeenCalledWith('/offers');
  });

  it('fetchFavoriteOffersAction должен сделать GET запрос к /favorite', async () => {
    const mockFavorites = [{ id: '2', title: 'Fav' }];
    vi.mocked(mockApi.get).mockResolvedValue({ data: mockFavorites });

    await store.dispatch(fetchFavoriteOffersAction());

    expect(mockApi.get).toHaveBeenCalledWith('/favorite');
  });

  it('loginAction должен сделать POST запрос к /login и сохранить токен', async () => {
    const mockAuth = { name: 'Test', avatarUrl: '', isPro: false, email: 'test@test.com', token: '123' };
    vi.mocked(mockApi.post).mockResolvedValue({ data: mockAuth });

    await store.dispatch(loginAction({ email: 'test@test.com', password: '123' }));

    expect(mockApi.post).toHaveBeenCalledWith('/login', { email: 'test@test.com', password: '123' });
    expect(saveToken).toHaveBeenCalledWith('123');
  });

  it('logoutAction должен сделать DELETE запрос к /logout и удалить токен', async () => {
    vi.mocked(mockApi.delete).mockResolvedValue({});

    await store.dispatch(logoutAction());

    expect(mockApi.delete).toHaveBeenCalledWith('/logout');
    expect(dropToken).toHaveBeenCalled();
  });

  it('toggleFavoriteAction должен сделать POST запрос к /favorite/:id/:status', async () => {
    vi.mocked(mockApi.post).mockResolvedValue({ data: mockOffer });

    await store.dispatch(toggleFavoriteAction({ offerId: '1', status: 1 }));

    expect(mockApi.post).toHaveBeenCalledWith('/favorite/1/1');
  });
});

