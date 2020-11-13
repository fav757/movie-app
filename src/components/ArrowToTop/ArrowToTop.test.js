import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ArrowToTop from './ArrowToTop';

describe('ArrowTop component', () => {
  test('should call window scrollTo function', () => {
    window.scrollTo = jest.fn();
    const { container } = render(<ArrowToTop />);
    fireEvent.click(container.firstElementChild);
    expect(window.scrollTo).toBeCalled();
  });
});
