import React from 'react';
import { cleanup, render } from '@testing-library/react';
import FirmInfo from './FirmInfo';

describe('FirmInfo component', () => {
  afterEach(() => cleanup());

  test('should display firms information if provided array', () => {
    const companiesData = [
      {
        name: 'company №1',
        origin_country: 'Ukraine',
      },
      {
        name: 'company №2',
      },
    ];
    render(<FirmInfo companies={companiesData} />);

    const [company1, company2] = document.querySelectorAll('span');
    expect(company1.textContent).toBe('company №1 (Ukraine)');
    expect(company2.textContent).toBe('company №2 ');
  });

  test('shouldn\'t display firms information if array wasn\'t provided', () => {
    render(<FirmInfo />);

    expect(document.querySelector('span')).toBeNull();
  });
});
