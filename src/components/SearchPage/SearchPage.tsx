import React from 'react';
import { useLocation } from 'react-router-dom';
import PostersGrid from '../PostersGrid/PostersGrid';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchQuery = location.search.slice(1) || '404';

  return (
    <div>
      <PostersGrid
        header={searchQuery}
        requestLink={
          (location.state as string[]) ||
          `https://api.themoviedb.org/3/search/multi?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&query=${searchQuery}&page=`
        }
      />
    </div>
  );
};

export default SearchPage;
