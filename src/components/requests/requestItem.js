import React from 'react';
// import { stringTruncate } from '../../views/messages';
import moment from 'moment';

export default function RequestItem({ request }) {
  const { _id, userEmail, projectAcceptanceCriteria, createdAt } = request;

  const getDate = (createdAt) => moment.utc(createdAt).format('MMM DD, YYYY');

  return (
    <div
      className='d-flex list-group-item py-3
  justify-content-between
  shadow-sm  mb-2'
      key={_id}
    >
      <div className='col-md-2'>
        <small className='d-flex flex-column'>
          <span className='text-muted border-bottom py-1'>Project Title</span>
          <span className=' text-capitalize py-1'>{request?.projectTitle}</span>
        </small>
      </div>
      <div className='col-md-2'>
        <small className='d-flex flex-column '>
          <span className='text-muted border-bottom py-1 '>
            projectAcceptanceCriteria
          </span>
          <span className='text-capitalize py-1'>
            {projectAcceptanceCriteria}
          </span>
        </small>
      </div>
      <div className='col-md-3'>
        <small className='d-flex flex-column '>
          <span className='text-muted border-bottom py-1'>
            Request By (Email)
          </span>
          <span className=' py-1'>{userEmail}</span>
        </small>
      </div>
      <div className='col-md-3'>
        <small className='d-flex flex-column '>
          <span className='text-muted py-1 border-bottom'>Date</span>
          <span className='py-1'>{getDate(createdAt)}</span>
        </small>
      </div>
    </div>
  );
}
