import React from 'react';
import { useLocation } from 'react-router-dom';
import CastRow from '../CastRow/CastRow';
import FilmBanner from '../FilmBanner/FilmBanner';
import PostersGrid from '../PostersGrid/PostersGrid';
import ReviewsSection from '../ReviewsSection/ReviewsSection';

const FilmPage: React.FC = () => {
  const location = useLocation();
  const showType = location.pathname.slice(1);
  const showId = +location.search.slice(4);

  const requestLink = `https://api.themoviedb.org/3/${showType}/${showId}/similar?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1`;

  return (
    <div>
      <FilmBanner showId={showId} showType={showType} />
      <CastRow filmId={showId} showType={showType} />
      <ReviewsSection showId={showId} showType={showType} />
      <PostersGrid requestLink={requestLink} header="Simillar" />
    </div>
  );
};

export default FilmPage;
