import { Review as ReviewType } from '../types';
import { Review } from './review';

interface ReviewListProps {
  reviews: ReviewType[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>

      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
