import React, { useContext, useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button/Button';

import { api } from '../../shared/api';
import { StoreContext } from '../../StoreContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
`;

export const HomePage = ({ history, onLogInSuccess }) => {
  const { userIsLoggedIn } = useContext(StoreContext);
  const [isAuthInProgress, setIsAuthInProgress] = useState(false);

  if (userIsLoggedIn) {
    history.push('/discover');
  }

  const onClick = async () => {
    setIsAuthInProgress(true);
    await api.post('/auth');
    await onLogInSuccess();
    history.push('/discover');
  };

  return (
    <Container>
      <Button disabled={isAuthInProgress} onClick={onClick} data-testId="login-button">
        Log In
      </Button>
    </Container>
  );
};
