import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { setAuthorizationToken } from '../helpers/utils';
import { API } from '../config/apiConfig';

export const AddSlide = () => {
  useIsAdmin();

  const { register, handleSubmit, errors, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data) => {
    setIsLoading(true);
    setAuthorizationToken();

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('subTitle', data.subTitle);
    formData.append('image', data.file[0]);
    formData.append('credits', data.credits);
    formData.append('description', data.description);

    axios
      .post(API.getSlides, formData)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.Message, {
          autoClose: '1500',
        });
        reset();
      })
      .catch((err) => {
        setIsLoading(false);
        toast(err.response.data.Message, {
          autoClose: '1500',
        });
      });
  };
  return (
    <div className='container mt-4'>
      <h3 className='text-info font-weight-bold py-2 border-top border-bottom '>
        Add Slide
      </h3>
      <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <input
            type='text'
            name='title'
            className='form-control'
            placeholder='Enter Slide Title Name..'
            ref={register({ required: true })}
          />

          {errors.title && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              Title is Required.
            </div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='subTitle'
            className='form-control'
            placeholder='Enter Slide SubTitle..'
            ref={register({ required: true })}
          />

          {errors.subTitle && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              SubTitle is Required.
            </div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='description'
            className='form-control'
            placeholder='Enter Slide Description..'
            ref={register({ required: true })}
          />

          {errors.description && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              Description is Required.
            </div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='text'
            name='credits'
            className='form-control'
            placeholder='Enter Credits..'
            ref={register({ required: true })}
          />
          {errors.credits && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              Credits is Required.
            </div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='file'
            name='file'
            className='form-control-file'
            ref={register({ required: true })}
          />
          {errors.file && (
            <div className='font-weight-bold text-danger mt-1 mb-0'>
              File is Required.
            </div>
          )}
        </div>
        <button
          type='submit'
          className='btn btn-block btn-dark mb-2'
          disabled={isLoading}
        >
          <span
            className={isLoading ? 'mr-2 spinner-border spinner-border-sm' : ''}
            role='status'
            aria-hidden='true'
          ></span>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};
