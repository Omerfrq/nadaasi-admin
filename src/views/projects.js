import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from 'reactstrap';
import { useIsAdmin } from '../hooks/useIsAdmin';
import { Loader } from '../components/spinner';
import { setAuthorizationToken } from '../helpers/utils';
import moment from 'moment';

const getDate = (createdAt) => moment.utc(createdAt).format('MMM DD, YYYY');

export const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useIsAdmin();

  useEffect(() => {
    setAuthorizationToken();
    axios
      .get('/project/agent')
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
          <div className='row'>
            <div className='col-md-12 mb-3 h-80vh'>
              <div className='d-flex justify-content-end'>
                <span className='badge badge-primary badge-pill shadow-sm p-2 mb-2'>
                  Total Projects:{' '}
                  <span className='font-weight-bold '>{projects.length}</span>
                </span>
              </div>
              {projects.map((project) => {
                return (
                  <div
                    key={project?._id}
                    className='mb-2 border-0 shadow-sm d-flex align-items-center justify-content-between text-dark list-group-item '
                  >
                    <div className='d-flex flex-column'>
                      <span className='text-capitalize font-weight-bold'>
                        {project?.title}
                      </span>
                      <span className='small text-muted'>
                        {getDate(project?.submissionDeadline)}
                      </span>
                    </div>
                    <div className='font-weight-bold '>
                      <span>{project?.description}</span>
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
