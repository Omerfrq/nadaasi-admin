import React from 'react';
import { Category } from './category';

const CategoryList = ({ categories }) =>
  categories.map((coupon) => <Category key={coupon._id} category={coupon} />);

export default CategoryList;
