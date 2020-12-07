import React, { useEffect, useState } from 'react';
import { getUrl } from '../../api/movieDB/movieDB';
import Review, { ReviewDataInterface } from '../Review/Review';
import styles from './ReviewsSection.module.scss';

interface ReviewsSectionInterface {
  showId: number;
  showType: string;
}

const ReviewsSection: React.FC<ReviewsSectionInterface> = ({
  showId,
  showType,
}) => {
  const [reviews, setReviews] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(getUrl([showType, showId.toString(), 'reviews']))
      .then((response) => response.json())
      .then((json) => setReviews(json.results))
      .catch(() => setHasError(true));
  }, [showId, showType]);

  return (
    <section className={styles.container}>
      <div data-testid="reviews container" className={styles.wrap}>
        {hasError ? (
          <b>Error ocurred. We can&apos;t load reviews</b>
        ) : (
          reviews.map((element: ReviewDataInterface) => (
            <Review key={element.id} reviewData={element} />
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
