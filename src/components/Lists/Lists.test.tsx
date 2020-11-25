import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import Lists from './Lists';

const initialState = {
  lists: {
    favorite: [],
    watched: [],
    later: [],
  },
};

const configStore = createMockStore();
const mockStore = configStore(initialState);

describe('Link component', () => {
  beforeEach(() => {
    window.location.hash = '#lists';
    render(
      <Provider store={mockStore}>
        <HashRouter hashType="noslash">
          <Lists />
        </HashRouter>
      </Provider>,
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
