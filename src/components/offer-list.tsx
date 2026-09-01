import { OfferCard} from './offer-card';
import { Offer } from '../types';

interface OfferListProps {
  offers: Offer[];
  listClassName: string;
  cardClassName: string;
  imageWrapperClassName: string;
  onCardMouseEnter?: (offerId: string) => void;
  onCardMouseLeave?: () => void;
}

export function OfferList({ offers, listClassName, cardClassName, imageWrapperClassName,  onCardMouseEnter,
  onCardMouseLeave, }: OfferListProps) {

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardClassName={cardClassName}
          imageWrapperClassName={imageWrapperClassName}
          onMouseEnter={() => onCardMouseEnter?.(offer.id)}
          onMouseLeave={() => onCardMouseLeave?.()}
        />
      ))}
    </div>
  );
}
