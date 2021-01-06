// import Toggle from 'react-toggle';
import React from 'react';
// import axios from 'axios';

export const SliderItem = ({ slide }) => {
  // const { _id, isActive } = slide;

  // const handleChange = (_id, status) => {
  //   const payload = {
  //     isActive: status,
  //   };
  //   axios
  //     .patch(`/coupon/${_id}`, payload)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err.response.data));
  // };

  return (
    <div className='col-md-12 mb-3 mt-2 list-group-item d-flex text-muted justify-content-between shadow-sm py-2'>
      <div className=''>
        <h5 className='py-1 text-capitalize'>
          <img
            alt=''
            className='sm-category rounded-lg mr-2'
            src={slide.imageUrl}
          />
          <span className='tag text-info font-weight-bold small'>
            {slide?.title}
          </span>
          | <small>{slide?.subTitle}</small>
        </h5>
        <h6 className='mb-0'>
          <span className='small'>{slide?.description}</span>
        </h6>
      </div>
      <div>
        {/* <div className='d-flex justify-content-between align-items-center mb-0'>
          Active
          <small>
            <Toggle
              id={_id}
              defaultChecked={isActive}
              onChange={() => {
                handleChange(_id, !isActive);
              }}
            />
          </small>
        </div> */}
      </div>
    </div>
  );
};
