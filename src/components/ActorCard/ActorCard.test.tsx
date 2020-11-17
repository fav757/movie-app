import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import ActorCard from './ActorCard';

describe('FirmInfo component', () => {
  test('should display person data if information was provided', () => {
    const actorInfo = {
      name: 'John Doe',
      profile_path: '/picUrl',
      gender: 0,
      character: 'developer',
    };

    render(<ActorCard actor={actorInfo} />);

    expect(screen.getByAltText('actor avatar')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/picUrl',
    );
    expect(screen.getByTestId('actor name')).toHaveTextContent('John Doe');
    expect(screen.getByTitle('gender')).toHaveClass('fa-mars');
    expect(screen.getByTestId('character | popularity')).toHaveTextContent(
      '(developer)',
    );
  });

  test('should display person data with alternative information', () => {
    const actorInfo = {
      name: 'Jane Doe',
      gender: 1,
      popularity: 6.53,
    };

    render(<ActorCard actor={actorInfo} />);

    expect(screen.getByAltText('actor avatar')).toHaveAttribute(
      'src',
      'avatarPlaceholder.png',
    );
    expect(screen.getByTestId('actor name')).toHaveTextContent('Jane Doe');
    expect(screen.getByTitle('gender')).toHaveClass('fa-venus');
    expect(
      screen.getByTestId('character | popularity').firstElementChild,
    ).toBeInTheDocument();
  });

  test("should display fallbacks if info wans't provided", () => {
    render(<ActorCard actor={{}} />);

    expect(screen.getByAltText('actor avatar')).toHaveAttribute(
      'src',
      'avatarPlaceholder.png',
    );
    expect(screen.getByTestId('actor name')).toHaveTextContent('No Name');
    expect(screen.getByTitle('gender')).toHaveClass('fa-mars');
    expect(
      screen.getByTestId('character | popularity').firstElementChild,
    ).toBeInTheDocument();
  });
});
