import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ActorCard from './ActorCard';

describe('FirmInfo component', () => {
  afterEach(() => cleanup());

  test('should display person data if information was provided', () => {
    const actorInfo = {
      name: 'John Doe',
      profile_path: '/picUrl',
      gender: 0,
      character: 'developer',
    };

    const { getByTestId, getByAltText, getByTitle } = render(
      <ActorCard actor={actorInfo} />
    );

    expect(getByAltText('actor avatar').src).toBe(
      'https://image.tmdb.org/t/p/w500/picUrl'
    );
    expect(getByTestId('actor name').textContent).toBe('John Doe ');
    expect(getByTitle('gender').classList[1].slice(3)).toBe('mars');
    expect(getByTestId('character | popularity').textContent).toBe(
      '(developer)'
    );
  });

  test('should display person data with alternative information', () => {
    const actorInfo = {
      name: 'Jane Doe',
      gender: 1,
      popularity: 6.53,
    };

    const { getByTestId, getByAltText, getByTitle } = render(
      <ActorCard actor={actorInfo} />
    );

    expect(getByAltText('actor avatar').src).toMatch('/avatarPlaceholder.png');
    expect(getByTestId('actor name').textContent).toBe('Jane Doe ');
    expect(getByTitle('gender').classList[1].slice(3)).toBe('venus');
    expect(
      getByTestId('character | popularity').firstElementChild
    ).toBeDefined();
  });

  test("should display fallbacks if info wans't provided", () => {
    const { getByTestId, getByAltText, getByTitle } = render(<ActorCard />);

    expect(getByAltText('actor avatar').src).toMatch('/avatarPlaceholder.png');
    expect(getByTestId('actor name').textContent).toBe('No Name ');
    expect(getByTitle('gender').classList[1].slice(3)).toBe('mars');
    expect(
      getByTestId('character | popularity').firstElementChild
    ).toBeDefined();
  });
});
