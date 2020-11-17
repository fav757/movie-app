import React from 'react';
import { useLocation } from 'react-router-dom';
import { PosterData } from '../Poster/Poster';
import PostersGrid from '../PostersGrid/PostersGrid';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchQuery = location.search.slice(1);

  return (
    <div>
      <PostersGrid
        filmsList={location.state as PosterData[]}
        header={searchQuery}
        requestLink={`https://api.themoviedb.org/3/search/multi?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&query=${searchQuery}&page=`}
      />
    </div>
  );
};

export default SearchPage;
