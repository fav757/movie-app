import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Review, { ReviewDataInterface } from './Review';
import avatarPlaceholder from '../../assets/images/avatarPlaceholder.png';

const mockData: ReviewDataInterface = {
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
};

describe('Review component', () => {
  test('should render component with correct data', () => {
    render(<Review reviewData={mockData} />);
    expect(screen.getByAltText('author avatar')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/original/someurl',
    );
    expect(screen.getByRole('heading')).toHaveTextContent('Author: John Doe');
    expect(screen.getByText('Created: 2017-2-20')).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveTextContent('Rating: 9');
  });

  test('should render component even if correct data was not provided', () => {
    render(<Review reviewData={{}} />);
    expect(screen.getByAltText('author avatar')).toHaveAttribute(
      'src',
      avatarPlaceholder,
    );
    expect(screen.getByRole('heading')).toHaveTextContent('Author:');
    expect(screen.getByText('Created: Invalid Date')).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveTextContent('Rating: 0');
  });
});
