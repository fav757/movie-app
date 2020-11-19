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
          <Route path="/search" component={SearchPage} />
          <Route path="/tv" component={FilmPage} key={window.location.hash} />
          <Route
            path="/movie"
            component={FilmPage}
            key={window.location.hash}
          />
          <Route path="/lists" component={Lists} key={window.location.hash} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/" component={HomePage} />
          <Route component={ErrorPage} />
        </Switch>
      </main>
      <ArrowToTop />
    </div>
  );
};

export default App;
