import React from 'react';
import { render, cleanup, act } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { ThemeProvider } from '../../components/ThemeProvider/ThemeProvider';
import { StoreContext } from '../../StoreContext';
import { BookPageWithoutRedirection as BookPage } from './BookPage';

jest.mock('../../StoreContext', () => {
  const { createContext } = require('react');
  return { StoreContext: createContext() };
});

jest.mock('../../shared/api', () => ({ api: { get: () => Promise.resolve({}) } }));

describe('BookPage', () => {
  afterEach(cleanup);

  it('should show subscription overlay when access type is free', () => {
    act(() => {
      const { getByTestId } = render(
        <StoreContext.Provider value={{ userAccessType: 'free' }}>
          <ThemeProvider value={{ theme: { fontSize: {} } }}>
            <BookPage match={{ params: {} }} />
          </ThemeProvider>
        </StoreContext.Provider>,
      );

      expect(getByTestId('subscription-overlay')).toBeDefined();
    });
  });

  it('should not show subscription overlay when access type is premium', () => {
    const { queryByTestId } = render(
      <StoreContext.Provider value={{ userAccessType: 'premium' }}>
        <ThemeProvider value={{ theme: { fontSize: {} } }}>
          <BookPage match={{ params: {} }} />
        </ThemeProvider>
      </StoreContext.Provider>,
    );

    expect(queryByTestId('subscription-overlay')).toBe(null);
  });
});
