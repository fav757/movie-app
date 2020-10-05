import React from 'react';
import CastRow from '../CastRow/CastRow';
import FilmBanner from '../FilmBanner/FilmBanner';
import PostersGrid from '../PostersGrid/PostersGrid';

function FilmPage() {
  const showType = window.location.href.match(/(?<=#)[^?]+/)[0];
  const showId = window.location.href.match(/(?<=\?id=)[0-9]+/)[0];
  const requestLink =
    `https://api.themoviedb.org/3/${showType}/${showId}/similar?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1`;

  return (
    <div>
      <FilmBanner showId={showId} showType={showType} />
      <CastRow filmId={showId} showType={showType} />
      <PostersGrid requestLink={requestLink} header='Simillar' />
    </div>
  );
}

export default FilmPage;
