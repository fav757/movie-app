import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ControlRow from './ControlRow';
import { addToList, removeFromList } from '../../redux/actions/listsActions';

jest.mock('../../redux/actions/listsActions');

const mockState = {
  lists: {
    favorite: ['123 movie'],
    watched: [],
    later: [],
  },
};

describe('ControlRow', () => {
  const configureStore = createMockStore();
  const mockStore = configureStore(mockState);
  (addToList as jest.Mock).mockReturnValue({ type: 'test' });
  (removeFromList as jest.Mock).mockReturnValue({ type: 'test' });

  afterEach(() => {
    (addToList as jest.Mock).mockClear();
    (removeFromList as jest.Mock).mockClear();
  });

  test("call add function if item doesn't exists in the state", () => {
    render(
      <Provider store={mockStore}>
        <ControlRow name="757 tv" />
      </Provider>,
    );

    act(() => {
      fireEvent.click(
        document.querySelector('[data-category="favorite"]') as Element,
      );
    });

    expect(addToList).toBeCalledTimes(1);
  });

  test("doesn't call add function if item exists in the state", () => {
    render(
      <Provider store={mockStore}>
        <ControlRow name="123 movie" />
      </Provider>,
    );

    act(() => {
      fireEvent.click(
        document.querySelector('[data-category="favorite"]') as Element,
      );
    });

    expect(addToList).not.toBeCalled();
  });

  test("doesn't call remove function if item doesn't exists in the state", () => {
    render(
      <Provider store={mockStore}>
        <ControlRow name="321 there is no such item in the state" />
      </Provider>,
    );

    act(() => {
      fireEvent.click(
        document.querySelector('[data-category="favorite"]') as Element,
      );
    });

    expect(removeFromList).not.toBeCalled();
  });

  test('call remove function if item exists in the state', () => {
    render(
      <Provider store={mockStore}>
        <ControlRow name="123 movie" />
      </Provider>,
    );

    act(() => {
      fireEvent.click(
        document.querySelector('[data-category="favorite"]') as Element,
      );
    });

    expect(removeFromList).toBeCalledTimes(1);
  });
});
