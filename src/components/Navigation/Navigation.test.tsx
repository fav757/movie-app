import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Logotype component', () => {
  beforeEach(() =>
    render(
      <HashRouter hashType="noslash">
        <Navigation closeModal={() => {}} />
      </HashRouter>,
    ),
  );

  test('should change location when pressed trending link', () => {
    const link = document.querySelector('a[href="#home/trending"]') || window;
    fireEvent.click(link);
    expect(window.location.hash).toBe('#home/trending');
  });

  test('should change location when pressed top movies link', () => {
    const link = document.querySelector('a[href="#home/movie-top"]') || window;
    fireEvent.click(link);
    expect(window.location.hash).toBe('#home/movie-top');
  });

  test('should change location when pressed top tvs link', () => {
    const link = document.querySelector('a[href="#home/tv-top"]') || window;
    fireEvent.click(link);
    expect(window.location.hash).toBe('#home/tv-top');
  });

  test('should change location when pressed lists link', () => {
    const link = document.querySelector('a[href="#lists"]') || window;
    fireEvent.click(link);
    expect(window.location.hash).toBe('#lists');
  });

  test("shouldn't change location when pressed current page link", () => {
    const link = document.querySelector('a[href="#lists"]') || window;
    fireEvent.click(link);
    fireEvent.click(link);
    expect(window.location.hash).toBe('#lists');
  });
});
