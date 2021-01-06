import React from 'react';
import { useSlides } from '../hooks/useSlides';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { setAuthorizationToken } from '../helpers/utils';
import { Loader } from '../components/spinner';
import NotFound from '../components/NotFound';
import Header from '../components/header';

import { SliderList } from '../components/Slider/sliderList';

export const ViewSlides = () => {
  setAuthorizationToken();
  useIsAdmin();
  const { slides, isLoading } = useSlides();

  return (
    <div className='container'>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='col-md-12 mx-auto  py-4'>
          <div className='row'>
            <Header heading='Slides' item={slides} />
            {slides.length > 0 ? (
              <SliderList slides={slides} />
            ) : (
              <NotFound message='No Active Slides.' />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
