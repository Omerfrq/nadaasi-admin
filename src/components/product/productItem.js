import React, { useState } from 'react';
import Toggle from 'react-toggle';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { toast } from 'react-toastify';
import FeatherIcon from 'feather-icons-react';
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

  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (_id, status) => {
    axios
      .patch(`/product/${_id}`, status)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data));
  };

  const deleteProduct = () => {
    setIsDeleting(true);
    axios
      .delete(`/product/${_id}`)
      .then((res) => {
        setIsDeleting(false);
        toast.success('Product Delete Successfully!');
        window.location.reload();
      })
      .catch((err) => {
        setIsDeleting(false);
        toast.error('Unable To Delete');
      });
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalHeader className='text-muted' toggle={toggle}>
            Delete
          </ModalHeader>
          <ModalBody>
            <div className='d-flex justify-content-center align-items-center flex-column'>
              <div className='text-capitalize'>
                <span className='text-muted'>
                  Are You Sure You Want To delete{' '}
                </span>
                <strong>{name}?</strong>
              </div>
              <div className='mt-2'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='btn btn-light mr-2'
                >
                  Cancel
                </button>
                <button
                  onClick={deleteProduct}
                  disabled={isDeleting}
                  className='btn btn-danger'
                >
                  {isDeleting ? 'Deleting' : 'Delete'}
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}

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
          <div className='d-block'>
            <span
              onClick={() => setIsOpen(true)}
              className='ml-2 mt-1 cursor-pointer'
            >
              <FeatherIcon icon='trash' />
            </span>
          </div>
        </td>
      </tr>
    </>
  );
};
