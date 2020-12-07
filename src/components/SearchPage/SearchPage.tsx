import React from 'react';
import { useLocation } from 'react-router-dom';
import { getUrl } from '../../api/movieDB/movieDB';
import PostersGrid from '../PostersGrid/PostersGrid';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const searchQuery = location.search.slice(1) || 'Search result';

  return (
    <div>
      <PostersGrid
        header={searchQuery}
        requestLink={
          (location.state as string[]) ||
          getUrl(['search', 'multi'], 1, searchQuery)
        }
      />
    </div>
  );
};

export default SearchPage;
