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
          <Route path='/'>
            <HeroSection />
            <Switch>
              <Route exact path='/'>
                <PostersGrid />
              </Route>
              <Route exact path='/tranding'>
                <PostersGrid />
              </Route>
              <Route exact path='/top'>
                <PostersGrid
                  header='Top rated'
                  requestLink='https://api.themoviedb.org/3/movie/top_rated?api_key=09ecd60e9326551324881d2239a8f12a&language=en-US&page=1'
                />
              </Route>
            </Switch>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
