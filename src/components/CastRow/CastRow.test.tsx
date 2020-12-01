import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useFetchData from '../../hooks/fetchData/fetchData';
import CastRow from './CastRow';
import { Actor } from '../ActorCard/ActorCard';

jest.mock('../../hooks/fetchData/fetchData.ts');
jest.mock('../ActorCard/ActorCard.tsx', () => ({ actor }: { actor: Actor }) => (
  <p>{actor.name}</p>
));

const mockActorsData = {
  cast: [{ name: 'Alex' }, { name: 'Joe' }],
};

describe('CastRow component', () => {
  test('should display information cards about actors if api sets data', () => {
    (useFetchData as jest.Mock).mockImplementationOnce((link, setState) => {
      setState(mockActorsData);
    });
    render(<CastRow filmId={1} showType="movie" />);
    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Joe')).toBeInTheDocument();
  });

  test('should display information cards about actors if api sets data', () => {
    (useFetchData as jest.Mock).mockImplementationOnce((link, setState) => {
      setState({});
    });
    render(<CastRow filmId={1} showType="movie" />);
    expect(screen.queryByText('Alex')).not.toBeInTheDocument();
    expect(screen.queryByText('Joe')).not.toBeInTheDocument();
    expect(
      screen.getByText('No information about the cast'),
    ).toBeInTheDocument();
  });
});
