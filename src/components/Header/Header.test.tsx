import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from './Header';

jest.mock('../Logotype/Logotype', () => () => <i data-testid="Logotype" />);
jest.mock('../Search/Search.tsx', () => () => <i data-testid="Search" />);
jest.mock('../Navigation/Navigation.tsx', () => () => (
  <i data-testid="Navigation" />
));

describe('Header component', () => {
  test('should render logotype, navigation and search', () => {
    render(<Header />);
    expect(screen.getByTestId('Logotype')).toBeInTheDocument();
    expect(screen.getByTestId('Search')).toBeInTheDocument();
    expect(screen.getByTestId('Navigation')).toBeInTheDocument();
  });

  test('should render logotype, navigation and search', () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
