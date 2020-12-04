import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React, { useState } from 'react';
import useFetchData from './fetchData';

(global.fetch as jest.Mock) = jest.fn(
  (link: string) => new Response(JSON.stringify({ link })),
);

interface MockComponentInterface {
  link: string | string[];
}
const MockComponent: React.FC<MockComponentInterface> = ({ link }) => {
  const [state, setState] = useState({ link: '' });
  useFetchData(link, setState);
  const data = Array.isArray(state)
    ? state.map((value) => value.link)
    : state.link;

  return <div data-testid="mock-component">{data}</div>;
};

describe('fetchData hook', () => {
  test('should call api', async () => {
    await act(async () => {
      render(<MockComponent link="http://localhost/" />);
    });
    expect(fetch).toBeCalledTimes(1);
  });

  test('should work with single link', async () => {
    await act(async () => {
      render(<MockComponent link="http://localhost/" />);
    });
    expect(screen.getByTestId('mock-component')).toHaveTextContent(
      'http://localhost/',
    );
  });

  test('should work with single link', async () => {
    const links = [
      'http://localhost/1',
      'http://localhost/2',
      'http://localhost/3',
    ];

    await act(async () => {
      render(<MockComponent link={links} />);
    });
    expect(screen.getByTestId('mock-component')).toHaveTextContent(
      'http://localhost/1http://localhost/2http://localhost/3',
    );
  });
});
