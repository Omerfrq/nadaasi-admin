import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Input, Col, Label, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { setAuthorizationToken } from '../helpers/utils';
import { Loader } from '../components/spinner';
import logo from '../assets/images/logo.jpg';

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    if (localStorage.getItem('loggedIn')) {
      setAuthorizationToken();
      history.push('/dashboard');
    }
    // eslint-disable-next-line
  }, []);

  const onSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    axios
      .post('/auth/admin', payload)
      .then((res) => {
        localStorage.setItem('loggedIn', res.data.token);
        setAuthorizationToken();
        setIsLoading(false);
        history.push('/dashboard');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center h-100vh'>
      <Col md={6} className='m-auto'>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {error && <Alert color='danger'>Invalid Credentials.</Alert>}
            <div
              style={{
                height: 100,
              }}
            >
              <img
                style={{
                  objectFit: 'cover',
                }}
                className='h-100 w-100 mb-2'
                src={logo}
                alt='logo'
              />
            </div>

            <h1 className='text-center text-uppercase'>LCU Mens Wears</h1>

            <Form className='mt-4' onSubmit={onSubmit}>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type='text'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder='Enter Email Address'
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  type='password'
                  placeholder='Enter Password'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </FormGroup>
              <Input type='submit' value='Login' />
            </Form>
          </>
        )}
      </Col>
    </div>
  );
};
