import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { Loader } from '../components/spinner';
import { setAuthorizationToken } from '../helpers/utils';

export const Users = () => {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useIsAdmin();

  useEffect(() => {
    setAuthorizationToken();
    axios
      .get('/auth/users')
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className='mt-4' fluid>
      <div className='col-md-12 '>
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className='row'>
            <div className='col-md-12 mb-3 h-80vh'>
              <div className='d-flex justify-content-end'>
                <span className='badge badge-primary badge-pill shadow-sm p-2 mb-2'>
                  Total Users:{' '}
                  <span className='font-weight-bold '>{users.length}</span>
                </span>
              </div>
              {users.map((user) => {
                const { _id, firstname, lastname, email } = user;
                return (
                  <div
                    key={_id}
                    className='mb-2 border-0 shadow-sm d-flex justify-content-between text-dark list-group-item '
                  >
                    <span className='text-capitalize'>
                      {firstname} {lastname}
                    </span>
                    <div className='font-weight-bold'>
                      <span>{email}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};
