import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HomePage } from './components/home-page';
import { LoginPage } from './components/pages/login-page';
import { FavoritesPage } from './components/pages/favorites-page';
import { OfferPage } from './components/pages/offer-page';
import { AppRoute, AuthorizationStatus } from './const';
import { NotFoundPage } from './components/pages/not-found-page';
import { PrivateRoute } from './components/pages/private-route';
import { mockOffers } from './mocks/offers';
import { ActionCreator } from './store/action';

function App() {
  const dispatch = useDispatch();
  const isAuthorized = false;

  useEffect(() => {
    dispatch(ActionCreator.setOffers(mockOffers));
  }, [dispatch]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<HomePage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={isAuthorized ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth}>
            <FavoritesPage offers={mockOffers} />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Offer} element={<OfferPage offers={mockOffers} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
