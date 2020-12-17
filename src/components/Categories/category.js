import Toggle from 'react-toggle';
import React from 'react';
import axios from 'axios';

export const Category = ({ category }) => {
  const { name, isActive, _id } = category;

  const handleChange = (_id, status) => {
    const payload = {
      isActive: status,
    };
    axios
      .patch(`/category/${_id}`, payload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <div className='col-md-12 mb-3 mt-2 list-group-item d-flex text-muted justify-content-between shadow-sm py-2'>
      <div>
        <h5 className='py-1 text-capitalize'>{name}</h5>
      </div>
      <div>
        <div className='d-flex justify-content-between align-items-center mb-0'>
          <span className='mr-2'>Active</span>
          <small>
            <Toggle
              id={_id}
              defaultChecked={isActive}
              onChange={() => {
                handleChange(_id, !isActive);
              }}
            />
          </small>
        </div>
      </div>
    </div>
  );
};
