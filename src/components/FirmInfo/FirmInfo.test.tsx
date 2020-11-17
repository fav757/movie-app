import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import FirmInfo from './FirmInfo';

describe('FirmInfo component', () => {
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
    expect(company1).toHaveTextContent('company №1 (Ukraine)');
    expect(company2).toHaveTextContent('company №2');
  });

  test("shouldn't display firms information if array wasn't provided", () => {
    render(<FirmInfo companies={[]} />);

    expect(document.querySelector('span')).toBeNull();
  });
});
