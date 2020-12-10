import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import staticFormsRequest from '../../utilities/staticFormsRequest/staticFormsRequest';
import ContactForm from './ContactForm';

jest.mock('../../utilities/staticFormsRequest/staticFormsRequest.ts');

describe('ContactForm component', () => {
  let container: HTMLElement;
  beforeEach(() => {
    (staticFormsRequest as jest.Mock).mockReset();
    container = render(<ContactForm />).container;
    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });
  });

  test('should open and close modal window on button click', () => {
    expect(container.children.length).toBe(2);

    act(() => {
      fireEvent.click(
        container.querySelector(
          'button[aria-label="close modal"]',
        ) as HTMLElement,
      );
    });

    expect(container.children.length).toBe(1);
  });

  test('should not call api when at least one input is empty', async () => {
    act(() => {
      fireEvent.change(screen.getByLabelText('Name:'), {
        target: { value: 'test' },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText('Email:'), {
        target: { value: 'test' },
      });
    });

    await act(async () => {
      fireEvent.click(
        container.querySelector(
          'button[aria-label="send message"]',
        ) as HTMLElement,
      );
    });

    expect(staticFormsRequest).not.toBeCalled();
  });

  test('should call api and chagne text and block button on success request', async () => {
    (staticFormsRequest as jest.Mock).mockReturnValueOnce(
      Promise.resolve(true),
    );

    act(() => {
      fireEvent.change(screen.getByLabelText('Name:'), {
        target: { value: 'test' },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText('Email:'), {
        target: { value: 'test' },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText('Message:'), {
        target: { value: 'test' },
      });
    });

    await act(async () => {
      fireEvent.click(
        container.querySelector(
          'button[aria-label="send message"]',
        ) as HTMLElement,
      );
    });
    expect(staticFormsRequest).toBeCalledTimes(1);
    expect(
      container.querySelector('button[aria-label="send message"]'),
    ).toBeDisabled();
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  test('should call api and chagne text and do not block button on false request', async () => {
    (staticFormsRequest as jest.Mock).mockReturnValueOnce(
      Promise.resolve(false),
    );

    act(() => {
      fireEvent.change(screen.getByLabelText('Name:'), {
        target: { value: 'test' },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText('Email:'), {
        target: { value: 'test' },
      });
    });
    act(() => {
      fireEvent.change(screen.getByLabelText('Message:'), {
        target: { value: 'test' },
      });
    });

    await act(async () => {
      fireEvent.click(
        container.querySelector(
          'button[aria-label="send message"]',
        ) as HTMLElement,
      );
    });
    expect(staticFormsRequest).toBeCalledTimes(1);
    expect(
      container.querySelector('button[aria-label="send message"]'),
    ).toBeEnabled();
    expect(screen.getByText('Fail, try again please')).toBeInTheDocument();
  });
});
