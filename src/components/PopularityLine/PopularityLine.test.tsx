import React from 'react';
import { render } from '@testing-library/react';
import PopularityLine from './PopularityLine';

describe('PopularityLine component', () => {
  test('Should show floored popularity of component', () => {
    render(<PopularityLine popularity={5.99} />);
    const element = document.querySelector('span');
    expect(Number(element?.textContent)).toBe(5);
  });
});
