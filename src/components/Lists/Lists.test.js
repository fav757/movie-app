import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { HashRouter, Route } from 'react-router-dom';
import Lists from './Lists';

describe('Logotype component', () => {
  let getByTitle;
  beforeEach(() => {
    window.location.hash = '#lists';
    getByTitle = render(
      <HashRouter hashType='noslash'>
        <Route>
          <Lists />
        </Route>
      </HashRouter>
    ).getByTitle;
  });

  test('link "favorite" should change url', () => {
    fireEvent.click(getByTitle('favorite'));
    expect(window.location.hash).toBe('#lists?favorite');
  });

  test('link "watched" change url', () => {
    fireEvent.click(getByTitle('watched'));
    expect(window.location.hash).toBe('#lists?watched');
  });

  test('link "later" change url', () => {
    fireEvent.click(getByTitle('later'));
    expect(window.location.hash).toBe('#lists?later');
  });
});
