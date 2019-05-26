import React, { useState, useEffect, useContext, Fragment } from 'react';
import styled from 'styled-components';

import { Button } from '../components/Button/Button';
import { api } from '../shared/api';
import { FREE } from '../shared/userAccessTypes';
import { StoreContext } from '../StoreContext';
import { redirectAnonymousUser } from '../shared/redirectAnonymousUser';

const Heading = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.large};
  padding: 24px 0;
`;

const Content = styled.div`
  line-height: 36px;
  word-spacing: 3px;
  position: relative;
`;

const SubscriptionOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 70%;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 49%,
    rgba(255, 255, 255, 1) 81%
  );
`;

const SubscriptionButtonWrapper = styled.div`
  margin-top: 62px;
  text-align: center;
`;

const BookPage = ({ match: { params } }) => {
  const [book, setBook] = useState({});
  const { userAccessType } = useContext(StoreContext);

  useEffect(() => {
    (async () => {
      const bookRecrod = await api.get(`/books/${params.id}`);
      setBook(bookRecrod);
    })();
  }, []);

  return (
    <Fragment>
      <Heading>{book.title}</Heading>
      <Content>
        {book.content}
        {userAccessType === FREE && (
          <SubscriptionOverlay>
            <SubscriptionButtonWrapper>
              <Button>Subscribe to read</Button>
            </SubscriptionButtonWrapper>
          </SubscriptionOverlay>
        )}
      </Content>
    </Fragment>
  );
};

const BookPageWithRedirection = redirectAnonymousUser(BookPage);

export { BookPageWithRedirection as BookPage };
