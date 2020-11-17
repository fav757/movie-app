import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import ArrowToTop from './components/ArrowToTop/ArrowToTop';
import ErrorPage from './components/ErrorPage/ErrorPage';
import FilmPage from './components/FilmPage/FilmPage';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import Lists from './components/Lists/Lists';
import SearchPage from './components/SearchPage/SearchPage';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/tv">
            <FilmPage />
          </Route>
          <Route path="/movie">
            <FilmPage />
          </Route>
          <Route path="/lists">
            <Lists />
          </Route>
          <Route path="/error">
            <ErrorPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </main>
      <ArrowToTop />
    </div>
  );
};

export default App;
