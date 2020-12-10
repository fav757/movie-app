import React from 'react';
import { ReviewData } from '../../@types/movieDB';
import { generateAvatarURL } from '../../api/movieDB/movieDB';
import RatingLine from '../RatingLine/RatingLine';
import styles from './Review.module.scss';

const Review: React.FC<{
  reviewData: ReviewData;
}> = ({ reviewData }) => {
  const avatarPath = generateAvatarURL(reviewData.author_details?.avatar_path);

  return (
    <div className={styles.wrap}>
      <div className={styles.reviewHeader}>
        <div className={styles.avatar}>
          <img alt="author avatar" src={avatarPath} />
        </div>
        <div className={styles.author}>
          <h3>
            Author:{' '}
            {reviewData.author_details?.name ||
              reviewData.author_details?.username ||
              'no name'}
          </h3>
          <p>
            Created:{' '}
            {new Date(reviewData.created_at || '').toLocaleDateString()}
          </p>
          <div data-testid="rating" className={styles.rating}>
            Rating: <RatingLine rating={reviewData.author_details?.rating} />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {reviewData.content || 'No review content'}
      </div>
    </div>
  );
};

export default Review;
