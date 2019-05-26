import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage';
import { DiscoveryPage } from './pages/DiscoveryPage';
import { BookPage } from './pages/BookPage';
import { ThemeProvider } from './components/ThemeProvider/ThemeProvider';
import { StoreContext } from './StoreContext';

import { api } from './shared/api';

const Container = styled.div`
  font-family: 'Raleway', tahoma;
  max-width: 1080px;
  margin: auto;
`;

function AppRouter() {
  const [store, setStore] = useState({});
  const onLogInSuccess = async () => {
    const { access_type: userAccessType } = await api.get('/me');

    // API alway returns access_type: 'free'
    // set userAccessType: 'premium' below to see how app looks for premium users
    // Adding below info to global state because
    // they can potentially be needed in other parts of the app as it scales
    setStore({
      ...store,
      userAccessType,
      userIsLoggedIn: true,
    });
  };

  return (
    <Router>
      <StoreContext.Provider value={store}>
        <ThemeProvider>
          <Container>
            <Header />
            <Route
              path="/"
              exact
              component={(props) => <HomePage onLogInSuccess={onLogInSuccess} {...props} />}
            />
            <Route path="/discover/" component={DiscoveryPage} />
            <Route path="/book/:id" component={BookPage} />
          </Container>
        </ThemeProvider>
      </StoreContext.Provider>
    </Router>
  );
}

export default AppRouter;
