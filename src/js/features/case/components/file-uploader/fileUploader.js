import React from 'react';
import ProgressBar from './components/progressBar';
import RaisedButton from 'material-ui/RaisedButton';
import UploadDialog from './components/uploadDialog';
import './styles.css';

import { getThumbnail, filterAllowedFile } from './actions';
import FileAPI from 'fileapi';

export default class FileUpload extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      showUploadModal: false,
      allowedFile: [],
      imageThumbnail: [],
      allowedFileTypes: ['image/jpg', 'application/pdf', 'image/jpeg'],
      endpointUrl: 'http://localhost:8081/uploadImage/uploadImage',
    };

    this.FileAPI = FileAPI;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.progress > 0) {
      this.setState({
        showUploadModal: false
      });
    }
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

    function isImage(file) {
      const IMAGE_TYPES = /^image\/(jpe?g|png|gif|jf?if|tiff?)$/i;
      return IMAGE_TYPES.test(file.type);
    }

    function isDocument(file) {
      const DOCUMENT_TYPES = /^application\/(pdf)$/i;
      return DOCUMENT_TYPES.test(file.type);
    }

    const allowedFile = !!this.state.allowedFileTypes ? await filterAllowedFile(event, this.state.allowedFileTypes) : event;

    if (allowedFile.length > 0) {
      if (isImage(allowedFile[0])) {
        const imageThumbnail = await getThumbnail(allowedFile);
        this.setState({ imageThumbnail });
        this.state.bodyType = 'imageType';
      }
      if (isDocument(allowedFile[0])) {
        this.state.bodyType = 'documentType';
      }

    } else {
      this.state.bodyType = 'fileNotSupported';
    }

    this.setState({
      allowedFile,
      showUploadModal: true
    });

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
          show={this.state.showUploadModal}
          bodyType={this.state.bodyType}
          allowedFileTypes={this.state.allowedFileTypes}
          imageThumbnail={this.state.imageThumbnail}
          startUploadFile={this.props.startUploadFile}
          caseId={this.props.caseId}
          uploadFile={this.state.allowedFile}
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
