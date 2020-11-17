import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter, Route } from 'react-router-dom';
import Lists from './Lists';

describe('Logotype component', () => {
  beforeEach(() => {
    window.location.hash = '#lists';
    render(
      <HashRouter hashType="noslash">
        <Route>
          <Lists />
        </Route>
      </HashRouter>,
    );
  });

  test('link "favorite" should change url', () => {
    fireEvent.click(screen.getByTitle('favorite'));
    expect(window.location.hash).toBe('#lists?favorite');
  });

  test('link "watched" change url', () => {
    fireEvent.click(screen.getByTitle('watched'));
    expect(window.location.hash).toBe('#lists?watched');
  });

  test('link "later" change url', () => {
    fireEvent.click(screen.getByTitle('later'));
    expect(window.location.hash).toBe('#lists?later');
  });
});
