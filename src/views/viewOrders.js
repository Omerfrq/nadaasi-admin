import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { setAuthorizationToken } from '../helpers/utils';
import { OrderList } from '../components/order/orderList';
import { Loader } from '../components/spinner';
import Header from '../components/header';
import NotFound from '../components/NotFound';

export const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  setAuthorizationToken();
  useEffect(() => {
    axios
      .get('/order')
      .then((res) => {
        setIsLoading(false);
        setOrders(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response);
      });
  }, []);
  return (
    <div>
      <div className='container mt-4'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Header heading='Orders' item={orders} />
            <div className='col-md-12'>
              <div className='row'>
                <div className='p-0 col-md-12 my-2'>
                  {orders.length > 0 ? (
                    <OrderList orders={orders} />
                  ) : (
                    <NotFound message='Not Orders Received Yet.' />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
