import { Review as ReviewType } from '../types';
import { formatDateTime, formatDate, calculateRatingPercent } from '../utils';

interface ReviewProps {
  review: ReviewType;
}

export function Review({ review }: ReviewProps) {
  const ratingPercent = calculateRatingPercent(review.rating);
  const formattedDate = formatDate(review.date);
  const dateTime = formatDateTime(review.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text">{review.comment}</p>

        <time className="reviews__time" dateTime={dateTime}>
          {formattedDate}
        </time>
      </div>
    </li>
  );
}
