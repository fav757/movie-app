import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import RateFilmRow from './RateFilmRow';
import { rateTitle } from '../../api/movieDB/movieDB';

jest.mock('../../api/movieDB/movieDB');

const initialState = {
  guestSession: '123',
};

const configStore = createMockStore();
const mockStore = configStore(initialState);

describe('RateFilmRow component', () => {
  (rateTitle as jest.Mock).mockImplementation((q, w, e, r, setState) => {
    setState('mock message');
  });

  beforeEach(() => {
    (rateTitle as jest.Mock).mockClear();

    render(
      <Provider store={mockStore}>
        <RateFilmRow showId={1} showType="movie" />
      </Provider>,
    );
  });

  test('should call api on click if session id was provided', async () => {
    await act(async () => {
      fireEvent.click(screen.getByTitle('1'));
    });
    expect(rateTitle).toBeCalled();
  });

  test('should call api on key press session id was provided', async () => {
    await act(async () => {
      fireEvent.keyPress(screen.getByTitle('1'), { charCode: 13 });
    });
    expect(rateTitle).toBeCalled();
  });

  test('should change view after click session id was provided', async () => {
    expect(screen.queryByText('mock message')).not.toBeInTheDocument();
    await act(async () => {
      fireEvent.keyPress(screen.getByTitle('1'), { charCode: 13 });
    });
    expect(screen.queryByText('mock message')).toBeInTheDocument();
  });

  test("should show corresponding info if session id wasn't provided", () => {
    cleanup();
    const config = createMockStore();
    const store = config({ guestSession: '' });

    render(
      <Provider store={store}>
        <RateFilmRow showId={1} showType="movie" />
      </Provider>,
    );

    expect(
      screen.getByText(
        "Too rate media you needed to create guest session (it doesn't reqiure registaration, just click on user icon in the top menu)",
      ),
    ).toBeInTheDocument();
  });
});
