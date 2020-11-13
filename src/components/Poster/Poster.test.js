import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Poster from './Poster';
import { HashRouter, Route } from 'react-router-dom';
import { GlobalContext } from '../../globalState';

describe('PopularityLine component', () => {
  test('Should render if correct data was provided', () => {
    const data = {
      title: 'film title',
      poster_path: '/imgurl.png',
      first_air_date: '2020/10/10',
      id: '757',
      overview: 'overview information',
      genre_ids: [16, 35],
    };
    const { getByAltText, getByRole, getByTestId } = render(
      <HashRouter hashType='noslash'>
        <Route>
          <Poster data={data} />
        </Route>
      </HashRouter>
    );

    expect(getByAltText('poster').src).toBe(
      'https://image.tmdb.org/t/p/w500/imgurl.png'
    );
    expect(getByRole('link').href).toBe('http://localhost/#tv?id=757');
    expect(document.querySelector('h3').textContent).toBe('film title');
    expect(getByTestId('date paragraph').textContent).toBe('2020');
    expect(getByTestId('overview paragraph').textContent).toBe(
      'overview information'
    );
    expect(document.querySelector('b').textContent).toBe('Animation, Comedy');

    cleanup();
  });

  test('Should render if alternative correct data was provided', () => {
    const data = {
      name: 'film title',
      poster_path: '/imgurl.png',
      release_date: '2020/10/10',
      id: '757',
      overview: 'overview information',
      genre_ids: [16, 35],
    };
    const { getByAltText, getByRole, getByTestId } = render(
      <HashRouter hashType='noslash'>
        <Route>
          <Poster data={data} />
        </Route>
      </HashRouter>
    );

    expect(getByAltText('poster').src).toBe(
      'https://image.tmdb.org/t/p/w500/imgurl.png'
    );
    expect(getByRole('link').href).toBe('http://localhost/#movie?id=757');
    expect(document.querySelector('h3').textContent).toBe('film title');
    expect(getByTestId('date paragraph').textContent).toBe('2020');
    expect(getByTestId('overview paragraph').textContent).toBe(
      'overview information'
    );
    expect(document.querySelector('b').textContent).toBe('Animation, Comedy');

    cleanup();
  });

  test("Should render with fallbacks if correct data wasn't provided", () => {
    const { getByAltText, getByRole, getByTestId } = render(
      <HashRouter hashType='noslash'>
        <Route>
          <Poster data={{}} />
        </Route>
      </HashRouter>
    );

    expect(getByAltText('poster').src).toBe('http://localhost/noPoster.png');
    expect(getByRole('link').href).toBe('http://localhost/#error');
    expect(document.querySelector('h3').textContent).toBe('No title');
    expect(getByTestId('date paragraph').textContent).toBe('xxxx');
    expect(getByTestId('overview paragraph').textContent).toBe(
      'no description'
    );
    expect(document.querySelector('b').textContent).toBe('');

    cleanup();
  });

  test('Should render Controll row on context menu', () => {
    const data = {
      first_air_date: '2020/10/10',
      id: '757',
    };
    const { getByRole, getByTestId, queryByRole } = render(
      <GlobalContext>
        <HashRouter hashType='noslash'>
          <Route>
            <Poster data={data} />
          </Route>
        </HashRouter>
      </GlobalContext>
    );

    expect(queryByRole('controll row')).toBeNull();
    fireEvent.contextMenu(getByRole('link'));
    expect(getByTestId('controll row')).toBeTruthy();

    cleanup();
  });

  test('Should close Controll row on click', () => {
    const data = {
      first_air_date: '2020/10/10',
      id: '757',
    };
    const { getByRole, getByTestId, queryByRole } = render(
      <GlobalContext>
        <HashRouter hashType='noslash'>
          <Route>
            <Poster data={data} />
          </Route>
        </HashRouter>
      </GlobalContext>
    );

    fireEvent.contextMenu(getByRole('link'));
    expect(getByTestId('controll row')).toBeTruthy();
    fireEvent.click(document.body);
    expect(queryByRole('controll row')).toBeNull();

    cleanup();
  });
});
