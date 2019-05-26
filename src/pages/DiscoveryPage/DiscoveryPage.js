import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { CategoriesList } from '../../components/CategoriesList/CategoriesList';
import { BooksList } from '../../components/BooksList/BooksList';

import { api } from '../../shared/api';
import { redirectAnonymousUser } from '../../shared/redirectAnonymousUser';

const Section = styled.section`
  display: grid;
  grid-template-columns: 20% 80%;
  grid-column-gap: 24px;
`;

const Aside = styled.aside`
  min-height: 100vh;
  padding-top: 48px;
`;

const DiscoveryPage = ({ location }) => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [booksByCategoryIds, setBooksByCategoryIds] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({});
  const [booksInSelectedCategory, setBooksInSelectedCategory] = useState([]);

  // For improved performance
  // useMemo can be used with dependencies [location.hash, categoriesList.length]
  // For some reason it was not returning undefined, I did not want to put time into debugging that
  const getSelectedCategoryFromUrl = () => {
    if (location.hash && categoriesList) {
      return categoriesList.find(({ id }) => id === location.hash.slice(1));
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const { categories } = await api.get('/categories');
      setCategoriesList(categories);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { books } = await api.get('/books');
      const booksArrangedByCategories = books.reduce(
        (acc, { category_id: categoryId, ...rest }) => ({
          ...acc,
          [categoryId]: acc[categoryId] ? [...acc[categoryId], { ...rest }] : [{ ...rest }],
        }),
        {},
      );

      setBooksByCategoryIds(booksArrangedByCategories);
    })();
  }, []);

  useEffect(() => {
    const categoryId = selectedCategory.id;
    setBooksInSelectedCategory(booksByCategoryIds[categoryId] || []);
  }, [selectedCategory.id, Object.keys(booksByCategoryIds).length]);

  useEffect(() => {
    const categoryFromUrl = getSelectedCategoryFromUrl();
    const newSelectedCategory = categoryFromUrl || categoriesList[0] || {};
    setSelectedCategory(newSelectedCategory);
  }, [categoriesList.length, location.hash]);

  return (
    <Section>
      <Aside>
        <CategoriesList categories={categoriesList} selectedCategoryId={selectedCategory.id} />
      </Aside>
      <main>
        <BooksList books={booksInSelectedCategory} />
      </main>
    </Section>
  );
};

const DiscoveryPageWithRedirection = redirectAnonymousUser(DiscoveryPage);

export {
  DiscoveryPageWithRedirection as DiscoveryPage,
  DiscoveryPage as DiscoveryPageWithoutRedirection,
};
