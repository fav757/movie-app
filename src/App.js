import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import FilmPage from './components/FilmPage/FilmPage';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import PostersGrid from './components/PostersGrid/PostersGrid';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Switch>
          <Route path={'/tv/'}>
            <FilmPage />
          </Route>
          <Route path={'/movie/'}>
            <FilmPage />
          </Route>
          <Route path={'/error'}>
            <ErrorPage />
          </Route>
          <Route exact path='/'>
            <HeroSection />
            <PostersGrid />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
