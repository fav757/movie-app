import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter, Route } from 'react-router-dom';
import { GlobalContext } from '../../globalState';
import Poster from './Poster';

describe('PopularityLine component', () => {
  test('Should render if correct data was provided', () => {
    const data = {
      id: 757,
      title: 'film title',
      poster_path: '/imgurl.png',
      first_air_date: '2020/10/10',
      overview: 'overview information',
      genre_ids: [16, 35],
    };
    const { getByAltText, getByRole, getByTestId } = render(
      <HashRouter hashType="noslash">
        <Route>
          <Poster data={data} />
        </Route>
      </HashRouter>,
    );

    expect(getByAltText('poster')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/imgurl.png',
    );
    expect(getByRole('link')).toHaveAttribute('href', '#tv?id=757');
    expect(document.querySelector('h3')).toHaveTextContent('film title');
    expect(getByTestId('date paragraph')).toHaveTextContent('2020');
    expect(getByTestId('overview paragraph')).toHaveTextContent(
      'overview information',
    );
    expect(document.querySelector('b')).toHaveTextContent('Animation, Comedy');
  });

  test('Should render if alternative correct data was provided', () => {
    const data = {
      name: 'film title',
      poster_path: '/imgurl.png',
      release_date: '2020/10/10',
      id: 123,
      overview: 'overview information',
      genre_ids: [16, 35],
    };
    const { getByAltText, getByRole, getByTestId } = render(
      <HashRouter hashType="noslash">
        <Route>
          <Poster data={data} />
        </Route>
      </HashRouter>,
    );

    expect(getByAltText('poster')).toHaveAttribute(
      'src',
      'https://image.tmdb.org/t/p/w500/imgurl.png',
    );
    expect(getByRole('link')).toHaveAttribute('href', '#movie?id=123');
    expect(document.querySelector('h3')).toHaveTextContent('film title');
    expect(getByTestId('date paragraph')).toHaveTextContent('2020');
    expect(getByTestId('overview paragraph')).toHaveTextContent(
      'overview information',
    );
    expect(document.querySelector('b')).toHaveTextContent('Animation, Comedy');
  });

  test("Should render with fallbacks if correct data wasn't provided", () => {
    const { getByAltText, getByRole, getByTestId } = render(
      <HashRouter hashType="noslash">
        <Route>
          <Poster data={{ id: 0 }} />
        </Route>
      </HashRouter>,
    );

    expect(getByAltText('poster')).toHaveAttribute('src', 'noPoster.png');
    expect(getByRole('link')).toHaveAttribute('href', '#error');
    expect(document.querySelector('h3')).toHaveTextContent('No title');
    expect(getByTestId('date paragraph')).toHaveTextContent('xxxx');
    expect(getByTestId('overview paragraph')).toHaveTextContent(
      'no description',
    );
    expect(document.querySelector('b')).toHaveTextContent('');
  });

  test('Should render Controll row on context menu', () => {
    const data = {
      id: 444,
    };
    const { getByRole, getByTestId, queryByRole } = render(
      <GlobalContext>
        <HashRouter hashType="noslash">
          <Route>
            <Poster data={data} />
          </Route>
        </HashRouter>
      </GlobalContext>,
    );

    expect(queryByRole('controll row')).not.toBeInTheDocument();
    fireEvent.contextMenu(getByRole('link'));
    expect(getByTestId('controll row')).toBeInTheDocument();
  });

  test('Should close Controll row on click', () => {
    const data = {
      id: 321,
    };
    const { getByRole, getByTestId, queryByRole } = render(
      <GlobalContext>
        <HashRouter hashType="noslash">
          <Route>
            <Poster data={data} />
          </Route>
        </HashRouter>
      </GlobalContext>,
    );

    fireEvent.contextMenu(getByRole('link'));
    expect(getByTestId('controll row')).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(queryByRole('controll row')).not.toBeInTheDocument();
  });
});
