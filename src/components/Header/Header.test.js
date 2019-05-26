import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import 'jest-dom/extend-expect';

import { HeaderWithoutRouter as Header } from './Header';

describe('Header', () => {
  afterEach(cleanup);

  it('should render link to homepage on book page', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Header location={{ pathname: '/book/' }} />
      </MemoryRouter>,
    );

    const homePageLink = getByTestId('home-page-link');

    expect(homePageLink).toBeDefined();
    expect(homePageLink.getAttribute('href')).toBe('/');
  });

  it('should not render link to homepage on discover page', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Header location={{ pathname: '/discover/' }} />
      </MemoryRouter>,
    );

    const homePageLink = queryByTestId('home-page-link');

    expect(homePageLink).toBe(null);
  });
});
