import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import PostersGrid from './components/PostersGrid/PostersGrid';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <PostersGrid />
        <PostersGrid />
      </main>
    </div>
  );
}

export default App;
