import React from 'react';
import { render } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection component', () => {
  test('should render nesseassary structure', () => {
    const { getByTestId, getByRole } = render(<HeroSection />);

    expect(getByRole('heading', { name: 'Error' }).textContent).toBeTruthy();
    expect(getByTestId('bold film data').textContent).toBeTruthy();
    expect(getByTestId('movie overview').textContent).toBeTruthy();
    expect(getByTestId('movie ratings').children.length).toBe(2);
  });
});
