import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { BookPage } from './pages/BookPage';

const AppContainer = styled.div`
  font-family: 'Raleway', tahoma;
`;

function AppRouter() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/discover/" component={DiscoveryPage} />
        <Route path="/book/" component={BookPage} />
      </AppContainer>
    </Router>
  );
}

export default AppRouter;
