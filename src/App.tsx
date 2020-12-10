import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import ArrowToTop from './components/ArrowToTop/ArrowToTop';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Lists from './components/Lists/Lists';
import SearchPage from './components/SearchPage/SearchPage';
import CastRow from './components/CastRow/CastRow';
import FilmBanner from './components/FilmBanner/FilmBanner';
import PostersGrid from './components/PostersGrid/PostersGrid';
import ReviewsSection from './components/ReviewsSection/ReviewsSection';
import { getUrl } from './api/movieDB/movieDB';

const App: React.FC = () => {
  const location = useLocation();
  const showType = location.pathname.slice(1);
  const showId = +location.search.slice(4);
  const requestLink = getUrl([showType, showId.toString(), 'similar']);
  return (
    <>
      <Header />
      <Switch>
        <Route path="/search" component={SearchPage} />
        <Route path="/tv" key={window.location.hash}>
          <FilmBanner showId={showId} showType={showType} />
          <CastRow filmId={showId} showType={showType} />
          <ReviewsSection showId={showId} showType={showType} />
          <PostersGrid requestLink={requestLink} header="Simillar" />
        </Route>
        <Route path="/movie" key={window.location.hash}>
          <FilmBanner showId={showId} showType={showType} />
          <CastRow filmId={showId} showType={showType} />
          <ReviewsSection showId={showId} showType={showType} />
          <PostersGrid requestLink={requestLink} header="Simillar" />
        </Route>
        <Route path="/lists" component={Lists} key={window.location.hash} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/home" component={HomePage} />
        <Route exact path="/" component={HomePage} />
        <Route component={ErrorPage} />
      </Switch>
      <ControlPanel />
      <Footer />
    </>
  );
};

export default App;
