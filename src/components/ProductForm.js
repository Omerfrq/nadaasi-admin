import React, { useCallback, useState } from 'react';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Toggle from 'react-toggle';
import axios from 'axios';
import { OPTIONS } from '../config/selectConfig';
import { toast } from 'react-toastify';
import { useCategories } from '../hooks/useCategories';
import { Loader } from './spinner';
import shortid from 'shortid';

const formatCategories = (categories) => {
  const options = [];

  if (categories?.categories?.length !== 0) {
    categories.map((category) =>
      options.push({
        label: category.name,
        value: category.name,
      })
    );
  }

  return options;
};

export const ProductForm = () => {
  const { categories, isLoading: isLoadingCategories } = useCategories(true);

  const { handleSubmit, register } = useForm();

  const [images, setImages] = useState([]);
  const [dressType, setDressType] = useState();
  const [dressSize, setDressSize] = useState([]);
  const [dressColor, setDressColor] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicPriceType, setDynamicPriceType] = useState('');

  const [hasDynamicPrice, setHasDynamicPricing] = useState(true);

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
    const {
      price,
      name,
      description,
      stockQuantity,
      startingDynamicPrice,
      endingDynamicPrice,
      dynamicPriceToIncrease,
    } = data;
    const formdata = new FormData();
    images.map((file) => formdata.append('images', file));
    formdata.append('price', price);
    formdata.append('name', name);
    formdata.append('rating', '5');
    formdata.append('size', dressSize);
    formdata.append('color', dressColor);
    formdata.append('category', dressType);
    formdata.append('inStock', inStock);
    formdata.append('description', description);
    formdata.append('upc', shortid.generate());
    formdata.append('stockQuantity', Number(stockQuantity));
    if (hasDynamicPrice) {
      formdata.append('quantityTrigger', 1);
      formdata.append('isFirstSale', true);
      formdata.append('dynamicPriceType', dynamicPriceType);
      formdata.append('startingDynamicPrice', startingDynamicPrice);
      formdata.append('endingDynamicPrice', endingDynamicPrice);
      formdata.append('dynamicPriceToIncrease', dynamicPriceToIncrease);
    }
    axios
      .post('/product', formdata)
      .then((res) => {
        setIsLoading(false);
        toast.success('Product Added Successfully', {
          autoClose: '1500',
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error('Unable To Add Product', {
          autoClose: '1500',
        });
      });
  };

  if (isLoadingCategories) {
    return (
      <div className='container'>
        <Loader />
      </div>
    );
  }

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

        <div className='col-md-4'>
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
        <div className='col-md-4'>
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
            <Select
              defaultValue={[]}
              placeholder='Select Category..'
              name='dressType'
              options={formatCategories(categories)}
              onChange={({ value }) => {
                setDressType(value);
              }}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <Select
              defaultValue={[]}
              isMulti
              placeholder='Select Dress Size..'
              name='colors'
              innerRef={register}
              options={OPTIONS.dressSizeOptions}
              onChange={(values) => {
                values !== null &&
                  setDressSize(values.map(({ value }) => value));
              }}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='form-group'>
            <CreatableSelect
              isMulti
              placeholder='Select Dress Color..'
              options={OPTIONS.dressColorOptions}
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
            <span className='tag '>Optional</span>
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
                <h4 className='font-weight-bold text-info'>Dynamic Pricing</h4>
                <span>
                  {' '}
                  <Toggle
                    id='1234'
                    defaultChecked={hasDynamicPrice}
                    onChange={(e) => {
                      setHasDynamicPricing(e.target.checked);
                    }}
                  />
                </span>
              </div>
            </div>
            {hasDynamicPrice && (
              <div className='col-md-12'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <Select
                        defaultValue={[]}
                        placeholder='Select Dynamic Price Type..'
                        name='dynamicPriceType'
                        options={[
                          {
                            label: 'flat',
                            value: 'flat',
                          },
                          {
                            label: 'percentage',
                            value: 'percentage',
                          },
                        ]}
                        onChange={({ value }) => {
                          setDynamicPriceType(value);
                        }}
                      />
                    </div>
                  </div>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <input
                            name='dynamicPriceToIncrease'
                            ref={register}
                            type='text'
                            className='form-control'
                            placeholder='Enter Price To Increase'
                          />
                          <small className='text-muted text-capitalize'>
                            Value Will be added to price after every purchase
                          </small>
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <input
                            name='startingDynamicPrice'
                            ref={register}
                            type='text'
                            className='form-control'
                            placeholder='Enter Starting Price'
                          />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <div className='form-group'>
                          <input
                            name='endingDynamicPrice'
                            ref={register}
                            type='text'
                            className='form-control'
                            placeholder='Enter Ending Price'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
