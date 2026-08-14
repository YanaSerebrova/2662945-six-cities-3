import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from './header';
import { OfferList } from './offer-list';
import { Map } from './map';
import { CitiesList } from './cities-list';
import { SortType } from '../const';
import { RootState } from '../store';

export function HomePage() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);

  const cityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [city, offers]
  );

  const sortedOffers = useMemo(() => {
    const copiedOffers = [...cityOffers];

    switch (sortType) {
      case 'Price: low to high':
        return copiedOffers.sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return copiedOffers.sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return copiedOffers.sort((a, b) => b.rating - a.rating);
      default:
        return copiedOffers;
    }
  }, [sortType, cityOffers]);

  const handleSortOptionClick = (value: SortType) => {
    setSortType(value);
    setIsSortOpen(false);
  };

  const handleCardMouseEnter = (offerId: string) => {
    setActiveOfferId(offerId);
  };

  const handleCardMouseLeave = () => {
    setActiveOfferId(null);
  };

  const mapLocation = sortedOffers[0]?.city.location ?? {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 12,
  };

  return (
    <div className="page page--gray page--main">
      <Header isAuthorized={false} favoritesCount={0} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <div className="tabs">
          <CitiesList />
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {city}
              </b>

              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>

                <span
                  className="places__sorting-type"
                  tabIndex={0}
                  onClick={() => setIsSortOpen((prev) => !prev)}
                >
                  {sortType}
                  <svg className="places__sorting-arrow" width={7} height={4}>
                    <use href="#icon-arrow-select" />
                  </svg>
                </span>

                {isSortOpen && (
                  <ul className="places__options places__options--custom places__options--opened">
                    <li
                      className={`places__option ${sortType === 'Popular' ? 'places__option--active' : ''}`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Popular')}
                    >
                      Popular
                    </li>
                    <li
                      className={`places__option ${
                        sortType === 'Price: low to high' ? 'places__option--active' : ''
                      }`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Price: low to high')}
                    >
                      Price: low to high
                    </li>
                    <li
                      className={`places__option ${
                        sortType === 'Price: high to low' ? 'places__option--active' : ''
                      }`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Price: high to low')}
                    >
                      Price: high to low
                    </li>
                    <li
                      className={`places__option ${
                        sortType === 'Top rated first' ? 'places__option--active' : ''
                      }`}
                      tabIndex={0}
                      onClick={() => handleSortOptionClick('Top rated first')}
                    >
                      Top rated first
                    </li>
                  </ul>
                )}
              </form>

              <OfferList
                offers={sortedOffers}
                listClassName="cities__places-list places__list tabs__content"
                onCardMouseEnter={handleCardMouseEnter}
                onCardMouseLeave={handleCardMouseLeave}
              />
            </section>

            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={sortedOffers}
                  location={mapLocation}
                  activeOfferId={activeOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
