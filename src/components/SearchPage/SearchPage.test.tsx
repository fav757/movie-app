import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import SearchPage from './SearchPage';

const storeConfig = createMockStore();
const mockStore = storeConfig();

describe('Search component', () => {
  test('should render result according the hash', () => {
    window.location.hash = '#search?request';
    const { getByTestId } = render(
      <Provider store={mockStore}>
        <HashRouter hashType="noslash">
          <SearchPage />
        </HashRouter>
      </Provider>,
    );
    expect(getByTestId('posters header')).toHaveTextContent('request');
  });
});
