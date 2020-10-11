import React, { useEffect, useState } from 'react';
import { store } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fileDeleteAction, fileDownloadAction, fileUploadAction, getFilesAction, getUploadState, uploadReducer } from '../../reducer/upload.slice';
import './dashboard.scss';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import { getAuthState } from '../../reducer/auth.slice';

export const Dashboard = () => {

  const dispatch = useDispatch();
  const uploadState = useSelector(getUploadState);
  const authState = useSelector(getAuthState);
  const [files, setFiles] = useState({ formData: [] });
  const [uploadedFiles, setUploadedFiles] = useState({ formData: [] });
  const [hasUploaded, setHasUploaded] = useState(false);
  const [getFilesFromServer, setGetFilesFromServer] = useState(true);
  const [downloadAttachment, setDownloadAttachment] = useState(null);
  const [deleteFile, setDeleteFile] = useState(null);

  const apiKey = authState.token;
  const email = authState.user.email;

  useEffect(() => {
    if (hasUploaded) {
      dispatch(fileUploadAction(uploadedFiles));
      setHasUploaded(false);
    }
    if (getFilesFromServer) {
      dispatch(getFilesAction({ getFilesFromServer, email, apiKey }))
      setGetFilesFromServer(false);
      startRefreshTimer();
    }
    if (downloadAttachment) {
      dispatch(fileDownloadAction({ ...downloadAttachment, apiKey }))
      setDownloadAttachment(null);
    }
    if (deleteFile) {
      dispatch(fileDeleteAction({...deleteFile, apiKey}));
      dispatch(uploadReducer.action.delete(deleteFile))
      setDeleteFile(null);
    }

  }, [dispatch, files, getFilesList, setFiles,
    uploadedFiles, email, setUploadedFiles,
    hasUploaded, setHasUploaded, getFilesFromServer, setGetFilesFromServer,
    downloadAttachment, setDownloadAttachment, deleteFile, setDeleteFile, startRefreshTimer]);

  function getFilesList() {
    const files = uploadState.files;
    if (files && files.length) {
      return files.map((r, i) => {
        return (
          <tr key={i}>
            <td>{r.fileName}</td>
            <td>{parseFloat(r.fileSize / 1024).toFixed(0)} KB</td>
            <td>{moment(r.uploadedDate).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>{r.fileStatus}</td>
            <td>{r.fileStatus === 'ZIPPED' ? (<div>
              <Button variant="link"><i className="fa fa-download" onClick={() => { downloadRecord(r) }}></i></Button>
              <Button variant="link" ><i className="fa fa-edit" onClick={() => { editRecord(r) }}></i></Button>
              <Button variant="link" className="text-danger" onClick={() => { deleteRecord(r) }}><i className="fa fa-trash"></i></Button>
            </div>) : null}</td>
          </tr>
        );
      })
    } else {
      return (<tr>
        <td colSpan="5" className="text-center">No Files</td>
      </tr>);
    }
  }

  function uploadFile(fileList) {
    let formData = new FormData();
    const currentDate = moment.now();
    let uploadedFiles = [];
    for (let key of Object.keys(fileList)) {
      formData.append('insta-file', fileList[key]);
      uploadedFiles.push({
        fileName: fileList[key].name,
        fileSize: fileList[key].size,
        uploadedDate: currentDate,
        fileStatus: 'UPLOADING'
      });
    }
    formData.append('uploadedDate', currentDate);
    formData.append('email', authState.user.email);
    setUploadedFiles({ data: uploadedFiles, formData, apiKey });
    setHasUploaded(true);
  }

  function editRecord(record) {

  }

  async function deleteRecord(record) {
    const res = await store.dispatch(fileDeleteAction({...record, apiKey}));
    console.log('res ', res);
    if(res.payload.status == true) {
      setGetFilesFromServer(true);
    }
  }

  function downloadRecord(record) {
    setDownloadAttachment(record);
  }

  // refresh every 3 mins
  function startRefreshTimer() {
    let start = +new Date();
    let interval = setInterval(
      function() {
        let now = +new Date();
        let count = Math.round((now - start) / 1000);
        if (count === 300) {
          setGetFilesFromServer(true);
          clearInterval(interval);
          interval = null;
        }
      }.bind(this),
      1000
    );
  }

  return (
    <div className="dashboard-page container-fluid pt-5 pl-5">
      <div className="row">
        <h5>Your Files</h5>
      </div>
      <div className="row pt-5">
        <div className="col-lg-12 pl-0">
          <Form.File.Input className="d-flex" color="dark" multiple={true} onChange={(e) => { uploadFile(e.target.files) }} />
          <div className="table-wrapper pl-0">
            <Table borderless={true} hover={true} striped={true} className="mt-2" >
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>File Size</th>
                  <th>Upload Date</th>
                  <th>Upload Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getFilesList()}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
