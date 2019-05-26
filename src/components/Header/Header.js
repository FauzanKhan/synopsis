import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const AppHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 50px;
`;

const Header = ({ location }) => (
  <AppHeader>
    <Link to="/">
      <Logo src="https://www.freepnglogos.com/uploads/whatsapp-circle-message-messaging-messenger-round-icon--24.png" />
    </Link>
    {location.pathname.includes('/book/') && (
      <Link to="/" data-testid="home-page-link">
        Go to HomePage
      </Link>
    )}
  </AppHeader>
);

const HeaderWithRouter = withRouter(Header);

export { HeaderWithRouter as Header, Header as HeaderWithoutRouter };
