import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getUrl } from '../../api/movieDB/movieDB';
import HeroSection from '../HeroSection/HeroSection';
import PostersGrid from '../PostersGrid/PostersGrid';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <Switch>
        <Route path="/home/movie-top">
          <PostersGrid
            header="Top rated movies"
            requestLink={getUrl(['movie', 'top_rated'])}
          />
        </Route>
        <Route path="/home/tv-top">
          <PostersGrid
            header="Top rated tv series"
            requestLink={getUrl(['tv', 'top_rated'])}
          />
        </Route>
        <Route path="/home/tranding">
          <PostersGrid
            header="Tranding"
            requestLink={getUrl(['trending', 'all', 'day'])}
          />
        </Route>
        <Route>
          <PostersGrid
            header="Tranding"
            requestLink={getUrl(['trending', 'all', 'day'])}
          />
        </Route>
      </Switch>
    </>
  );
};

export default HomePage;
