import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { HashRouter, Route } from 'react-router-dom';
import Logotype from './Logotype';

describe('Logotype component', () => {
  beforeEach(() => {
    render(
      <HashRouter hashType="noslash">
        <Route component={Logotype} />
      </HashRouter>,
    );
  });

  test("should change change the page if it's not initial page", () => {
    window.location.hash = '#wrong_url';
    fireEvent.click(screen.getByRole('link'));
    expect(window.location.hash).toBe('');
  });

  test("shouldn't change change the page if it's initial page", () => {
    fireEvent.click(screen.getByRole('link'));
    expect(window.location.hash).toBe('');
  });
});
