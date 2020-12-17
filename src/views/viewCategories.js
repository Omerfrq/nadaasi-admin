import React from 'react';

import { useIsAdmin } from '../hooks/useIsAdmin';
import { setAuthorizationToken } from '../helpers/utils';
import { Loader } from '../components/spinner';
import NotFound from '../components/NotFound';
import Header from '../components/header';
import Categories from '../components/Categories/categoryList';
import { useCategories } from '../hooks/useCategories';

export const ViewCategories = () => {
  setAuthorizationToken();
  useIsAdmin();
  const { categories, isLoading } = useCategories();

  return (
    <div className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='col-md-12 mx-auto  py-4'>
          <div className='row'>
            <Header heading='Categories' item={categories} />
            {categories.length > 0 ? (
              <Categories categories={categories} />
            ) : (
              <NotFound message='No Active Categories.' />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
