import React from 'react';
import { ProjectItem } from './projectItem';
import { Table } from 'reactstrap';

export const ProjectList = ({ projects }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Title / Obj</th>
          <th>Description</th>
          <th>Feasibility</th>
          <th>Funding</th>
          <th>Criteria</th>
          <th>Attachments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <ProjectItem key={project._id} project={project} />
        ))}
      </tbody>
    </Table>
  );
};
