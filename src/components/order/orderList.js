import React from 'react';
import { Table } from 'reactstrap';
import { OrderItem } from './orderItem';
export const OrderList = ({ orders }) => {
  return (
    <Table striped>
      {console.log(orders)}
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Total</th>
          <th>Address</th>
          <th>Status</th>
          <th>Coupon</th>
          <th>Items</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        ))}
      </tbody>
    </Table>
  );
};
