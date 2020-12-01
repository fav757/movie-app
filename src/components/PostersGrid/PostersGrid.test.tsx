import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React, { useEffect } from 'react';
import PostersGrid from './PostersGrid';
import useFetchData, {
  UseFetchDataType,
} from '../../hooks/fetchData/fetchData';

jest.mock('../../hooks/fetchData/fetchData.ts');
jest.mock('../ActorCard/ActorCard.tsx', () => () => <p>Actor mock</p>);
jest.mock('../Poster/Poster.tsx', () => () => <p>Poster mock</p>);

const mockFetchDataDecorator = (
  setKnownDepartment?: boolean,
): UseFetchDataType => {
  const mockFetchData: UseFetchDataType = (link, setState) => {
    useEffect(() => {
      setState([
        setKnownDepartment
          ? { id: link, known_for_department: true }
          : { id: link },
      ]);
    }, []);
  };

  return mockFetchData;
};

describe('posters grid', () => {
  beforeEach(() => {
    (useFetchData as jest.Mock).mockReset();
    (useFetchData as jest.Mock).mockImplementation(mockFetchDataDecorator());
  });

  test('should call hook', () => {
    render(<PostersGrid header="test" requestLink="http://localshost" />);
    expect(useFetchData).toBeCalled();
  });

  test('should render actors if response values have known department', () => {
    render(<PostersGrid header="test" requestLink="http://localshost" />);
    expect(screen.queryByText('Actor mock')).not.toBeInTheDocument();
    expect(screen.getByText('Poster mock')).toBeInTheDocument();
  });

  test("should render films posters if response values don't have known department", () => {
    (useFetchData as jest.Mock).mockImplementation(
      mockFetchDataDecorator(true),
    );
    render(<PostersGrid header="test" requestLink="http://localshost" />);
    expect(screen.getByText('Actor mock')).toBeInTheDocument();
    expect(screen.queryByText('Poster mock')).not.toBeInTheDocument();
  });
});
