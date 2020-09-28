import React from 'react';
import './App.css';
import FilmPage from './components/FilmPage/FilmPage';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import PostersGrid from './components/PostersGrid/PostersGrid';

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <FilmPage id={337401} />
        {/* <HeroSection />
        <PostersGrid /> */}
      </main>
    </div>
  );
}

export default App;
