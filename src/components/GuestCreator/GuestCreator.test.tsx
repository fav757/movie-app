import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import createMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { generateGuestSession } from '../../api/movieDB/movieDB';
import { changeGuestId } from '../../redux/actions/guestIdActions';
import GuestCreator from './GuestCreator';

jest.mock('../../api/movieDB/movieDB');
jest.mock('../../redux/actions/guestIdActions');

const ProviderWrap = (setValue: boolean): JSX.Element => {
  const configStore = createMockStore();
  const mockStore = configStore({ guestSession: setValue });
  return (
    <Provider store={mockStore}>
      <GuestCreator closeModal={() => {}} />
    </Provider>
  );
};

describe('Guest creator', () => {
  (generateGuestSession as jest.Mock).mockReturnValue(Promise.resolve('123'));
  (changeGuestId as jest.Mock).mockReturnValue({ type: '' });
  beforeEach(() => {
    (generateGuestSession as jest.Mock).mockClear();
    (changeGuestId as jest.Mock).mockClear();
  });

  test('Should call api when button was clicked and guest key is undefined', async () => {
    render(ProviderWrap(false));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(generateGuestSession).toBeCalledTimes(1);
  });

  test("Should't call api when button was clicked and guest key is defined", async () => {
    render(ProviderWrap(true));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(generateGuestSession).not.toBeCalled();
  });

  test('Should call action when button was clicked and guest key is undefined', async () => {
    render(ProviderWrap(false));

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });

    expect(changeGuestId).toBeCalledTimes(1);
  });
});
