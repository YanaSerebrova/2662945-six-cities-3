import { useState } from 'react';
import { OfferCard, Offer } from './offer-card';

interface OfferListProps {
  offers: Offer[];
  listClassName: string;
}

export function OfferList({ offers, listClassName }: OfferListProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardClassName="cities__card place-card"
          imageWrapperClassName="cities__image-wrapper place-card__image-wrapper"
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
        />
      ))}
    </div>
  );
}
