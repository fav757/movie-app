import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter, Route } from 'react-router-dom';
import { GlobalContext } from '../../globalState';
import SearchPage from './SearchPage';

describe('Search component', () => {
  test('should render result according the hash', () => {
    window.location.hash = '#search?request';
    const { getByTestId } = render(
      <GlobalContext>
        <HashRouter hashType="noslash">
          <Route component={SearchPage} />
        </HashRouter>
      </GlobalContext>,
    );
    expect(getByTestId('posters header')).toHaveTextContent('request');
  });
});
