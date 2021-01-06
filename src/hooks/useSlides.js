import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config/apiConfig';

export const useSlides = () => {
  const [slides, setSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(API.getSlides)
      .then((slides) => {
        setSlides(slides.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  return { slides, isLoading };
};
