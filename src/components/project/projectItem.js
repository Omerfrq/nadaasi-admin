import React from 'react';
import moment from 'moment';

const getDate = (createdAt) => moment.utc(createdAt).format('MMM DD, YYYY');
export const ProjectItem = ({ project }) => {
  return (
    <tr className='text-capitalize'>
      <td>
        <div className='d-flex flex-column'>
          <small className='font-weight-bold mb-1'>{project.title}</small>
          <small>{project.objective}</small>
        </div>
      </td>

      <td className='small'>{project.description}</td>
      <td>
        <div className='d-flex'>
          {project?.feasibility.map((f, idx) => (
            <div key={idx} className='tag mr-1 px-1 '>
              <small> {f}</small>
            </div>
          ))}
        </div>
      </td>
      <td>
        <div className='d-flex'>
          {project.financeAndFunding.map((ff, idx) => (
            <div key={idx} className='tag mr-1 px-1 '>
              <small> {ff}</small>
            </div>
          ))}
        </div>
      </td>

      <td className='d-flex'>
        <div>
          <small className='mr-1 d-flex flex-column align-items-center font-weight-bold'>
            Submission Deadline
          </small>
          <div className='text-center small'>
            {getDate(project.submissionDeadline)}
          </div>
        </div>
        <div>
          <small className='ml-2 mr-2 d-flex align-items-center font-weight-bold'>
            Accpt.Criteria
          </small>
          <div className='text-center small'>{project.acceptanceCriteria}</div>
        </div>
      </td>
      <td className='text-center font-weight-bold'>
        <a
          rel='noopener noreferrer'
          href={project.projectDocument}
          target='_blank'
        >
          Docs
        </a>
      </td>
    </tr>
  );
};
