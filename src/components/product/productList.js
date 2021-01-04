import React from 'react';
import { ProductItem } from './productItem';
import { Table } from 'reactstrap';

export const ProductList = ({ products }) => {
  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Images</th>
          <th>Name</th>
          <th>Price</th>
          <th>Colors</th>
          <th>Sizes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </tbody>
    </Table>
  );
};
