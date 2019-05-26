import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { StoreContext } from '../StoreContext';
import { redirectAnonymousUser } from './redirectAnonymousUser';

jest.mock('../StoreContext', () => {
  const { createContext } = require('react');
  return { StoreContext: createContext() };
});

describe('redirectAnonymousUser', () => {
  const DummyComponent = ({ text }) => <div data-testid="component">{text}</div>;
  const DummyComponentWithRedirection = redirectAnonymousUser(DummyComponent);

  afterEach(cleanup);

  it('should render the component when user is Logged In', async () => {
    const { container } = render(
      <StoreContext.Provider value={{ userIsLoggedIn: true }}>
        <DummyComponentWithRedirection />
      </StoreContext.Provider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        data-testid="component"
      />
    `);
  });

  it('should pass props to the rendered component', async () => {
    const props = {
      tex: 'hello world',
    };

    const { getByTestId } = render(
      <StoreContext.Provider value={{ userIsLoggedIn: true }}>
        <DummyComponentWithRedirection {...props} />
      </StoreContext.Provider>,
    );

    expect(getByTestId('component').text).toBe(props.text);
  });

  it('should redirect to homepage when user is not logged in', async () => {
    const props = {
      history: {
        push: jest.fn(),
      },
    };

    render(
      <StoreContext.Provider value={{ userIsLoggedIn: false }}>
        <DummyComponentWithRedirection {...props} />
      </StoreContext.Provider>,
    );

    expect(props.history.push).toHaveBeenCalledWith('/');
  });
});
