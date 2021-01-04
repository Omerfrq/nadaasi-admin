import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

const orderStatusOptions = [
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'On The Way',
    value: 'on the way',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
  {
    label: 'Delievered',
    value: 'delievered',
  },
];

export const OrderItem = ({ order }) => {
  const [isLoading, setIsLoading] = useState(false);

  const updateOrder = (orderStatus) => {
    setIsLoading(true);
    axios
      .patch(`order/${order._id}`, { orderStatus })
      .then((res) => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  return (
    <tr className='text-capitalize'>
      <td className='small'>{order?.orderId}</td>
      <td>
        <div className='d-flex flex-column'>
          <small className='font-weight-bold mb-1'>
            Total: $ {order?.total}
          </small>
          <small>SubTotal: $ {order?.subTotal}</small>
        </div>
      </td>
      <td>
        <div className='d-flex flex-column'>
          <small className=' mb-1'>
            <span className='font-weight-bold'>Address:</span>{' '}
            {order?.address?.addressDescription}{' '}
            {order?.address?.country?.emoji}
          </small>
          <small>
            Phone: {order?.phone}| {order?.address?.district}
          </small>
        </div>
      </td>
      <td>
        <span className='tag'>{order.orderStatus}</span>
      </td>
      <td className='small'>
        <div className='d-flex flex-column'>
          <small className='font-weight-bold mb-1'>
            {order?.appliedCoupon ? order?.appliedCoupon?.name : 'N / A'}
          </small>
          <small>
            {' '}
            {order?.appliedCoupon ? order?.appliedCoupon?.value : 0}
          </small>
        </div>
      </td>
      <td>{order?.orderItem?.length}</td>
      <td>
        <div
          style={{
            width: 190,
          }}
        >
          <Select
            options={orderStatusOptions}
            isLoading={isLoading}
            isDisabled={isLoading}
            onChange={(option) => updateOrder(option.value)}
          />
        </div>
      </td>
    </tr>
  );
};
