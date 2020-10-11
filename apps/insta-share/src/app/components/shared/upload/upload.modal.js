import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { fileUpdateAction, getUploadState, uploadSlice } from '../../../reducer/upload.slice';
import { store } from '../../../store/store';
import moment from 'moment';
import { getAuthState } from '../../../reducer/auth.slice';

export const UploadModal = (props) => {

    const uploadState = useSelector(getUploadState);
    const authState = useSelector(getAuthState);
    const apiKey = authState.token;
    const data = uploadState.showModal && uploadState.showModal.data ? uploadState.showModal.data : null;

    const [fileName, setFileName] = useState(data && data.fileName ? data.fileName : '');

    const [file, setFile] = useState(null);

    function closeModal() {
        store.dispatch(uploadSlice.actions.showModal({ show: false, data: null }));
    }

    async function updateInformation() {
        const currentDate = moment.now();
        let formData = new FormData();
        if(fileName === '' && file === null) {
            return;
        }
        if(fileName !== '') {
            formData.append('fileName', fileName);
        }
        if(file !== null) {
            for (let key of Object.keys(file)) {
                formData.append('insta-file', file[key]);
            }
        }
        formData.append('uploadedDate', currentDate);
        formData.append('fileId', uploadState.showModal.data.id);
        const result = await store.dispatch(fileUpdateAction({formData, apiKey}));
        if(result && result.payload.status) {
            closeModal();
            props.loadRecords(true);
        }
    }

    function getBody() {
        return (
            <div>
                <div className="form-group">
                    <label>FileName</label>
                    <input type="text" value={fileName} placeholder={uploadState.showModal && uploadState.showModal.data && uploadState.showModal.data.fileName ? uploadState.showModal.data.fileName : ''} className="form-control" onChange={(e) => { setFileName(e.target.value) }} />
                </div>
                <div className="form-group">
                    <label>File</label>
                    <Form.File.Input className="d-flex" color="dark" multiple={false} onChange={(e) => { uploadFile(e.target.files) }} />
                </div>
            </div>
        )
    }

    function uploadFile(files) {
        setFile(files);
    }

    return (
        <Modal show={uploadState.showModal && uploadState.showModal.show} onHide={() => { closeModal() }}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {getBody()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { closeModal() }}>Close</Button>
                <Button variant="primary" onClick={() => { updateInformation() }}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}