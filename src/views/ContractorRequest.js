import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { Loader } from '../components/spinner';
import { setAuthorizationToken } from '../helpers/utils';
import NotFound from '../components/NotFound';
import Header from '../components/header';
import RequestLists from '../components/requests/requestList';

export const stringTruncate = (str, length) => {
  const dots = str.length > length ? '...' : '';
  return `${str.substring(0, length)}${dots}`;
};

export const ContractorRequests = () => {
  const [requests, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useIsAdmin();

  useEffect(() => {
    setAuthorizationToken();
    axios
      .get('/project/agent/request')
      .then((res) => {
        setFeedback(res.data.requests);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className='mt-4' fluid>
      <div className='col-md-12'>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='row'>
            <div className='col-md-12 container '>
              <Header heading='Contractor Requests' item={requests} />
              <>
                {requests.length > 0 ? (
                  <RequestLists requests={requests} />
                ) : (
                  <NotFound message='No Feedback Added from the users.' />
                )}
              </>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
