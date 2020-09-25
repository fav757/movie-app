import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}

export default App;
