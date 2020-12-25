import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, message, to }) => {
  return (
    <div className='col-md-6 ed hb hc mb-2 my-0 px-1 py-0'>
      <Link to={to}>
        <div className='ae bq b5 hd di dt custom-shadow '>
          <div className='ae dm'>
            <h3 className='cr hf cs font-weight-bold fd hg'>{title}</h3>
            <small className='cr bh ew text-muted el'>{message}</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className='col-md-12 mb-2 mt-2'>
      <div className='row custom-shadow p-3 bg-white'>
        <div className='col-md-3 border-right'>
          <div className='d-flex flex-column'>
            <h5 className='text-muted'>Total Products</h5>
            <h1 className='font-weight-bold'>10</h1>
          </div>
        </div>
        <div className='col-md-3 border-right'>
          <div className='d-flex flex-column'>
            <h5 className='text-muted'>Total Orders</h5>
            <h1 className='font-weight-bold'>150</h1>
          </div>
        </div>
        <div className='col-md-3 border-right'>
          <div className='d-flex flex-column'>
            <h5 className='text-muted'>Total Users</h5>
            <h1 className='font-weight-bold'>1050</h1>
          </div>
        </div>
        <div className='col-md-3 '>
          <div className='d-flex flex-column'>
            <h5 className='text-muted'>Total Feedback</h5>
            <h1 className='font-weight-bold'>7</h1>
          </div>
        </div>
      </div>
      <div className='row mb-2'>
        <div className='container-fluid p-4'>
          <div className='do dp row'>
            <DashboardCard
              title='View Users'
              message='View users from here'
              to='/users'
            />
            <DashboardCard
              title='View Feedback'
              message='View feedback from here'
              to='/feedback'
            />
            <DashboardCard
              title='Add Categories'
              message='Add product categories from here'
              to='/add-category'
            />
            <DashboardCard
              title='Add Coupons'
              message='Add coupons from here'
              to='/add-coupon'
            />
            <DashboardCard
              title='Add Products'
              message='Add product from here'
              to='/upload-product'
            />
            <DashboardCard
              title='Add Categories'
              message='Add product categories from here'
              to='/add-category'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
