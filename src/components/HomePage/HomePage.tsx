import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HeroSection from '../HeroSection/HeroSection';
import PostersGrid from '../PostersGrid/PostersGrid';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <Switch>
        <Route path="/home/movie-top">
          <PostersGrid
            header="Top rated movies"
            requestLink="https://api.themoviedb.org/3/movie/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page="
          />
        </Route>
        <Route path="/home/tv-top">
          <PostersGrid
            header="Top rated tv series"
            requestLink="https://api.themoviedb.org/3/tv/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page="
          />
        </Route>
        <Route path="/home/tranding">
          <PostersGrid
            header="Tranding"
            requestLink="https://api.themoviedb.org/3/trending/all/day?api_key=09ecd60e9326551324881d2239a8f12a&page="
          />
        </Route>
        <Route>
          <PostersGrid
            header="Tranding"
            requestLink="https://api.themoviedb.org/3/trending/all/day?api_key=09ecd60e9326551324881d2239a8f12a&page="
          />
        </Route>
      </Switch>
    </div>
  );
};

export default HomePage;
