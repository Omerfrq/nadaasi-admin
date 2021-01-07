import React, { useState } from 'react';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';

const getDate = (createdAt) => moment.utc(createdAt).format('MMM DD, YYYY');
export const ProjectItem = ({ project }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteProject = () => {
    setIsDeleting(true);
    axios
      .delete(`admin/project/delete/${project._id}`)
      .then((res) => {
        setIsDeleting(false);
        window.location.reload();
      })
      .catch((err) => {
        throw err.response;
      });
  };

  return (
    <>
      {modal && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Delete {project.title}</ModalHeader>
          <ModalBody>Are You Sure You Want To Delete {project.title}</ModalBody>
          <ModalFooter>
            <Button color='light' onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button
              disabled={isDeleting}
              onClick={deleteProject}
              color='danger'
            >
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      )}
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
            <div className='text-center small'>
              {project.acceptanceCriteria}
            </div>
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
        <td>
          <div
            className='cursor-pointer text-center'
            onClick={() => setModal(true)}
          >
            <FeatherIcon icon='trash' size={16} />
          </div>
        </td>
      </tr>
    </>
  );
};
