import React, { Component } from 'react';
import UploadModal from '../shared/upload-modal/upload-modal';
import './dashboard.scss';
export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-page">
        <div className="container-fluid pt-5">
          <div className="row">
              <h5>Uploaded Files</h5>
          </div>
        </div>
        <UploadModal />
      </div>
    );
  }
}
export default Dashboard;
