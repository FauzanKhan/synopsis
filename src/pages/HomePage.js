import React, { useContext } from 'react';
import styled from 'styled-components';

import { Button } from '../components/Button/Button';

import { api } from '../shared/api';
import { StoreContext } from '../StoreContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
`;

export const HomePage = ({ history, onLogInSuccess }) => {
  const { userIsLoggedIn } = useContext(StoreContext);

  if (userIsLoggedIn) {
    history.push('/discover');
  }

  const onClick = async () => {
    await api.post('/auth');
    await onLogInSuccess();
    history.push('/discover');
  };

  return (
    <Container>
      <Button onClick={onClick}>Log In</Button>
    </Container>
  );
};
