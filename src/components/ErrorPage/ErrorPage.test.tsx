import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter, Route } from 'react-router-dom';
import ErrorPage from './ErrorPage';

describe('ArrowTop component', () => {
  test('should display information if there is not such page', () => {
    const { getByText } = render(
      <HashRouter hashType="noslash">
        <Route component={ErrorPage} />
      </HashRouter>,
    );

    expect(
      getByText('Unfortunately, we cant find such page on this website.'),
    ).toBeInTheDocument();
    expect(
      getByText(
        "We're sorry to inform you that we can't display the page you looked for.",
      ),
    ).toBeInTheDocument();
    expect(getByText(/Also you can continue from the.*/)).toBeInTheDocument();
  });

  test('should have link to the home page', () => {
    const { getByRole } = render(
      <HashRouter hashType="noslash">
        <Route component={ErrorPage} />
      </HashRouter>,
    );
    window.location.hash = '#home';
    fireEvent.click(getByRole('link'));
    expect(window.location.href).toBe('http://localhost/');
  });
});
