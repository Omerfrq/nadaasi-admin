import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../config/apiConfig';

export const useCategories = (isActive = '') => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(API.getCategories, {
        params: {
          isActive,
        },
      })
      .then((categories) => {
        setCategories(categories.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [isActive]);
  return { categories, isLoading };
};
