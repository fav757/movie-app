import React from 'react';
import CastRow from '../CastRow/CastRow';
import FilmBanner from '../FilmBanner/FilmBanner';

function FilmPage() {
  const showType = window.location.href.match(/(?<=#)[^?]+/)[0];
  const showId = window.location.href.match(/(?<=\?id=)[0-9]+/)[0];

  return (
    <div>
      <FilmBanner showId={showId} showType={showType} />
      <CastRow filmId={showId} showType={showType} />
    </div>
  );
}

export default FilmPage;
