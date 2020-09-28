import React from 'react';
import './App.css';
import FilmPage from './components/FilmPage/FilmPage';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import PostersGrid from './components/PostersGrid/PostersGrid';

const filmInfo = {
  adult: false,
  backdrop_path: '/zzWGRw277MNoCs3zhyG3YmYQsXv.jpg',
  genre_ids: (4)[(28, 12, 18, 14)],
  id: 337401,
  media_type: 'movie',
  original_language: 'en',
  original_title: 'Mulan',
  overview:
    'When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.',
  popularity: 1683.71,
  poster_path: '/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg',
  release_date: '2020-09-10',
  title: 'Mulan',
  video: false,
  vote_average: 7.4,
  vote_count: 2041,
};

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <FilmPage data={filmInfo} />
      </main>
    </div>
  );
}

export default App;
