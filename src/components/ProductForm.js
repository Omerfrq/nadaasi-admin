import React, { useCallback, useState } from 'react';

import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Toggle from 'react-toggle';
import axios from 'axios';
import { OPTIONS } from '../config/selectConfig';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import Creatable from 'react-select/creatable';

export const ProductForm = () => {
  const { handleSubmit, register } = useForm();
  const [images, setImages] = useState([]);
  const [category, setcategory] = useState();
  const [dressSize, setDressSize] = useState([]);
  const [dressColor, setDressColor] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [three4Thiry, setThree4Thirty] = useState(true);
  const [material, setMaterial] = useState('');
  const [design, setDesign] = useState('');
  const [placeholder, setPlaceHolder] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const placeholderArray = [];
    setImages(acceptedFiles);
    acceptedFiles.map((file) =>
      placeholderArray.push(URL.createObjectURL(file))
    );

    setPlaceHolder(placeholderArray);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = (data) => {
    setIsLoading(true);
    const { price, name, description, stockQuantity } = data;
    const formdata = new FormData();
    images.map((file) => formdata.append('images', file));
    formdata.append('price', price);
    formdata.append('name', name);
    formdata.append('size', dressSize);
    formdata.append('color', dressColor);
    formdata.append('category', category);
    formdata.append('inStock', inStock);
    formdata.append('description', description);
    formdata.append('stockQuantity', Number(stockQuantity));
    formdata.append('three4Thirty', three4Thiry);
    formdata.append('material', material);
    formdata.append('pattern', design);
    axios
      .post('/product', formdata)
      .then((res) => {
        setIsLoading(false);
        toast.success('Product Added Successfully', {
          autoClose: '1500',
        });
        history.push('/products');
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error('Unable To Add Product', {
          autoClose: '1500',
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='col-md-12 d-flex justify-content-between'>
          <h3 className='mb-0 font-weight-bold text-info'>Upload Product</h3>
          <div className='d-flex justify-content-end align-items-center'>
            <span className='mr-2'>In Stock</span>
            <Toggle
              id='123'
              defaultChecked={inStock}
              onChange={(e) => {
                setInStock(e.target.checked);
              }}
            />
          </div>
        </div>

        <div className='col-md-12'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className='bg-white my-3 d-flex justify-content-center border shadow-sm py-5 mb-2'>
                <span className='text-info font-weight-bold'>
                  Drag n Drop Image Here Or Click to Select..
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='col-md-12'>
          <div className='d-flex mb-3 wrap'>
            {placeholder.map((img) => (
              <img
                className='img-thumbnail h-300px mr-3 mb-2'
                src={img}
                alt={img}
              />
            ))}
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              ref={register}
              className='form-control'
              placeholder='Name'
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              name='price'
              ref={register}
              placeholder='Price'
            />
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group'>
            <Creatable
              defaultValue={[]}
              placeholder='Select Category..'
              name='category'
              options={[
                {
                  label: 'Tie',
                  value: 'tie',
                },
                {
                  label: 'Bow',
                  value: 'bow',
                },
              ]}
              onChange={({ value }) => {
                setcategory(value);
              }}
            />
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group'>
            <Select
              defaultValue={material}
              placeholder='Select Material'
              name='material'
              options={OPTIONS.materialOptions}
              onChange={({ value }) => {
                setMaterial(value);
              }}
            />
          </div>
        </div>
        <div className='col-md-4'>
          <div className='form-group'>
            <Select
              defaultValue={[]}
              placeholder='Select Pattern..'
              name='design'
              options={OPTIONS.patternOptions}
              onChange={({ value }) => {
                setDesign(value);
              }}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <Select
              defaultValue={[]}
              isMulti
              placeholder='Select Tie Size..'
              name='colors'
              innerRef={register}
              options={OPTIONS.sizeOptions}
              onChange={(values) => {
                values !== null &&
                  setDressSize(values.map(({ value }) => value));
              }}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <Select
              isMulti
              placeholder='Select Tie Color..'
              options={OPTIONS.colorOptions}
              onChange={(values) => {
                values !== null &&
                  setDressColor(values.map(({ value }) => value));
              }}
            />
          </div>
        </div>
        <div className='col-md-12'>
          <div className='form-group'>
            <input
              name='stockQuantity'
              type='number'
              className='form-control'
              min={1}
              placeholder='Enter Stock Quantity'
              ref={register}
            />
          </div>
        </div>
        <div className='col-md-12'>
          <div className='d-flex justify-content-between'>
            <h4 className='font-weight-bold text-info'>Product Details</h4>
            {/* <span className='tag '>Optional</span> */}
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <input
                  name='description'
                  ref={register}
                  type='text'
                  className='form-control'
                  placeholder='Enter Description'
                />
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <div className='d-flex justify-content-between'>
                <h4 className='font-weight-bold text-info'>Three For Thirty</h4>
                <span>
                  {' '}
                  <Toggle
                    id='1234'
                    defaultChecked={three4Thiry}
                    onChange={(e) => {
                      setThree4Thirty(e.target.checked);
                    }}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='col-md-12 '>
          <button
            type='submit'
            className='btn btn-block btn-dark mb-2'
            disabled={isLoading}
          >
            <span
              className={
                isLoading ? 'mr-2 spinner-border spinner-border-sm' : ''
              }
              role='status'
              aria-hidden='true'
            ></span>
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </form>
  );
};
