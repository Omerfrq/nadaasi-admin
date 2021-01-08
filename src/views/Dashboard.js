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
            <h6 className='text-muted'>Total Government Users</h6>
            <h1 className='font-weight-bold'>10</h1>
          </div>
        </div>
        <div className='col-md-3 border-right'>
          <div className='d-flex flex-column'>
            <h6 className='text-muted'>Total Contractors</h6>
            <h1 className='font-weight-bold'>150</h1>
          </div>
        </div>
        <div className='col-md-3 border-right'>
          <div className='d-flex flex-column'>
            <h6 className='text-muted'>Total Projects</h6>
            <h1 className='font-weight-bold'>1050</h1>
          </div>
        </div>
        <div className='col-md-3 '>
          <div className='d-flex flex-column'>
            <h6 className='text-muted'>Total Feedback</h6>
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
              title='View Projects'
              message='View Projects from here'
              to='/projects'
            />
            <DashboardCard
              title='View Messages'
              message='View Messages from here'
              to='/messages'
            />
            <DashboardCard
              title='View Contractor Requests'
              message='View Contractor Requests from here'
              to='/request/contractor'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
