import { useParams } from 'react-router-dom';
import { Header } from '../header';
import { Offer } from '../../types';
import { ReviewForm } from '../review-form';
import { ReviewList } from '../review-list';
import { OfferList } from '../offer-list';
import { Map } from '../map';
import { mockComments } from '../../mocks/comments';
import { NEAR_PLACES_COUNT } from '../../const';

interface OfferPageProps {
  offers: Offer[];
}

export function OfferPage({ offers }: OfferPageProps) {
  const { id } = useParams<{ id: string }>();
  const currentOffer = offers.find((offer) => offer.id === id);

  if (!currentOffer) {
    return (
      <div className="page page--gray">
        <Header isAuthorized={false} favoritesCount={0} />
        <main className="page__main page__main--index">
          <p style={{ textAlign: 'center', marginTop: '50px' }}>Offer not found</p>
        </main>
      </div>
    );
  }

  const nearbyOffers = offers
    .filter((offer) => offer.id !== currentOffer.id)
    .slice(0, NEAR_PLACES_COUNT);

  const ratingPercent = Math.round(currentOffer.rating) * 20;

  return (
    <div className="page">
      <Header isAuthorized={false} favoritesCount={0} />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              <div className="offer__image-wrapper">
                <img className="offer__image" src={currentOffer.previewImage} alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-02.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-03.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/studio-01.jpg" alt="Photo studio" />
              </div>
              <div className="offer__image-wrapper">
                <img className="offer__image" src="img/apartment-01.jpg" alt="Photo studio" />
              </div>
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use href="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${ratingPercent}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">3 Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max 4 adults</li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  <li className="offer__inside-item">Wi-Fi</li>
                  <li className="offer__inside-item">Washing machine</li>
                  <li className="offer__inside-item">Towels</li>
                  <li className="offer__inside-item">Heating</li>
                  <li className="offer__inside-item">Coffee machine</li>
                  <li className="offer__inside-item">Baby seat</li>
                  <li className="offer__inside-item">Kitchen</li>
                  <li className="offer__inside-item">Dishwasher</li>
                  <li className="offer__inside-item">Cabel TV</li>
                  <li className="offer__inside-item">Fridge</li>
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>

                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique
                    lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National
                    Opera, but where the bustle of the city comes to rest in this alley flowery and
                    colorful.
                  </p>
                </div>
              </div>

              <section className="offer__reviews reviews">
                <ReviewList reviews={mockComments} />
                <ReviewForm />
              </section>
            </div>
          </div>

          <section className="offer__map map">
            <Map
              offers={nearbyOffers}
              location={currentOffer.location}
              activeOfferId={null}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList
              offers={nearbyOffers}
              listClassName="near-places__list places__list"
            />
          </section>
        </div>
      </main>
    </div>
  );
}

