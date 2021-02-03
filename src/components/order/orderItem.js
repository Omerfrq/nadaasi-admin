import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Select from 'react-select';
import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';

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
  console.log(order);
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

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
    <>
      {isOpen && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader className='text-muted' toggle={toggle}>
            Delete
          </ModalHeader>
          <ModalBody>
            <Table borderless>
              <thead>
                <tr className=' border-bottom  font-weight-bold text-uppercase'>
                  <th>Images</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItem.map(
                  ({ _id, name, quantity, size, images }) => (
                    <tr key={_id} className='user '>
                      <td>
                        {images.map((image, idx) => (
                          <img
                            key={idx}
                            className='sm-category rounded-lg mr-1'
                            src={image}
                            alt={image}
                          />
                        ))}
                      </td>
                      <td className='text-dm text-capitalize'>{name}</td>
                      <td className='text-center'>{quantity}</td>
                      <td className='text-center'>{size}</td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
      )}
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
            <div className='d-block mt-2'>
              <span
                onClick={() => setIsOpen(true)}
                className='btn btn-info btn-block cursor-pointer'
              >
                View Order Items
              </span>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};
