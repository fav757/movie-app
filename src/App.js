import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import ErrorPage from './components/ErrorPage/ErrorPage';
import FilmPage from './components/FilmPage/FilmPage';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import PostersGrid from './components/PostersGrid/PostersGrid';

function App() {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path='/tv'>
            <FilmPage />
          </Route>
          <Route path='/movie'>
            <FilmPage />
          </Route>
          <Route path='/error'>
            <ErrorPage />
          </Route>
          <Route exact path='/'>
            <HeroSection />
            {/* Shows trending films */}
            <PostersGrid
              requestLink='https://api.themoviedb.org/3/trending/all/day?api_key=09ecd60e9326551324881d2239a8f12a'
              header='Trending now'
            />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
