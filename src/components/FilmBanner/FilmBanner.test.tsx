import React, { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import useFetchData, {
  UseFetchDataType,
} from '../../hooks/fetchData/fetchData';
import FilmBanner from './FilmBanner';

jest.mock('../ControlRow/ControlRow.tsx', () => () => <i />);
jest.mock('../RatingLine/RatingLine.tsx', () => () => <i />);
jest.mock('../PopularityLine/PopularityLine.tsx', () => () => <i />);
jest.mock('../FirmInfo/FirmInfo.tsx', () => () => <i />);
jest.mock('../../hooks/fetchData/fetchData.ts');

const mockFetchDataDecorator = (setData?: boolean) => {
  const mockFetchData: UseFetchDataType = (link, setState) => {
    useEffect(() => {
      setState(
        setData
          ? {
              title: 'movie title',
              poster_path: 'movie_poster',
              release_date: '12/09/1997',
              genres: [
                { name: 'comedy' },
                { name: 'drama' },
                { name: 'history' },
              ],
              overview: 'movie overview',
            }
          : {},
      );
    }, []);
  };

  return mockFetchData;
};

describe('FilmBanner component', () => {
  (useFetchData as jest.Mock).mockImplementation(mockFetchDataDecorator(true));

  afterEach(() => {
    (useFetchData as jest.Mock).mockClear();
  });

  test('should call API', () => {
    render(<FilmBanner showId={1} showType="tv" />);
    expect(useFetchData).toBeCalled();
  });

  test('should use API data', () => {
    render(<FilmBanner showId={1} showType="tv" />);
    expect(screen.getByText('movie title')).toBeInTheDocument();
    expect(screen.getByText(/1997/)).toBeInTheDocument();
    expect(screen.getByText('movie overview')).toBeInTheDocument();
    expect(screen.getByText('comedy, drama, history')).toBeInTheDocument();
  });
});
