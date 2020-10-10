import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fileUploadAction, getUploadState } from '../../reducer/upload.slice';
import UploadModal from '../shared/upload-modal/upload-modal';
import './dashboard.scss';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Button from 'react-bootstrap/Button';

export const Dashboard = () => {

  const dispatch = useDispatch();
  const uploadState = useSelector(getUploadState);
  const [files, setFiles] = useState({ data: [], formData: [] });
  const [uploadedFiles, setUploadedFiles] = useState({ data: [], formData: [] });
  const [hasUploaded, setHasUploaded] = useState(false);
  const [getUploadedFiles, setGetUploadedFiles] = useState(false);

  useEffect(() => {
    if (hasUploaded) {
      dispatch(fileUploadAction(files));
      setHasUploaded(false);
    }

  }, [dispatch, files, setFiles, uploadedFiles, setUploadedFiles, hasUploaded, setHasUploaded, getUploadedFiles, setGetUploadedFiles]);

  function getFilesList() {
    const files = uploadState.files;
    if (files && files.length) {
      return files.map((r, i) => {
        return (
          <tr key={i}>
            <td>{r.fileName}</td>
            <td>{parseFloat(r.fileSize / 1024).toFixed(0)} KB</td>
            <td>{moment(r.uploadedDate).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>{r.status}</td>
            <td>{ r.status === 'DONE' ? (<div>
              <Button variant="link"><i className="fa fa-download"></i></Button>
              <Button variant="link" ><i className="fa fa-edit"></i></Button>
              <Button variant="link" className="text-danger" ><i className="fa fa-trash"></i></Button>
            </div>) : null }</td>
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
    let uploadedFiles = [];
    const currentDate = moment.now();
    for (let key of Object.keys(fileList)) {
      formData.append('insta-file', fileList[key]);
      uploadedFiles.push({
        fileName: fileList[key].name,
        fileSize: fileList[key].size,
        uploadedDate: currentDate,
        status: 'DONE'
      });
    }
    setFiles({ data: uploadedFiles, formData });
    setHasUploaded(true);
  }

  return (
    <div className="dashboard-page container-fluid pt-5 pl-5">
      <div className="row">
        <h5>Uploaded Files</h5>
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
      <UploadModal />
    </div>
  );
}
export default Dashboard;
