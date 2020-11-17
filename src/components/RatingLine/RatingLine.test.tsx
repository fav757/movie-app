import React from 'react';
import { render } from '@testing-library/react';
import RatingLine from './RatingLine';

describe('RatingLine component', () => {
  test('should have smile class if rating more then 6.66', () => {
    render(<RatingLine rating={6.67} />);
    const component = document.querySelector('div.smile');
    expect(component).not.toBeNull();
  });

  test('should have meh class if rating more less then 6.66 but more then 3.33', () => {
    render(<RatingLine rating={6.65} />);
    const component = document.querySelector('div.meh');
    expect(component).not.toBeNull();
  });

  test('should have frown class if rating more less then 3.33', () => {
    render(<RatingLine rating={3.32} />);
    const component = document.querySelector('div.frown');
    expect(component).not.toBeNull();
  });
});
