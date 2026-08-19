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
import { fetchOffersAction } from './store/action';
import { AppDispatch } from './store';

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const isAuthorized = false;

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<HomePage />} />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={isAuthorized ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
