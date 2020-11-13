import React from 'react';
import { cleanup, render } from '@testing-library/react';
import PopularityLine from './PopularityLine';

describe('PopularityLine component', () => {
  test('Should show floored popularity of component', () => {
    render(<PopularityLine popularity={5.99} />);
    expect(+document.querySelector('span').textContent).toBe(5);
    cleanup();
  });
});
