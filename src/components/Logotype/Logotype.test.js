import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
import Logotype from './Logotype';
import { HashRouter, Route } from 'react-router-dom';

describe('Logotype component', () => {
  let getByRole;
  beforeEach(
    () =>
      (getByRole = render(
        <HashRouter hashType='noslash'>
          <Route component={Logotype} />
        </HashRouter>
      ).getByRole)
  );
  afterEach(() => cleanup());

  test("should change change the page if it's not initial page", () => {
    window.location.hash = '#wrong_url';
    fireEvent.click(getByRole('link'));
    expect(window.location.hash).toBe('');
  });

  test("shouldn't change change the page if it's initial page", () => {
    fireEvent.click(getByRole('link'));
    expect(window.location.hash).toBe('');
  });
});
