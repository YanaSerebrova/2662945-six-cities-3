import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Header } from '../header';
import { Footer } from '../footer';
import { OfferCard } from '../offer-card';
import { getFavoriteOffers, getGroupedFavoriteOffers } from '../../store/selectors';
import { Offer } from '../../types';
import { fetchFavoriteOffersAction } from '../../store/action';
import { AppDispatch } from '../../store';

export function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const favoriteOffers = useSelector(getFavoriteOffers);
  const groupedFavorites = useSelector(getGroupedFavoriteOffers);
  const hasFavorites = favoriteOffers.length > 0;

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  return (
    <div className="page">
      <Header isAuthorized favoritesCount={favoriteOffers.length} />

      <main
        className={
          hasFavorites
            ? 'page__main page__main--favorites'
            : 'page__main page__main--favorites page__main--favorites-empty'
        }
      >
        <div className="page__favorites-container container">
          <section className={hasFavorites ? 'favorites' : 'favorites favorites--empty'}>
            {hasFavorites ? (
              <>
                <h1 className="favorites__title">Saved listing</h1>

                <ul className="favorites__list">
                  {Object.entries(groupedFavorites).map(([city, cityOffers]) => (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>

                      <div className="favorites__places">
                        {cityOffers.map((offer: Offer) => (
                          <OfferCard
                            key={offer.id}
                            offer={offer}
                            cardClassName="favorites__card place-card"
                            imageWrapperClassName="favorites__image-wrapper place-card__image-wrapper"
                          />
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future trips.
                  </p>
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {hasFavorites && <Footer />}
    </div>
  );
}
