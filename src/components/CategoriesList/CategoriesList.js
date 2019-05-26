import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 8px 0;
  text-decoration: underline;

  a {
    color: ${({ isSelected, theme }) => {
      if (isSelected) {
        return theme.colors.primary;
      }
      return theme.colors.text;
    }};
  }
`;

export const CategoriesList = ({ categories, selectedCategoryId }) => (
  <List>
    {categories.map(category => {
      const { title, id } = category;
      return (
        <ListItem key={id} isSelected={id === selectedCategoryId}>
          <Link to={`#${id}`}>{title}</Link>
        </ListItem>
      );
    })}
  </List>
);
