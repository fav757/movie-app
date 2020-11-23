import React, { useEffect, useState } from 'react';
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
    fetch(
      `https://api.themoviedb.org/3/${showType}/${showId}/reviews?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US`,
    )
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
