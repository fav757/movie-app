import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import PostersGrid from './PostersGrid';
import { loadData } from '../../api/movieDB/movieDB';

jest.mock('../../api/movieDB/movieDB');
jest.mock('../ActorCard/ActorCard.tsx', () => () => <p>Actor mock</p>);
jest.mock('../Poster/Poster.tsx', () => () => <p>Poster mock</p>);

describe('posters grid', () => {
  beforeEach(() => {
    (loadData as jest.Mock).mockClear();
  });

  test('should call api', () => {
    (loadData as jest.Mock).mockImplementationOnce((url, setData) =>
      setData([{ id: '0' }]),
    );
    render(<PostersGrid header="test" requestLink="" />);
    expect(loadData).toBeCalledTimes(1);
  });

  test("should render films posters if response values don't have known department", () => {
    (loadData as jest.Mock).mockImplementationOnce((url, setData) =>
      setData([{ id: '1' }]),
    );
    render(<PostersGrid header="test1" requestLink="1" />);
    expect(screen.queryByText('Actor mock')).not.toBeInTheDocument();
    expect(screen.getByText('Poster mock')).toBeInTheDocument();
  });

  test('should render actors if response values have known department', () => {
    (loadData as jest.Mock).mockImplementation((url, setData) =>
      setData([{ id: '2', known_for_department: true }]),
    );
    render(<PostersGrid header="test2" requestLink="2" />);
    expect(screen.getByText('Actor mock')).toBeInTheDocument();
    expect(screen.queryByText('Poster mock')).not.toBeInTheDocument();
  });
});
