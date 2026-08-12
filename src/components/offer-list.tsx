import { OfferCard} from './offer-card';
import { Offer } from '../types';

interface OfferListProps {
  offers: Offer[];
  listClassName: string;
  onCardMouseEnter?: (offerId: string) => void;
  onCardMouseLeave?: () => void;
}

export function OfferList({ offers, listClassName, onCardMouseEnter,
  onCardMouseLeave, }: OfferListProps) {

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardClassName="cities__card place-card"
          imageWrapperClassName="cities__image-wrapper place-card__image-wrapper"
          onMouseEnter={() => onCardMouseEnter?.(offer.id)}
          onMouseLeave={() => onCardMouseLeave?.()}
        />
      ))}
    </div>
  );
}
