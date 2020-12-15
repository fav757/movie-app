import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { loadData } from '../../api/movieDB/movieDB';
import FilmBanner from './FilmBanner';

jest.mock('../ControlRow/ControlRow.tsx', () => () => <i />);
jest.mock('../RatingLine/RatingLine.tsx', () => () => <i />);
jest.mock('../PopularityLine/PopularityLine.tsx', () => () => <i />);
jest.mock('../FirmInfo/FirmInfo.tsx', () => () => <i />);
jest.mock('../RateFilmRow/RateFilmRow', () => () => <i />);
jest.mock('../../api/movieDB/movieDB');

(window.scrollTo as jest.Mock) = jest.fn();

const mockData = {
  title: 'movie title',
  poster_path: 'movie_poster',
  release_date: '12/09/1997',
  genres: [{ name: 'comedy' }, { name: 'drama' }, { name: 'history' }],
  overview: 'movie overview',
};

describe('FilmBanner component', () => {
  (loadData as jest.Mock).mockImplementation((url, setData) =>
    setData(mockData),
  );

  beforeEach(() => {
    (loadData as jest.Mock).mockClear();
  });

  test('should call API', () => {
    render(<FilmBanner showId={1} showType="tv" />);
    expect(loadData).toBeCalled();
  });

  test('should use API data', () => {
    render(<FilmBanner showId={1} showType="tv" />);
    expect(screen.getByText('movie title')).toBeInTheDocument();
    expect(screen.getByText(/1997/)).toBeInTheDocument();
    expect(screen.getByText('movie overview')).toBeInTheDocument();
    expect(screen.getByText('comedy, drama, history')).toBeInTheDocument();
  });
});
