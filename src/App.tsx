import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/home-page';
import { LoginPage } from './components/pages/login-page';
import { FavoritesPage } from './components/pages/favorites-page';
import { OfferPage } from './components/pages/offer-page';
import { AppRoute, AuthorizationStatus } from './const';
import { NotFoundPage } from './components/pages/not-found-page';
import { PrivateRoute } from './components/pages/private-route';
import { Offer } from './components/offer-card';

interface AppProps {
  offers: Offer[];
}

function App({ offers }: AppProps) {
  const isAuthorized = false;

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<HomePage offers={offers} />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={isAuthorized ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth}>
            <FavoritesPage offers={offers} />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Offer}
        element={<OfferPage offers={offers} />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
