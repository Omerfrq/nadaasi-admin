import React from 'react';
import { SliderItem } from './sliderItem';

export const SliderList = ({ slides }) =>
  slides.map((slide) => <SliderItem key={slide._id} slide={slide} />);
