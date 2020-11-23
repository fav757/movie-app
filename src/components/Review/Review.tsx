import React from 'react';
import generateAvatarURL from '../../utilities/generateAvatarURL';
import RatingLine from '../RatingLine/RatingLine';
import styles from './Review.module.scss';

export interface ReviewDataInterface {
  author?: string;
  author_details?: {
    name?: string;
    username?: string;
    avatar_path?: string;
    rating?: number;
  };
  content?: string;
  created_at?: string;
  id?: string;
  updated_at?: string;
  url?: string;
}

interface ReviewInterface {
  reviewData: ReviewDataInterface;
}

const Review: React.FC<ReviewInterface> = ({ reviewData }) => {
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
