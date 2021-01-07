import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { Loader } from '../components/spinner';
import { setAuthorizationToken } from '../helpers/utils';
import Header from '../components/header';

export const Users = () => {
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useIsAdmin();

  useEffect(() => {
    setAuthorizationToken();
    axios
      .get('admin/users')
      .then((res) => {
        setUsers(res.data.users);
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
            <Header heading='Users' item={users} />
            <div className='col-md-12 mb-2 h-80vh'>
              {users.map((user) => {
                const { _id, aoi, email } = user;
                return (
                  <div
                    key={_id}
                    className='mb-2 border-0 shadow-sm d-flex align-items-center justify-content-between text-dark list-group-item '
                  >
                    <div className='d-flex flex-column'>
                      <span className='text-capitalize font-weight-bold'>
                        {aoi.value}
                      </span>
                      <span className='small text-muted'>{aoi.label}</span>
                    </div>
                    <div className='font-weight-bold '>
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
