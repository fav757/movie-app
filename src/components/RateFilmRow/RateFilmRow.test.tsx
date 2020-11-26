import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RateFilmRow from './RateFilmRow';

localStorage.setItem('sessionId', '123');

describe('RateFilmRow component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            status_message: 'mock message',
          }),
        ),
      ),
    );
    render(<RateFilmRow showId={1} showType="movie" />);
  });

  test('should call api on click if session id was provided', async () => {
    await act(async () => {
      fireEvent.click(screen.getByTitle('1'));
    });
    expect(global.fetch).toBeCalled();
  });

  test('should call api on key press session id was provided', async () => {
    await act(async () => {
      fireEvent.keyPress(screen.getByTitle('1'), { charCode: 13 });
    });
    expect(global.fetch).toBeCalled();
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
    localStorage.clear();
    render(<RateFilmRow showId={1} showType="movie" />);
    expect(
      screen.getByText(
        "Too rate media you needed to create guest session (it doesn't reqiure registaration, just click on user icon in the top menu)",
      ),
    ).toBeInTheDocument();
  });
});
