import React from 'react';
import { cleanup, render } from '@testing-library/react';
import RatingLine from './RatingLine';

describe('RatingLine component', () => {
  afterEach(() => cleanup());

  test('should have smile class if rating more then 6.66', () => {
    render(<RatingLine rating={6.67} />);
    expect(
      document.querySelector('div.container').classList.contains('smile')
    ).toBeTruthy();
  });

  test('should have meh class if rating more less then 6.66 but more then 3.33', () => {
    render(<RatingLine rating={6.65} />);
    expect(
      document.querySelector('div.container').classList.contains('meh')
    ).toBeTruthy();
  });

  test('should have frown class if rating more less then 3.33', () => {
    render(<RatingLine rating={3.32} />);
    expect(
      document.querySelector('div.container').classList.contains('frown')
    ).toBeTruthy();
  });
});
