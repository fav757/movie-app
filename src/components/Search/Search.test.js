import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Search from './Search';
import { HashRouter, Route } from 'react-router-dom';

describe('Search component', () => {
  let getByRole;

  beforeEach(() => {
    getByRole = render(
      <HashRouter hashType='noslash'>
        <Route component={Search} />
      </HashRouter>
    ).getByRole;
  });

  afterEach(() => cleanup());

  test('should change page if pressed key is Enter and input is not empty', () => {
    const oldHref = window.location.href;
    fireEvent.change(getByRole('textbox'), { target: { value: 'changed' } });
    fireEvent.keyPress(getByRole('textbox'), { charCode: 13 });
    expect(oldHref).not.toBe(window.location.href);
  });

  test("shouldn't change page if input is empty", () => {
    const oldHref = window.location.href;
    fireEvent.keyPress(getByRole('textbox'), { charCode: 13 });
    expect(oldHref).toBe(window.location.href);
  });

  test("shouldn't change page if pressed key is not Enter", () => {
    const oldUrl = window.location.href;
    fireEvent.keyPress(getByRole('textbox'), { charCode: 65 });
    const newUrl = window.location.href;
    expect(oldUrl).toBe(newUrl);
  });
});
