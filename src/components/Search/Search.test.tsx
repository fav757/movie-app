import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Search from './Search';

describe('Search component', () => {
  beforeEach(() => {
    render(
      <HashRouter hashType="noslash">
        <Search closeModal={() => {}} />
      </HashRouter>,
    );
  });

  test('should change page if pressed key is Enter and input is not empty', () => {
    const oldHref = window.location.href;
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'changed' },
    });
    fireEvent.keyPress(screen.getByRole('textbox'), { charCode: 13 });
    expect(oldHref).not.toBe(window.location.href);
  });

  test("shouldn't change page if input is empty", () => {
    const oldHref = window.location.href;
    fireEvent.keyPress(screen.getByRole('textbox'), { charCode: 13 });
    expect(oldHref).toBe(window.location.href);
  });

  test("shouldn't change page if pressed key is not Enter", () => {
    const oldUrl = window.location.href;
    fireEvent.keyPress(screen.getByRole('textbox'), { charCode: 65 });
    const newUrl = window.location.href;
    expect(oldUrl).toBe(newUrl);
  });
});
