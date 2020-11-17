import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter, Route } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage component', () => {
  test('should render tranding section on initial page', () => {
    const { getByTestId } = render(
      <HashRouter hashType="noslash">
        <Route component={HomePage} />
      </HashRouter>,
    );

    expect(getByTestId('posters header')).toHaveTextContent('Tranding');
  });

  test('should render tranding section if location matches', () => {
    window.location.hash = '#home/tranding';

    const { getByTestId } = render(
      <HashRouter hashType="noslash">
        <Route component={HomePage} />
      </HashRouter>,
    );

    expect(getByTestId('posters header')).toHaveTextContent('Tranding');
  });

  test('should render top films if location matches', () => {
    window.location.hash = '#home/movie-top';

    const { getByTestId } = render(
      <HashRouter hashType="noslash">
        <Route component={HomePage} />
      </HashRouter>,
    );

    expect(getByTestId('posters header')).toHaveTextContent('Top rated movies');
  });

  test('should render top tv series if location matches', () => {
    window.location.hash = '#home/tv-top';

    const { getByTestId } = render(
      <HashRouter hashType="noslash">
        <Route component={HomePage} />
      </HashRouter>,
    );

    expect(getByTestId('posters header')).toHaveTextContent(
      'Top rated tv series',
    );
  });
});
