import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ArrowToTop from './ArrowToTop';

describe('ArrowTop component', () => {
  test('should call window scrollTo function', () => {
    window.scrollTo = jest.fn();
    const { getByRole } = render(<ArrowToTop />);
    fireEvent.click(getByRole('button'));
    expect(window.scrollTo).toBeCalled();
  });
});
