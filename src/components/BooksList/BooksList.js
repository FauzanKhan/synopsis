import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
`;

const BookCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  position: relative;
  min-height: 360px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.white}
  text-decoration: none;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.large}
`;

const ImageOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #333;
  opacity: 0.5;
  top: 0;
  left: 0;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-position: center;
  background-size: cover;
  position: absolute;
`;

export const BooksList = ({ books }) => (
  <ListContainer>
    {books.map(({ id, title, image_url: imageUrl }) => (
      <Link to={`/book/${id}`}>
        <BookCard key={id}>
          <ImageContainer src={imageUrl} />
          <ImageOverlay />
          <Title>{title}</Title>
        </BookCard>
      </Link>
    ))}
  </ListContainer>
);
