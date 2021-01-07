import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { Loader } from '../components/spinner';
import { setAuthorizationToken } from '../helpers/utils';
import Header from '../components/header';
import NotFound from '../components/NotFound';

import { ProjectList } from '../components/project/projectList';

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useIsAdmin();

  useEffect(() => {
    setAuthorizationToken();
    axios
      .get('admin/agent/project')
      .then((res) => {
        setProjects(res.data.projects);
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
          <>
            <Header heading='Projects' item={projects} />
            <div className='col-md-12'>
              <div className='row'>
                <div className='p-0 col-md-12 my-2'>
                  {projects.length > 0 ? (
                    <ProjectList projects={projects} />
                  ) : (
                    <NotFound message='Not Products Added.' />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
