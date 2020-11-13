import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import { HashRouter, Route } from 'react-router-dom';
import Navigation from './Navigation';

describe('Logotype component', () => {
  beforeEach(() =>
    render(
      <HashRouter hashType='noslash'>
        <Route component={Navigation} />
      </HashRouter>
    )
  );
  
  test('should change location when pressed trending link', () => {
    const link = document.querySelector('a[href="#home/trending"]');
    fireEvent.click(link);
    expect(window.location.hash).toBe('#home/trending');
  });

  test('should change location when pressed top movies link', () => {
    const link = document.querySelector('a[href="#home/movie-top"]');
    fireEvent.click(link);
    expect(window.location.hash).toBe('#home/movie-top');
  });

  test('should change location when pressed top tvs link', () => {
    const link = document.querySelector('a[href="#home/tv-top"]');
    fireEvent.click(link);
    expect(window.location.hash).toBe('#home/tv-top');
  });

  test('should change location when pressed lists link', () => {
    const link = document.querySelector('a[href="#lists"]');
    fireEvent.click(link);
    expect(window.location.hash).toBe('#lists');
  });

  test("shouldn't change location when pressed current page link", () => {
    const link = document.querySelector('a[href="#lists"]');
    fireEvent.click(link);
    fireEvent.click(link);
    expect(window.location.hash).toBe('#lists');
  });
});
