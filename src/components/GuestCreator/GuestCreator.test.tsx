import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuestCreator from './GuestCreator';
import { generateGuestSession } from '../../api/movieDB/movieDB';

jest.mock('../../api/movieDB/movieDB');

describe('Guest creator', () => {
  (generateGuestSession as jest.Mock).mockReturnValue(Promise.resolve(true));

  beforeEach(() => {
    (generateGuestSession as jest.Mock).mockClear();
  });

  test('Should call api when button was clicked and local storage has no key', async () => {
    render(<GuestCreator />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(generateGuestSession).toBeCalledTimes(1);
  });

  test("Should't call api when button was clicked and local storage has key", async () => {
    localStorage.setItem('sessionId', '123');
    render(<GuestCreator />);

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(generateGuestSession).not.toBeCalled();
  });

  test('Should change view when button was clicked and local storage has no key', async () => {
    localStorage.clear();
    render(<GuestCreator />);

    expect(screen.getByRole('button')).toHaveAttribute(
      'title',
      "Looks like you didn't generate you guest session or an error has occured",
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(screen.getByRole('button')).toHaveAttribute(
      'title',
      'You have successfuly generated guest session',
    );
  });

  test("Shouldn't change view when button was clicked and local storage has key", async () => {
    localStorage.setItem('sessionId', '123');
    render(<GuestCreator />);

    expect(screen.getByRole('button')).toHaveAttribute(
      'title',
      'You have successfuly generated guest session',
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(screen.getByRole('button')).toHaveAttribute(
      'title',
      'You have successfuly generated guest session',
    );
  });
});
