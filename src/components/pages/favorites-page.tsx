import { Header } from '../header';
import { Footer } from '../footer';
import { OfferCard } from '../offer-card';

const favorites = [
  {
    city: 'Amsterdam',
    items: [
      {
        id: 1,
        premium: true,
        title: 'Nice, cozy, warm big bed apartment',
        type: 'Apartment',
        price: 180,
        isBookmarked: true,
        ratingPercent: 100,
        image: 'img/apartment-small-03.jpg',
      },
      {
        id: 2,
        premium: false,
        title: 'Wood and stone place',
        type: 'Room',
        price: 80,
        isBookmarked: true,
        ratingPercent: 80,
        image: 'img/room-small.jpg',
      },
    ],
  },
  {
    city: 'Cologne',
    items: [
      {
        id: 3,
        premium: false,
        title: 'White castle',
        type: 'Apartment',
        price: 180,
        isBookmarked: true,
        ratingPercent: 100,
        image: 'img/apartment-small-04.jpg',
      },
    ],
  },
];

export function FavoritesPage() {
  const hasFavorites = favorites.length > 0;

  return (
    <div className="page">
      <Header isAuthorized favoritesCount={3} />

      <main className={hasFavorites ? 'page__main page__main--favorites' : 'page__main page__main--favorites page__main--favorites-empty'}>
        <div className="page__favorites-container container">
          <section className={hasFavorites ? 'favorites' : 'favorites favorites--empty'}>
            {hasFavorites ? (
              <>
                <h1 className="favorites__title">Saved listing</h1>

                <ul className="favorites__list">
                  {favorites.map((group) => (
                    <li key={group.city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#todo">
                            <span>{group.city}</span>
                          </a>
                        </div>
                      </div>

                      <div className="favorites__places">
                        {group.items.map((offer) => (
                          <OfferCard
                            key={offer.id}
                            cardClassName="favorites__card place-card"
                            imageWrapperClassName="favorites__image-wrapper place-card__image-wrapper"
                            premium={offer.premium}
                            title={offer.title}
                            type={offer.type}
                            price={offer.price}
                            isBookmarked={offer.isBookmarked}
                            ratingPercent={offer.ratingPercent}
                            image={offer.image}
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
