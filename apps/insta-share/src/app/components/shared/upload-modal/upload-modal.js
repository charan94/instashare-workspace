import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUploadState, showUploadModalAction } from '../../../reducer/upload.slice';
import './upload-modal.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const UploadModal = (props) => {
  const dispatch = useDispatch();
  const uploadState = useSelector(getUploadState);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  useEffect(() => {
    if(!showUploadModal && modalOpened) {
      dispatch(showUploadModalAction(false));
      setModalOpened(false);
    }
  }, [dispatch, showUploadModal, setShowUploadModal, files, setFiles, modalOpened, setModalOpened]);

  function hideModal(val) {
    if(val) {
      setModalOpened(true);
      setShowUploadModal(false);
    }
  }

  return (
     <Modal show={uploadState.showUploadModal || showUploadModal} onHide={() => { hideModal(true) }}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { hideModal(true) }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
};
export default UploadModal;
