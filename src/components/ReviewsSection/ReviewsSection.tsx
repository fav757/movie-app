import React, { useEffect, useState } from 'react';
import { ReviewData } from '../../@types/movieDB';
import { getUrl } from '../../api/movieDB/movieDB';
import Review from '../Review/Review';
import styles from './ReviewsSection.module.scss';

const ReviewsSection: React.FC<{
  showId: number;
  showType: string;
}> = ({ showId, showType }) => {
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
          reviews.map((element: ReviewData) => (
            <Review key={element.id} reviewData={element} />
          ))
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
