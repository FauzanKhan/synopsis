import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { ThemeProvider } from '../../components/ThemeProvider/ThemeProvider';
import { DiscoveryPageWithoutRedirection as DiscoveryPage } from './DiscoveryPage';

jest.mock('../../shared/api', () => ({
  api: {
    get: () => Promise.resolve({ categories: [], books: [] }),
  },
}));

describe('DiscoveryPageWithoutRedirection', () => {
  afterEach(cleanup);

  it('should render categories list', () => {
    const { getByTestId } = render(
      <ThemeProvider value={{ theme: { fontSize: {} } }}>
        <DiscoveryPage location={{}} />
      </ThemeProvider>,
    );

    expect(getByTestId('categories-list')).toBeDefined();
  });

  it('should render books list', () => {
    const { getByTestId } = render(
      <ThemeProvider value={{ theme: { fontSize: {} } }}>
        <DiscoveryPage location={{}} />
      </ThemeProvider>,
    );

    expect(getByTestId('books-list')).toBeDefined();
  });
});
