import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import ProgressBar from './components/progressBar';
import RaisedButton from 'material-ui/RaisedButton';
import UploadDialog from './components/uploadDialog';
import './styles.css';

import { getThumbnails, filterAllowedFiles, filterUploadFiles } from './actions';
import FileAPI from 'fileapi';

export default class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUploadModal: false,
      uploadFiles: [],
      imageThumbnails: [],
      allowedFileTypes: ['jpg', 'pdf', 'image/jpeg'],
      endpointUrl: 'http://localhost:8081/uploadImage/uploadImage',
      modalTitle: '',
      actions: []
    };

    this.FileAPI = FileAPI;

  }

  componentDidMount() {
    this.FileAPI.event.on(this.refs.fileInput, 'change', this.handleFileChange.bind(this));
  }

  componentWillUnmount() {
    this.FileAPI.event.off(this.refs.fileInput, 'change', this.handleFileChange.bind(this));
  }

/* eslint-disable no-alert, no-console */
async handleFileChange(event) {
/* eslint-enable no-alert, no-console */

    const allowedFiles = !!this.state.allowedFileTypes ? await filterAllowedFiles(event, this.state.allowedFileTypes) : event;
    const uploadFiles = await filterUploadFiles(allowedFiles);
    const imageThumbnails = await getThumbnails(uploadFiles);

    this.setState({
      uploadFiles,
      imageThumbnails
    });

    if(allowedFiles.length > 0 ) {
      this.state.modalTitle = 'Upload a file?';
      this.state.actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleClose.bind(this)}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this.startUploadFile.bind(this)}
        />,
      ];
      this.state.bodyType = 'uploadFile'

    } else {
      this.state.modalTitle = 'Sorry image type not allowed!';
      this.state.actions = [
        <FlatButton
          label="Close"
          primary={true}
          onTouchTap={this.handleClose.bind(this)}
        />
      ];

      this.state.bodyType = 'fileNotSupported';
    }

    this.setState({
      showUploadModal: true
    });

  }

  handleClose() {
    this.setState({
      showUploadModal: false,
      uploadFiles: [],
      imageThumbnails: []
     });
  };

  startUploadFile() {
    const data = {
      title: this.refs.imageTitle.getValue(),
      url: this.state.uploadFiles[0].name,
      caseId: this.props.caseId,
      fileType: this.state.uploadFiles[0].type,
      user: 'admin'
    };

    this.setState({
      showUploadModal: false
    });
    this.props.startUploadFile(this.state.endpointUrl, this.state.uploadFiles[0], data)
  }

  render() {
    return (
      <div>
        <form ref="fileUpload">
          <input
            type="file"
            ref="fileInput"
            className="custom-file-input"
          />
        </form>
        <ProgressBar progress={this.props.progress} />
        <UploadDialog
          actions={this.state.actions}
          show={this.state.showUploadModal}
          title={this.state.modalTitle}
          bodyType={this.state.bodyType}
          allowedFileTypes={this.state.allowedFileTypes}
          imageThumbnails={this.state.imageThumbnails}
        />
      </div>
    );
  }

}

FileUpload.propTypes = {
  startUploadFile: React.PropTypes.func.isRequired,
  progress: React.PropTypes.number,
  caseId: React.PropTypes.string
};
