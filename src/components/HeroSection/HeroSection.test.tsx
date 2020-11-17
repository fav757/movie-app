import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeroSection from './HeroSection';

describe('HeroSection component', () => {
  test('should render nesseassary structure', () => {
    const { getByTestId, getByRole } = render(<HeroSection />);

    expect(getByRole('heading', { name: 'Error' })).toBeInTheDocument();
    expect(getByTestId('bold film data')).toBeInTheDocument();
    expect(getByTestId('movie overview')).toBeInTheDocument();
    expect(getByTestId('movie ratings').children.length).toBe(2);
  });
});
