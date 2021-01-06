import React from 'react';
import Toggle from 'react-toggle';
import axios from 'axios';
export const ProductItem = ({ product }) => {
  const {
    name,
    color,
    images,
    inStock,
    price,
    size,
    _id,
    isActive,
    category,
  } = product;

  const handleChange = (_id, status) => {
    axios
      .patch(`/product/${_id}`, status)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  return (
    <tr className='text-capitalize'>
      <td>
        {images.map((image, idx) => (
          <img
            key={idx}
            className='sm-category rounded-lg mr-2'
            src={image}
            alt={image}
          />
        ))}
      </td>
      <td>
        <div className='d-flex flex-column'>
          <small className='font-weight-bold mb-1'>{name}</small>
          <small>{category}</small>
        </div>
      </td>

      <td className='small'>$ {price}</td>
      <td>
        <div className='d-flex'>
          {color.map((clr, idx) => (
            <div
              key={idx}
              className='mr-2 custom-rounded shadow-sm'
              style={{
                backgroundColor: `${clr}`,
              }}
            ></div>
          ))}
        </div>
      </td>
      <td>
        <div className='d-flex'>
          {size.map((sizeValue, idx) => (
            <div key={idx} className='tag mr-1 px-1 '>
              <small> {sizeValue}</small>
            </div>
          ))}
        </div>
      </td>
      <td className='d-flex'>
        <small className='mr-1 d-flex align-items-center'>Stock</small>
        <div className='d-block'>
          <Toggle
            defaultChecked={inStock}
            onChange={() => {
              handleChange(_id, { inStock: !inStock });
            }}
          />
        </div>
        <small className='ml-2 mr-2 d-flex align-items-center'>Active</small>
        <div className='d-block'>
          <Toggle
            defaultChecked={isActive}
            onChange={() => {
              handleChange(_id, { isActive: !isActive });
            }}
          />
        </div>
      </td>
    </tr>
  );
};
