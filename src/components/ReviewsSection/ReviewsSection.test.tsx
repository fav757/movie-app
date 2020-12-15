import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import ReviewsSection from './ReviewsSection';
import { ReviewData } from '../../@types/movieDB';

const mockData: { results: ReviewData[] } = {
  results: [
    {
      author: 'John Doe',
      author_details: {
        name: 'John Doe',
        username: 'Doe228',
        avatar_path: 'someurl',
        rating: 9,
      },
      content: "John Doe's film review...",
      created_at: '2017-02-20T05:59:47.762Z',
      id: '1',
    },
    {
      author: 'Jane Doe',
      author_details: {
        name: 'Jane Doe',
        username: 'Jane 1337',
        avatar_path: 'anotherurl',
        rating: 8,
      },
      content: "Jane Doe's film review...",
      created_at: '2018-03-20T05:59:47.762Z',
      id: '21',
    },
  ],
};

describe('Review component', () => {
  test('should render reviews equal to incoming data amount', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve(new Response(JSON.stringify(mockData))),
    );

    await act(async () => {
      render(<ReviewsSection showId={1} showType="tv" />);
    });

    expect(screen.getByTestId('reviews container').children.length).toBe(2);
  });

  test('should match snapshot without correct data', async () => {
    (global.fetch as jest.Mock) = jest.fn(() =>
      Promise.resolve(new Response(null)),
    );

    await act(async () => {
      render(<ReviewsSection showId={87739} showType="error" />);
    });

    expect(
      screen.getByTestId('reviews container').firstElementChild,
    ).toHaveTextContent("Error ocurred. We can't load reviews");
  });
});
