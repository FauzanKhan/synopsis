import React from 'react';
import { render, cleanup, act } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { ThemeProvider } from '../../components/ThemeProvider/ThemeProvider';
import { StoreContext } from '../../StoreContext';
import { HomePage } from './HomePage';

jest.mock('../../StoreContext', () => {
  const { createContext } = require('react');
  return { StoreContext: createContext() };
});

jest.mock('../../shared/api', () => ({ api: { get: () => Promise.resolve({}) } }));

const props = {
  history: {
    push: jest.fn(),
  },
};

describe('HomePage', () => {
  afterEach(cleanup);

  it('renders login page/login button when user is not loggedIn', () => {
    act(() => {
      const { getByTestId } = render(
        <StoreContext.Provider value={{ userIsLoggedIn: false }}>
          <ThemeProvider value={{ theme: { colors: {} } }}>
            <HomePage {...props} />
          </ThemeProvider>
        </StoreContext.Provider>,
      );

      expect(getByTestId('login-button')).toBeDefined();
    });
  });

  it('should redirect user to discovery page when logged in', () => {
    act(() => {
      render(
        <StoreContext.Provider value={{ userIsLoggedIn: true }}>
          <ThemeProvider value={{ theme: { fontSize: {} } }}>
            <HomePage {...props} />
          </ThemeProvider>
        </StoreContext.Provider>,
      );

      expect(props.history.push).toBeCalledWith('/discover');
    });
  });
});
