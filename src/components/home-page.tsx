import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from './header';
import { OfferList } from './offer-list';
import { Map } from './map';
import { CitiesList } from './cities-list';
import { PlacesSorting } from './sorting-places';
import { Spinner } from './spinner';
import { SortType, DEFAULT_CITY_LOCATION } from '../const';
import { RootState } from '../store';

export function HomePage() {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.Popular);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const city = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const isLoading = useSelector((state: RootState) => state.isLoading);

  const cityOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === city),
    [city, offers]
  );

  const sortedOffers = useMemo(() => {
    const copiedOffers = [...cityOffers];
    switch (sortType) {
      case SortType.PriceLowToHigh:
        return copiedOffers.sort((a, b) => a.price - b.price);
      case SortType.PriceHighToLow:
        return copiedOffers.sort((a, b) => b.price - a.price);
      case SortType.TopRatedFirst:
        return copiedOffers.sort((a, b) => b.rating - a.rating);
      default:
        return copiedOffers;
    }
  }, [sortType, cityOffers]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleSortToggle = () => setIsSortOpen((prev) => !prev);
  const handleSortOptionClick = (value: SortType) => {
    setSortType(value);
    setIsSortOpen(false);
  };
  const handleCardMouseEnter = (offerId: string) => setActiveOfferId(offerId);
  const handleCardMouseLeave = () => setActiveOfferId(null);

  const mapLocation = sortedOffers[0]?.city.location ?? DEFAULT_CITY_LOCATION;

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
              <PlacesSorting
                activeSort={sortType}
                isOpen={isSortOpen}
                onToggle={handleSortToggle}
                onSortChange={handleSortOptionClick}
              />
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
