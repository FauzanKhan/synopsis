import React, { useContext } from 'react';

import { StoreContext } from '../StoreContext';

// HOC for redirecting Anonymous user to LogIn screen
export const redirectAnonymousUser = WrappedComponent => props => {
  const { userIsLoggedIn } = useContext(StoreContext);

  if (!userIsLoggedIn) {
    const { history } = props;
    history.push('/');
    return null;
  }

  return <WrappedComponent {...props} />;
};
