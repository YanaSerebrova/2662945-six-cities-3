import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/home-page';
import { LoginPage } from './components/pages/login-page';
import { FavoritesPage } from './components/pages/favorites-page';
import { OfferPage } from './components/pages/offer-page';
import { AppRoute, OFFER_COUNT, AuthorizationStatus } from './const';
import { NotFoundPage } from './components/pages/not-found-page';
import { PrivateRoute } from './components/pages/private-route';

function App() {
  const isAuthorized = false;

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<HomePage offerCount={OFFER_COUNT} />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={isAuthorized ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth}>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Offer}
        element={<OfferPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
